export interface CreateDoctorLocationDTO {
  id: number;
  is_active: boolean;
  doctorId: number;
  locationId: number;
  doctorName: string;
  locationName: string;
}
