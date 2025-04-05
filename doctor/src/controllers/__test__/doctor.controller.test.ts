import request from 'supertest';
import { AppDataSource } from '../../data-source';
import { app } from '../../app';
import { createSpeciaity, createDoctor, doctorCreateObject } from '../../test-utils/doctorTestUtils';

it('has a route handler listening to /api/doctor for post request', async () => {
  const response = await request(app).post('/api/doctor').send();
  expect(response.statusCode).not.toBe(404);
});

it('Should create a new new doctor', async () => {
  await createSpeciaity();
  
  const data = await createDoctor();

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