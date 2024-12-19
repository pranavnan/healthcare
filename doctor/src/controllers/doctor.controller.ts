import { inject } from 'inversify';
import { TYPES } from '../inversify/types';
import { Request, Response } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
import { IDoctorService } from '../interfaces/doctor/doctor.service.interface';

@controller('/doctors')
export class DoctorController {
  constructor(
    @inject(TYPES.DoctorService) private doctorService: IDoctorService
  ) {}

  async create(req: Request, res: Response) {
    console.log('Inside DoctorController');
    await this.doctorService.createDoctor();
    res.send({
      error: false,
      message: 'Doctor created sucessfully',
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
