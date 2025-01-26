import { app } from './app';
import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(() => {
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Dashbackend server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Dashbackend server failed to start`, err);
  });
