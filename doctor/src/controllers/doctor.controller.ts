import { inject } from 'inversify';
import { TYPES } from '../inversify/types';
import { Request, Response } from 'express';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { IDoctorService } from '../interfaces/doctor/doctor.service.interface';
import { createDoctorValidation } from '../middlewares/doctor';
import { validateRequest } from '@phntickets/booking';
import { CreateDoctorDTO } from '../dtos/create-doctor-dto';

@controller('/api/doctor')
export class DoctorController {
  constructor(
    @inject(TYPES.DoctorService) private doctorService: IDoctorService
  ) {}

  @httpPost('/', ...createDoctorValidation, validateRequest)
  async create(req: Request, res: Response) {
    console.log('Inside DoctorController');
    const dto: CreateDoctorDTO = req.body;

    const doctor = await this.doctorService.createDoctor(dto);

    res.status(201).json({
      message: 'Doctor created sucessfully',
      doctor: doctor,
    });
  }

  async update(req: Request, res: Response) {}

  @httpGet('/')
  async getDoctors(req: Request, res: Response) {
    const data = await this.doctorService.getDoctors();
    res.send(data);
  }

  async getDoctor(req: Request, res: Response) {}
}
