import { Request, Response } from 'express';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { CreateIndexDocumentDTO } from '../dtos/create-document-dto';

import { TYPES } from '../inversify/types';
import { IndexDocumentService } from '../services/index-document.service';
import { inject } from 'inversify';
import {
  createIndexDocumentValidation,
  getIndexDocumentValidation,
} from '../middlewares/index-document.ts';
import { validateRequest } from '@phntickets/booking';

@controller('/api/dash/index-document')
export class IndexDocument {
  constructor(
    @inject(TYPES.IndexDocumentService)
    private documentService: IndexDocumentService
  ) {}

  @httpPost('/', ...createIndexDocumentValidation, validateRequest)
  async create(req: Request, res: Response): Promise<void> {
    const dto = req.body as CreateIndexDocumentDTO;

    const result = await this.documentService.createIndexDocument(dto);

    res.status(201).json({
      message: 'IndexDocument created sucessfully',
      result,
    });
  }

  @httpGet('/get-docs-by-text/', ...getIndexDocumentValidation, validateRequest)
  async getDocument(req: Request, res: Response) {
    const { text, indexId } = req.query;

    const result = await this.documentService.getIndexDocuments({
      text: String(text),
      indexId: Number(indexId),
    });

    res.status(200).json(result);
  }
}
