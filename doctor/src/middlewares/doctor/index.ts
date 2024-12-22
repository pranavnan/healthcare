import { param, query, body } from 'express-validator';

export const createDoctorValidation = [
  body('name')
    .isLength({ min: 5, max: 100 })
    .withMessage('Name must be between 5 to 100 characters'),

  body('speciality_id')
    .isInt({ gt: 0 })
    .withMessage('Speciality of doctor must be provided'),

  body('email')
    .optional()
    .isEmail()
    .withMessage('Email must be an valid email'),

  body('phone')
    .isNumeric()
    .withMessage('Phone number must contain only digits'),

  body('qualification')
    .isLength({ min: 5, max: 100 })
    .withMessage('Qualification must be longer than 5 characters'),

  body('years_of_experience')
    .isInt({ gt: -1, lt: 60 })
    .withMessage('Years of experience must be greater than 0'),

  body('bio').isLength({ min: 11 }).withMessage('Doctor bio must be provided'),

  body('profile_picture')
    .optional()
    .isURL()
    .withMessage('Profile URL must be valid'),
];
