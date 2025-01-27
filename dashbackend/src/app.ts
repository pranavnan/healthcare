import 'reflect-metadata';
import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './inversify/container';
import { errorHandler } from '@phntickets/booking';

// controllers import
import './controllers/index.controller';
import './controllers/index-document.controller';

// container binding import
import './inversify/index';
import './inversify/index-document-type';
import './inversify/index-documents';
import './inversify/index-type';
import './inversify/openai';
import './inversify/pinecone-index';

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
