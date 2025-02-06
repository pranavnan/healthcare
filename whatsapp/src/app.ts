import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './inversify/container';
import express from 'express';
import { errorHandler } from '@phntickets/booking';

// controllers import
import './controllers';

// container binding import
import './inversify';
import { redisClient } from './services/redis.service';
redisClient.set('ss', 'dd');
const server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
});

server.setErrorConfig((app) => {
  app.use(errorHandler);
});

const app = server.build();

export { app };
