import { RAGService } from '../../services/rag.service';
import { container } from '../container';
import { TYPES } from '../types';

container.bind(TYPES.Automation.RAGService).to(RAGService);
