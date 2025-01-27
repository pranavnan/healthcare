import { body } from 'express-validator';
import { DocumentStatus } from '../../enums/document-status';

export const createIndexDocumentValidation = [
  body('documentName')
    .isLength({ min: 5, max: 50 })
    .withMessage('Document name must be between 5 to 50 characters'),

  body('text')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Text must be provided'),

  body('doctorLocationId')
    .isInt({ gt: 0 })
    .withMessage('Doctor location ID must be a positive integer'),

  body('status')
    .isIn(Object.values(DocumentStatus))
    .withMessage(
      `Status must be one of ${Object.values(DocumentStatus).join(', ')}`
    ),

  body('documentTypeId')
    .isInt({ gt: 0 })
    .withMessage('Document type ID must be a positive integer'),

  body('indexId')
    .isInt({ gt: 0 })
    .withMessage('Index ID must be a positive integer'),
];
