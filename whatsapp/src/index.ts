import { app } from './app';
import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(() => {
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log('Whatsapp server started on PORT: ', PORT);
    });
  })
  .catch(console.error);
