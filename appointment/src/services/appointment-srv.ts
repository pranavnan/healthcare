import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entities';
import { CreateAppointmentDTO } from '../dto/create-appointment';
import { AppDataSource } from '../data-source';
import { Slot } from '../entities/slot.entities';
import { BadRequestError, kafkaWrapper } from '@phntickets/booking';
import { DoctorLocation } from '../entities/doctor-location.entities';
import { AppointmentChecked } from '../dto/appointment-checked-data';
import { AppointmentCreatedPublisher } from '../events/publishers/appointment-created-event';

export class AppointmentService {
  private readonly appointmentRepo: Repository<Appointment>;

  constructor(repo: Repository<Appointment>) {
    this.appointmentRepo = repo;
  }

  async createAppointment(dto: CreateAppointmentDTO): Promise<Appointment> {
    // check if appointment is already exists
    const checkedData = await this.checkAppointment(dto);

    const appointment = new Appointment();
    Object.assign(appointment, dto);
    const savedAppointment = await this.appointmentRepo.save(appointment);

    // trigger an event to doctor srv to blocked this slot
    // event to trigger the text message and email to notification srv
    // event to remainder the user before 1-day and 2 hours before appointment
    new AppointmentCreatedPublisher(kafkaWrapper).publish({
      appointmentDate: dto.appointmentDate.toString(),
      appointmentId: savedAppointment.id,
      doctorName: checkedData.doctorName,
      endTime: checkedData.slotEndTime,
      locationName: checkedData.locationName,
      slotId: checkedData.slotId,
      startTime: checkedData.slotStartTime,
      userNumber: dto.usernumber,
    });

    return savedAppointment;
  }

  private async checkAppointment(
    dto: CreateAppointmentDTO
  ): Promise<AppointmentChecked> {
    const { appointmentDate, slot, usernumber, status } = dto;

    // check if slotId is valid or not
    // check if appoint with slotId and appointDate is already exist or not
    const checkData: AppointmentChecked | undefined =
      await AppDataSource.createQueryBuilder()
        .select([
          'sl.id AS slotId',
          'ap.id AS appointmentId',
          'sl.start_time AS slotStartTime',
          'sl.end_time AS slotEndTime',
          'docloc.doctorName AS doctorName',
          'docloc.locationName AS locationName',
        ])
        .from(Slot, 'sl')
        .innerJoin(DoctorLocation, 'docloc')
        .leftJoin(
          Appointment,
          'ap',
          `
            ap.slotId = :slot
            AND ap.appointmentDate = :appointmentDate
            AND ap.status = :status
          `,
          {
            slot,
            appointmentDate,
            status: 'created',
          }
        )
        .where('sl.id = :slot', { slot })
        .getRawOne();

    console.log({ checkData });
    // As the primary table is Slot and if invalid slot id come the we are getting the checkData as undefined
    if (!checkData) {
      throw new BadRequestError(`Invalid slot id`);
    }

    // If appointmentId is exists in checkData then it means appointment is already book with this slot and date
    if (checkData.appointmentId) {
      throw new BadRequestError(
        'Appointment for this slot and date is already book'
      );
    }

    // if appointDate and current Date match check that the comming slot must be 2 hour from now
    const appointDate = new Date(appointmentDate).setHours(0, 0, 0, 0);
    const currDate = new Date().setHours(0, 0, 0, 0);

    if (appointDate === currDate) {
      // get current date with time
      const currTimePlus2Hrs = new Date();

      // set the date time in ISD
      currTimePlus2Hrs.setHours(
        currTimePlus2Hrs.getHours() + 5,
        currTimePlus2Hrs.getMinutes() + 30,
        0,
        0
      );
      // set the current date time to +2 hours
      currTimePlus2Hrs.setHours(currTimePlus2Hrs.getHours() + 2);

      // extract the start hour and start minutes from saved slot startTime
      const [startHrs, endHrs] = checkData.slotStartTime.split(':');
      const appointWithTime = new Date();

      // set the appointDateTime with start slottime
      appointWithTime.setHours(Number(startHrs), Number(endHrs), 0, 0);

      console.log({ currTimePlus2Hrs, appointWithTime });

      // If comming appointment slot is not 2 hours from now then throw an error
      if (appointWithTime < currTimePlus2Hrs) {
        throw new BadRequestError(
          'Appointment time cannot be in the past or within the next two hours.'
        );
      }
    }
    return checkData;
  }
}
