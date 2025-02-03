import { Router } from 'express';
import { createAppointmentRouter } from './new';

const router = Router();

router.use(createAppointmentRouter);

export { router as appointmentRouter };
