export interface IAppointmentService {
  checkAvailableSlots(
    doctorLocationId: number,
    appointmentDate: string
  ): Promise<any>;
  bookAppointment(
    doctorLocationId: number,
    appointmentDate: string,
    slotTime: string
  ): Promise<any>;
}
