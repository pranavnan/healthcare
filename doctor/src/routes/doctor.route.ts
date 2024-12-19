import express from 'express';
import { container } from '../inversify/container';
import { TYPES } from '../inversify/types';
import { DoctorController } from '../controllers/doctor.controller';

const router = express.Router();

const doctorController = container.get<DoctorController>(
  TYPES.DoctorController
);

router.get('/', doctorController.getDoctors.bind(doctorController));

export { router as doctorRouter };
