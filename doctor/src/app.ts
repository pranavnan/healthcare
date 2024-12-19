import 'reflect-metadata';
import express from 'express';
import { container } from './inversify/container';
import { InversifyExpressServer } from 'inversify-express-utils';
import { errorHandler } from '@phntickets/booking';
import './controllers/doctor.controller';

process.env.NODE_ENV = 'test';
const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

  // app.use('/api', express.Router());
});

server.setErrorConfig((app) => {
  app.use(errorHandler);
});

const app = server.build();

export { app };
