import request from 'supertest';
import { AppDataSource } from '../data-source';
import { app } from '../app';

export const doctorCreateObject = {
  name: 'Dr. Adarsh',
  speciality_id: 1,
  phone: '918888574689',
  email: 'pranavnan@gmail.com',
  qualification: 'MBBS, MD',
  years_of_experience: 2,
  bio: 'i did my MBBS back in 2008',
  is_active: true,
  profile_picture: 'http://imahe.coms.dd',
};

export async function createSpeciaity() {
  await AppDataSource.query(
    `INSERT INTO speciality (name) VALUES ('Neurologist')`
  );
}

export async function createDoctor() {
  const response = await request(app).post('/api/doctor').send(doctorCreateObject);
  return response;
} 