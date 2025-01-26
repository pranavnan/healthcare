import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DocumentStatus } from '../enums/document-status';
import { IndexDocumentType } from './index-document-type.entities';
import { Index } from './index.entities';

@Entity()
export class IndexDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: Object.values(DocumentStatus),
  })
  status: DocumentStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // relations
  @ManyToOne(
    () => IndexDocumentType,
    (indexDocumentType) => indexDocumentType.indexDocument
  )
  index_document_type: IndexDocumentType;

  @ManyToOne(() => Index, (index) => index.indexDocument)
  index: Index;
}
