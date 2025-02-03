import { Repository } from 'typeorm';
import { Location } from '../entities/location.entities';
import { CreateLocationDTO } from '../dtos/create-location-dto';
import { NotFoundError } from '@phntickets/booking';
import { inject } from 'inversify';
import { TYPES } from '../inversify/types';

export class LocationService {
  constructor(
    @inject(TYPES.TypeORMLocationRepository)
    private locationRepo: Repository<Location>
  ) {}

  async createLocation(dto: CreateLocationDTO): Promise<Location> {
    const location = new Location();
    location.name = dto.name;
    location.address = dto.address;
    location.city = dto.city;
    location.latitude = dto.latitude;
    location.longitude = dto.longitude;
    location.phone = dto.phone;
    location.postal_code = dto.postal_code;
    location.state = dto.state;

    location.type = dto.type;
    location.is_active = true;

    const savedLocation = await this.locationRepo.save(location);
    return savedLocation;
  }

  async updateLocation(
    dto: CreateLocationDTO,
    locationId: number
  ): Promise<Location> {
    const location = await this.locationRepo.findOne({
      where: {
        id: locationId,
      },
    });

    if (!location) {
      throw new NotFoundError(
        `No location details found for id: ${locationId}`
      );
    }

    Object.assign(location, dto);

    return await this.locationRepo.save(location);
  }

  async getLocations(limit: number, pg: number) {
    const offset = (pg - 1) * limit;
    const [locationsData, total] = await this.locationRepo.findAndCount({
      take: limit,
      skip: offset,
      relations: {
        doctorLocations: {
          doctor: true,
        },
      },
    });

    const filteredLocation = locationsData.map((ele) => {
      const totalDoctorCount = ele.doctorLocations?.length || 0;
      if (ele.doctorLocations) {
        delete ele.doctorLocations;
      }

      return {
        ...ele,
        totalDoctorCount,
      };
    });

    return {
      locationsData: filteredLocation,
      total,
    };
  }

  async getLocation(locationId: number): Promise<Location> {
    const location = await this.locationRepo.findOne({
      where: {
        id: locationId,
      },
      relations: {
        doctorLocations: {
          doctor: true,
        },
      },
    });

    if (!location)
      throw new NotFoundError(`No location found with id: ${locationId}`);

    return location;
  }
}
