import { validateRequest } from '@phntickets/booking';
import express from 'express';
import { body, query } from 'express-validator';
import { SlotController } from '../../controllers/slot.controller';
import { AppDataSource } from '../../data-source';
import { Slot } from '../../entities/slot.entities';
import { Appointment } from '../../entities/appointment.entities';

const router = express.Router();

const slotController = new SlotController(
  AppDataSource.getRepository(Slot),
  AppDataSource.getRepository(Appointment)
);

router.get(
  '/api/appointment/slot',
  [
    query('doctorLocationId')
      .isInt({ min: 1 })
      .withMessage('Doctor location id must be valid'),
    query('date')
      .isISO8601({ strict: true })
      .withMessage('Invalid date format. Please use YYYY-MM-DD'),
  ],
  validateRequest,
  slotController.getAvailableSlotsByDate.bind(slotController)
);

export { router as getSlotRouter };
