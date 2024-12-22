export interface CreateDoctorDTO {
  name: string;
  speciality_id: number;
  phone: string;
  email: string;
  qualification: string;
  profile_picture: string;
  years_of_experience: number;
  bio: string;
  is_active: boolean;
}