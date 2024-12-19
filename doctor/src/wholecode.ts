// import 'reflect-metadata';
// import { controller, httpPut, httpPost, httpGet } from 'inversify-express-utils';
// import { Request, Response } from 'express';
// import { inject } from 'inversify';
// import { validateRequest } from '../middlewares/validateRequest';
// import { updateDoctorValidation, createDoctorValidation } from '../middlewares/doctorValidation';
// import { TYPES } from '../types';
// import { DoctorService } from '../services/DoctorService';
// import { LoggerService } from '../services/LoggerService';
// import { ApiError } from '../utils/ApiError';

// @controller('/api/doctor')
// export class DoctorController {
//   constructor(
//     @inject(TYPES.DoctorService) private readonly doctorService: DoctorService,
//     @inject(TYPES.LoggerService) private readonly loggerService: LoggerService
//   ) {}

//   @httpPost('/', ...createDoctorValidation, validateRequest)
//   public async createDoctor(req: Request, res: Response): Promise<void> {
//     const doctorData = req.body;
//     const doctor = await this.doctorService.createDoctor(doctorData);

//     this.loggerService.info('Doctor created successfully', doctor);
//     res.status(201).send({ message: 'Doctor created successfully', data: doctor });
//   }

//   @httpPut('/:doctorId', ...updateDoctorValidation, validateRequest)
//   public async updateDoctor(req: Request, res: Response): Promise<void> {
//     const { doctorId } = req.params;
//     const doctorData = req.body;
//     const updatedDoctor = await this.doctorService.updateDoctor(+doctorId, doctorData);

//     this.loggerService.info(`Doctor with ID ${doctorId} updated successfully`, updatedDoctor);
//     res.status(200).send({ message: 'Doctor updated successfully', data: updatedDoctor });
//   }

//   @httpGet('/')
//   public async getDoctors(req: Request, res: Response): Promise<void> {
//     const doctors = await this.doctorService.getAllDoctors();
//     this.loggerService.info('Fetched all doctors', { count: doctors.length });
//     res.status(200).send({ data: doctors });
//   }
// }

// // --- DoctorService.ts ---

// import { injectable } from 'inversify';
// import { DoctorRepository } from '../repositories/DoctorRepository';
// import { Doctor } from '../entities/Doctor';
// import { ApiError } from '../utils/ApiError';

// @injectable()
// export class DoctorService {
//   constructor(private readonly doctorRepository: DoctorRepository) {}

//   public async createDoctor(doctorData: Partial<Doctor>): Promise<Doctor> {
//     try {
//       return this.doctorRepository.createAndSave(doctorData);
//     } catch (error) {
//       throw new ApiError('Failed to create doctor', 500, error);
//     }
//   }

//   public async updateDoctor(doctorId: number, doctorData: Partial<Doctor>): Promise<Doctor> {
//     try {
//       return this.doctorRepository.updateAndSave(doctorId, doctorData);
//     } catch (error) {
//       throw new ApiError(`Failed to update doctor with ID ${doctorId}`, 500, error);
//     }
//   }

//   public async getAllDoctors(): Promise<Doctor[]> {
//     try {
//       return this.doctorRepository.findAll();
//     } catch (error) {
//       throw new ApiError('Failed to fetch doctors', 500, error);
//     }
//   }
// }

// // --- DoctorRepository.ts ---

// import { injectable } from 'inversify';
// import { Repository } from 'typeorm';
// import { Doctor } from '../entities/Doctor';
// import { AppDataSource } from '../data-source';
// import { ApiError } from '../utils/ApiError';

// @injectable()
// export class DoctorRepository {
//   private readonly repository: Repository<Doctor>;

//   constructor() {
//     this.repository = AppDataSource.getRepository(Doctor);
//   }

//   public async createAndSave(doctorData: Partial<Doctor>): Promise<Doctor> {
//     try {
//       const doctor = this.repository.create(doctorData);
//       return this.repository.save(doctor);
//     } catch (error) {
//       throw new ApiError('Failed to save doctor', 500, error);
//     }
//   }

//   public async updateAndSave(doctorId: number, doctorData: Partial<Doctor>): Promise<Doctor> {
//     try {
//       await this.repository.update(doctorId, doctorData);
//       return this.repository.findOneOrFail({ where: { id: doctorId } });
//     } catch (error) {
//       throw new ApiError(`Failed to update doctor with ID ${doctorId}`, 500, error);
//     }
//   }

//   public async findAll(): Promise<Doctor[]> {
//     try {
//       return this.repository.find();
//     } catch (error) {
//       throw new ApiError('Failed to fetch doctors', 500, error);
//     }
//   }
// }

// // --- LoggerService.ts ---

// import { injectable } from 'inversify';

// @injectable()
// export class LoggerService {
//   public info(message: string, meta?: any): void {
//     console.log(`INFO: ${message}`, meta || '');
//   }

//   public error(message: string, error: any): void {
//     console.error(`ERROR: ${message}`, error);
//   }
// }

// // --- ApiError.ts ---

// export class ApiError extends Error {
//   public statusCode: number;
//   public originalError?: any;

//   constructor(message: string, statusCode: number, originalError?: any) {
//     super(message);
//     this.statusCode = statusCode;
//     this.originalError = originalError;

//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// // --- doctorValidation.ts ---

// import { body, param } from 'express-validator';

// export const createDoctorValidation = [
//   body('name').isLength({ min: 5, max: 100 }).withMessage('Name must be between 5 and 100 characters'),
//   body('speciality_id').isInt({ gt: 0 }).withMessage('Speciality ID must be a positive integer'),
//   body('email').isEmail().withMessage('Email must be valid'),
//   body('phone').isNumeric().withMessage('Phone must be numeric'),
//   body('qualification').isLength({ min: 5, max: 100 }).withMessage('Qualification must be between 5 and 100 characters'),
//   body('years_of_experience').isInt({ gt: -1 }).withMessage('Experience must be 0 or more'),
//   body('bio').isLength({ min: 11 }).withMessage('Bio must be at least 11 characters long'),
//   body('profile_picture').optional().isURL().withMessage('Profile picture must be a valid URL'),
// ];

// export const updateDoctorValidation = [
//   ...createDoctorValidation,
//   param('doctorId').isInt({ gt: 0 }).withMessage('Doctor ID must be a valid integer'),
// ];
