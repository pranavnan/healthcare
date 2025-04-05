import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './inversify/container';
import express from 'express';
import { errorHandler } from '@phntickets/booking';
import { httpLogger } from './middleware/http-logger.middleware';
import Logger from './utils/logger';

// controllers import
import './controllers';

// container binding import
import './inversify';
import { redisClient } from './services/redis.service';

Logger.info('Initializing WhatsApp microservice');
redisClient.set('ss', 'dd');

const server = new InversifyExpressServer(container);
server.setConfig((app) => {
  // Add HTTP request logging middleware
  app.use(httpLogger);
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  Logger.info('Express middleware configured');
});

server.setErrorConfig((app) => {
  app.use(errorHandler);
  Logger.info('Error handlers configured');
});

const app = server.build();
Logger.info('WhatsApp microservice initialized successfully');

export { app };
