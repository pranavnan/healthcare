import { DoctorLocationService } from '../services/doctor-location.service';
import { Request, Response } from 'express';
import { CreateDoctorLocationDTO } from '../dtos/create-doctor-location';
import { inject } from 'inversify';
import { TYPES } from '../inversify/types';
import { controller, httpDelete, httpPost } from 'inversify-express-utils';

@controller('/api/doctor-location')
export class DoctorLocationController {
  constructor(
    @inject(TYPES.DocLocService) private docLocService: DoctorLocationService
  ) {}

  @httpPost('/')
  async attachDoctorLocation(req: Request, res: Response) {
    const dto = req.body as CreateDoctorLocationDTO;

    const attachedDocLoc = await this.docLocService.attachDoctorLocation(dto);
    res.status(201).json(attachedDocLoc);
  }

  @httpDelete('/:docLocId')
  async detachDoctorLocation(req: Request, res: Response) {
    const docLocId = req.params.docLocId;
    const deleteResponse = await this.docLocService.detachDoctorLocation(
      Number(docLocId)
    );
    console.log({ deleteResponse });
    res.status(204).send();
  }
}
