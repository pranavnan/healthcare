import { validateRequest } from '@phntickets/booking';
import { Router } from 'express';
import { appointmentController } from './getAppointmentControllerInstance';
import { body, check } from 'express-validator';

const router = Router();

router.post(
  '/api/appointment',
  [
    body('usernumber')
      .trim()
      .isMobilePhone('en-IN')
      .withMessage('User mobile phone must be valid with an ISD code.'),

    body('appointmentDate')
      .trim()
      .isISO8601({ strict: true })
      .withMessage('Invalid date format. Please use YYYY-MM-DD.'),

    check('appointmentDate').custom((appointmentDate, { req }) => {
      if (!appointmentDate) return Promise.resolve();
      const date = new Date(appointmentDate);
      const currDate = new Date();
      currDate.setHours(0, 0, 0, 0);
      console.log({ currDate, date });

      if (date < currDate) {
        return Promise.reject(`Appointment date cannot be in past`);
      }
      return true;
    }),

    body('slot').isInt({ min: 1 }).withMessage('Slot id must be valid'),
  ],
  validateRequest,
  appointmentController.createAppointment.bind(appointmentController)
);

export { router as createAppointmentRouter };
