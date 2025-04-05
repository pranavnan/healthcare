import { app } from './app';
import { AppDataSource } from './data-source';
import Logger from './utils/logger';

AppDataSource.initialize()
  .then(() => {
    const PORT = 3000;
    app.listen(PORT, () => {
      Logger.info(`WhatsApp server started on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    Logger.error('Error initializing data source:', error);
  });
