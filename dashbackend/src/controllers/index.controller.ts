import { Request, Response } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import { TYPES } from '../inversify/types';
import { IIndexService } from '../interfaces/index/index.service.interface';

import { createIndexValidation } from '../middlewares/index';
import { validateRequest } from '@phntickets/booking';
import { CreateIndexDto } from '../dtos/create-index-dto';
import { inject } from 'inversify';

@controller('/api/dash/index')
export class Index {
  constructor(
    @inject(TYPES.IndexService) private indexService: IIndexService
  ) {}

  @httpPost('/', ...createIndexValidation, validateRequest)
  async create(req: Request, res: Response): Promise<void> {
    const dto = req.body as CreateIndexDto;

    const result = await this.indexService.createIndex(dto);

    res.status(201).json({
      message: 'PineconeIndex created sucessfully',
      result,
    });
  }
}
