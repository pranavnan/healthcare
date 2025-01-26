import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IndexType } from './index-type.entities';
import { PineconeMetric } from '../enums/pinecone-metric';
import { IndexDocument } from './index-document.entities';

@Entity()
export class Index {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  dimension: number;

  @Column({ type: 'varchar', nullable: false })
  metrics: PineconeMetric;

  @Column({ type: 'varchar', length: 50, nullable: false })
  index_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // relations
  @ManyToOne(() => IndexType, (indexType) => indexType.index)
  indexType: IndexType;

  @OneToMany(() => IndexDocument, (indexDocument) => indexDocument.index)
  indexDocument: IndexDocument[];
}
