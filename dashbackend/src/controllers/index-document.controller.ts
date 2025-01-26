import { Request, Response } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import { CreateIndexDocumentDTO } from '../dtos/create-document-dto';

import { TYPES } from '../inversify/types';
import { IndexDocumentService } from '../services/index-document.service';
import { inject } from 'inversify';

@controller('/api/dash/index-document')
export class IndexDocument {
  constructor(
    @inject(TYPES.IndexDocumentService)
    private indexRepository: IndexDocumentService
  ) {}

  @httpPost('/')
  async create(req: Request, res: Response): Promise<void> {
    const dto = req.body as CreateIndexDocumentDTO;

    const result = await this.indexRepository.createIndexDocument(dto);

    res.status(201).json({
      message: 'IndexDocument created sucessfully',
      result,
    });
  }
}
