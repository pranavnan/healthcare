import { Repository } from 'typeorm';
import { DoctorLocation } from '../entities/doctor-location.entities';
import { CreateDoctorLocationDTO } from '../dtos/create-doctor-location';
import {
  BadRequestError,
  kafkaWrapper,
  NotFoundError,
} from '@phntickets/booking';
import { Doctor } from '../entities/doctor.entities';
import { Location } from '../entities/location.entities';
import { AppDataSource } from '../data-source';
import { filterField } from '../utils/filter-fields';
import { DoctorLocationCreatedPublisher } from '../events/publishers/doctorLocationCreatedPublisher';
import { inject } from 'inversify';
import { TYPES } from '../inversify/types';

export const doctorLocationAllowedFields = [
  'doctor',
  'location',
  'is_primary',
  'is_active',
];

export class DoctorLocationService {
  constructor(
    @inject(TYPES.TypeORMDocLocRepository)
    private docLocRepo: Repository<DoctorLocation>
  ) {}

  async attachDoctorLocation(dto: CreateDoctorLocationDTO) {
    const doctorId = dto.doctor;
    const locationId = dto.location;

    // check if doctor is valid
    // check if location is valid
    // check if the pair of doctor and location is already exists in locationDoctor table
    // these three steps can be done in one step because if we do these step seperately then we have to hit the database thrice for only checking and one for inserting
    // now that the data checking is happening in one query itself then our db only hit twice one for checking and one for inserting.
    // In the first query the base entity we are taking is doctor then we left join the location and doctor_location

    // below is the possibility
    // if we get the doctorId then doctor is valid
    // if we get the locationId then location is valid
    // if we get the docLocId the doc is already assign this loc if means we dont need to persists it.
    // if we get doctorId as null it means doctor not present in DB (remember as the base table is doctor if doctor is getting data even if we pass the right locationId we dont get location data also)
    // if we get locationId as null then it means location dont exists in db.
    // if we get both locationId and doctorId but we dont get docLocId then it means we are ready for inserting

    const checkForData = await this.docLocRepo.manager.transaction(
      async (transactionEntityManager) => {
        const data = await transactionEntityManager
          .createQueryBuilder()
          .select([
            'doc.id AS docId',
            'loc.id AS locId',
            'docloc.id AS docLocId',
            'doc.name AS doctorName',
            'loc.name AS locationName',
          ])
          .from(Doctor, 'doc')
          .leftJoin(Location, 'loc', 'loc.id = :locationId', {
            locationId: locationId,
          })
          .leftJoin(
            DoctorLocation,
            'docloc',
            'docloc.doctorId = doc.id AND docloc.locationId = loc.id'
          )
          .where('doc.id = :doctorId', { doctorId: doctorId })
          .getRawOne();
        return data;
      }
    );

    if (!checkForData || !checkForData.docId) {
      throw new BadRequestError('Doctor id is not valid');
    }
    if (!checkForData.locId) {
      throw new BadRequestError('Location id is not valid');
    }
    if (checkForData.docLocId) {
      throw new BadRequestError('Doctor is already assign to this location');
    }

    const docLoc = new DoctorLocation();
    const filterFieldsValue = filterField(
      dto,
      doctorLocationAllowedFields
    ) as CreateDoctorLocationDTO;

    Object.assign(docLoc, filterFieldsValue);
    const savedResult = await this.docLocRepo.save(docLoc);

    // trigger event to appointment
    await new DoctorLocationCreatedPublisher(kafkaWrapper).publish({
      doctorId: checkForData.docId,
      doctorName: checkForData.doctorName,
      id: savedResult.id,
      is_active: true,
      locationId: checkForData.locId,
      locationName: checkForData.locationName,
    });
    return savedResult;
  }

  async detachDoctorLocation(docLocId: number) {
    const deleteResult = await this.docLocRepo.delete(docLocId);
    if (!deleteResult.affected) {
      throw new BadRequestError(`Doctor location id is not valid`);
    }
    return deleteResult;
  }

  /** Not used methods */
  async getAllDoctorsByLocation() {}
  // get all locations for an doctor (NOT USED)
  async getDoctorsLocation(doctorId: number) {
    const doctorLocations = await this.docLocRepo.find({
      where: {
        doctor: {
          id: doctorId,
        },
      },
    });

    return doctorLocations;
  }
}
