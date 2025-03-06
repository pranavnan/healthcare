import request from 'supertest';
import { AppDataSource } from '../../data-source';
import { app } from '../../app';



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

it('has a route handler listening to /api/doctor for post request', async () => {
  const response = await request(app).post('/api/doctor').send();
  expect(response.statusCode).not.toBe(404);
});

it('Should create a new new doctor', async () => {
  await createSpeciaity();

  const data = await request(app).post('/api/doctor').send(doctorCreateObject);

  // console.log(data)

  expect(data.status).toBe(201);
  expect(data.body.doctor.name).toBe(doctorCreateObject.name);
  expect(data.body.doctor.phone).toBe(doctorCreateObject.phone);
  expect(data.body.doctor.email).toBe(doctorCreateObject.email);
  expect(data.body.doctor.qualification).toBe(doctorCreateObject.qualification);
  expect(data.body.doctor.years_of_experience).toBe(
    doctorCreateObject.years_of_experience
  );
  expect(data.body.doctor.bio).toBe(doctorCreateObject.bio);
  expect(data.body.doctor.is_active).toBe(doctorCreateObject.is_active);
  expect(data.body.doctor.created_at).toBeDefined();
  expect(data.body.doctor.updated_at).toBeDefined();
  expect(data.body.doctor.not_defined_field).toBeUndefined();
});

it('returns an error if invalid fields is provided', async () => {
  await createSpeciaity();
  const response = await request(app).post('/api/doctor').send({
    name: 1,
  });
  expect(response.status).toBe(400);
});


// import request from 'supertest';
// import { app } from '../../app';
// import { container } from '../../inversify/container';
// import { TYPES } from '../../inversify/types';
// import { IDoctorService } from '../../interfaces/doctor/doctor.service.interface';
// import { CreateDoctorDTO } from '../../dtos/create-doctor-dto';
// import { Doctor } from '../../entities/doctor.entities';

// const mockDoctorService = {
//   createDoctor: jest.fn(),
//   updateDoctor: jest.fn(),
//   getDoctors: jest.fn(),
//   getDoctor: jest.fn(),
// };

// beforeAll(() => {
//   container
//     .rebind<IDoctorService>(TYPES.DoctorService)
//     .toConstantValue(mockDoctorService);
// });

// describe('DoctorController', () => {
//   describe('POST /api/doctor', () => {
//     it('should create a new doctor', async () => {
//       const dto: CreateDoctorDTO = {
//         name: 'Dr. John Doe',
//         speciality_id: 1,
//         phone: '1234567890',
//         email: 'john.doe@example.com',
//         qualification: 'MBBS in BIO',
//         profile_picture: 'http://example.com/profile.jpg',
//         years_of_experience: 10,
//         bio: 'Experienced doctor',
//         is_active: true,
//       };

//       const doctor: Doctor = {
//         id: 1,
//         ...dto,
//         created_at: new Date(),
//         updated_at: new Date(),
//         speciality: { id: 1, name: 'Cardiology', doctor: [] },
//         doctorLocations: [],
//       };

//       mockDoctorService.createDoctor.mockResolvedValue(doctor);

//       const response = await request(app)
//         .post('/api/doctor')
//         .send(dto)
//         .expect(201);

//       expect(response.body).toEqual({
//         message: 'Doctor created sucessfully',
//         doctor,
//       });
//     });
//   });

//   describe('PUT /api/doctor/:id', () => {
//     it('should update an existing doctor', async () => {
//       const dto: CreateDoctorDTO = {
//         name: 'Dr. Jane Doe',
//         speciality_id: 1,
//         phone: '0987654321',
//         email: 'jane.doe@example.com',
//         qualification: 'MBBS in BIO',
//         profile_picture: 'http://example.com/profile.jpg',
//         years_of_experience: 15,
//         bio: 'Highly experienced doctor',
//         is_active: true,
//       };

//       const doctor: Doctor = {
//         id: 1,
//         ...dto,
//         created_at: new Date(),
//         updated_at: new Date(),
//         speciality: { id: 1, name: 'Cardiology', doctor: [] },
//         doctorLocations: [],
//       };

//       mockDoctorService.updateDoctor.mockResolvedValue(doctor);

//       const response = await request(app)
//         .put('/api/doctor/1')
//         .send(dto)
//         .expect(200);

//       expect(response.body).toEqual(doctor);
//     });
//   });

//   describe('GET /api/doctor', () => {
//     it('should get all doctors', async () => {
//       const doctors: Doctor[] = [
//         {
//           id: 1,
//           name: 'Dr. John Doe',
//           phone: '1234567890',
//           email: 'john.doe@example.com',
//           qualification: 'MBBS in BIO',
//           profile_picture: 'http://example.com/profile.jpg',
//           years_of_experience: 10,
//           bio: 'Experienced doctor',
//           is_active: true,
//           created_at: new Date(),
//           updated_at: new Date(),
//           speciality: { id: 1, name: 'Cardiology', doctor: [] },
//           doctorLocations: [],
//         },
//       ];

//       mockDoctorService.getDoctors.mockResolvedValue(doctors);

//       const response = await request(app)
//         .get('/api/doctor')
//         .query({ page: 1, limit: 10 })
//         .expect(200);

//       expect(response.body).toEqual(doctors);
//     });
//   });

//   describe('GET /api/doctor/:id', () => {
//     it('should get a specific doctor by ID', async () => {
//       const doctor: Doctor = {
//         id: 1,
//         name: 'Dr. John Doe',
//         phone: '1234567890',
//         email: 'john.doe@example.com',
//         qualification: 'MBBS in BIO',
//         profile_picture: 'http://example.com/profile.jpg',
//         years_of_experience: 10,
//         bio: 'Experienced doctor',
//         is_active: true,
//         created_at: new Date(),
//         updated_at: new Date(),
//         speciality: { id: 1, name: 'Cardiology', doctor: [] },
//         doctorLocations: [],
//       };

//       mockDoctorService.getDoctor.mockResolvedValue(doctor);

//       const response = await request(app).get('/api/doctor/1').expect(200);

//       expect(response.body).toEqual(doctor);
//     });
//   });
// });
