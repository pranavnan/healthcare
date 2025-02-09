import { kafkaWrapper } from '@phntickets/booking';
import { app } from './app';
import { DoctorLocationCreatedListener } from './events/listeners/doctorLocationCreatedListener';
import { AppDataSource } from './data-source';
import { SlotCreatedListener } from './events/listeners/slotCreatedListener';
// import { UserCreatedListener } from './events/listeners/userCreatedListener';

async function start() {
  try {
    await AppDataSource.initialize()
      .then(() => {
        console.log('Appointment data-source connected');
      })
      .catch(console.error);

    // for dev purpose we put this listen to before kafka init because we need to start the application ASAP

    app.listen(3000, () => {
      console.log('Appointment service listening on 3000');
    });

    const clientId = 'appointment-service';
    await kafkaWrapper.connect(['kafka-srv:9092'], clientId);

    await new DoctorLocationCreatedListener(kafkaWrapper).listen();
    await new SlotCreatedListener(kafkaWrapper).listen();
  } catch (err) {
    console.log('Failed to start appointment service', err);
  }
}

start();
