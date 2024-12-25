import { AppDataSource } from './data-source';
import { app } from './app';

AppDataSource.initialize()
  .then(() => {
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });
