import { PineconeMetric } from '@phntickets/booking';
import { body } from 'express-validator';

export const createIndexValidation = [
  body('indexName')
    .isLength({ min: 5, max: 50 })
    .withMessage('Index name must be between 5 to 50 characters'),

  body('dimension')
    .isInt({ gt: 0 })
    .withMessage('Dimension of index must be provided'),

  body('metric')
    .isIn(Object.values(PineconeMetric))
    .withMessage(
      `Metric must be one of ${Object.values(PineconeMetric).join(', ')}`
    ),

  body('indexTypeId')
    .isInt({ gt: 0 })
    .withMessage('Index type must be provided'),
];
