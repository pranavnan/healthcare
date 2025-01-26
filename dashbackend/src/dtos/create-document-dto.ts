import { DocumentStatus } from '../enums/document-status';

export interface CreateIndexDocumentDTO {
  indexName: string;
  text: string;
  doctorLocationId: number;
  status: DocumentStatus;
  documentTypeId: number;
  indexId: number;
}
/**
 * created_at
 * updated_at
 * doctorLocationId: array
 * status
 * documentTypeId
 * documentTypeLabel
 * keywords: ["appointment", "report", "prescription", "feedback"]
 * category
 * version
 * language
 * tags: ["urgent", "telemedicine", "covid"]
 */
