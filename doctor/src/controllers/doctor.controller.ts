import { inject } from 'inversify';
import { TYPES } from '../inversify/types';
import { Request, Response } from 'express';
import {
  controller,
  httpGet,
  httpPost,
  httpPut,
} from 'inversify-express-utils';
import { IDoctorService } from '../interfaces/doctor/doctor.service.interface';
import {
  createDoctorValidation,
  getAllDoctorValidation,
  getDoctorValidation,
} from '../middlewares/doctor';
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

  @httpPut('/:id')
  async update(req: Request, res: Response) {
    const dto = req.body as CreateDoctorDTO;
    const { id } = req.params;

    const doctor = await this.doctorService.updateDoctor(Number(id), dto);

    res.status(200).json(doctor);
  }

  @httpGet('/', ...getAllDoctorValidation, validateRequest)
  async getDoctors(req: Request, res: Response) {
    const { page = 1, limit = 10 } = req.query;

    const data = await this.doctorService.getDoctors(
      Number(page),
      Number(limit)
    );
    res.send(data);
  }

  @httpGet('/:id', ...getDoctorValidation, validateRequest)
  async getDoctor(req: Request, res: Response) {
    const { id } = req.params;
    const doctor = await this.doctorService.getDoctor(Number(id));
    res.status(200).json(doctor);
  }
}
