import { AppDataSource } from './data-source';
import { app } from './app';
import { kafkaWrapper } from '@phntickets/booking';

AppDataSource.initialize()
  .then(async () => {
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    const clientId = 'doctor-service';
    await kafkaWrapper.connect(['kafka-srv:9092'], clientId);
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });
