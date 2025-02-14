import 'reflect-metadata';
import 'express-async-errors'; // error handling for the async function
import { errorHandler, NotFoundError } from '@phntickets/booking';
import express from 'express';
import { AppDataSource } from './data-source';
import { Slot } from './entities/slot.entities';
import { Appointment } from './entities/appointment.entities';
import { appointmentRouter } from './routes/appointment/router';
import { slotRouter } from './routes/slot/router';

const app = express();

app.use(express.json());

app.use(appointmentRouter);
app.use(slotRouter);

app.get('/api/appointment', async (req, res) => {
  const slotRepo = AppDataSource.getRepository(Slot);
  const appointmentRepo = AppDataSource.getRepository(Appointment);
  const data = await appointmentRepo.find({
    relations: {
      slot: true,
    },
  });
  // const data = await slotRepo.find({
  //   relations: {
  //     appointment: true,
  //   },
  // });
  res.send(data);
});

app.use(errorHandler);

app.all('*', () => {
  console.log('Looks like someone accessing the route which is not defined');
  throw new NotFoundError('Route not found');
});

export { app };
