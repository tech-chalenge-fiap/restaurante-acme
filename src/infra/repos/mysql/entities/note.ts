import { MaxLength } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { PatientEntity } from './patient';


@Entity({ name: 'notas' })
export class NoteEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;
  
  @Column({ name: 'note_id', unique: true,  default: uuidv4() })
  noteId!: string;

  @ManyToOne(() => PatientEntity, (patient) => patient.notes, { onDelete: 'CASCADE' })
  patient!: PatientEntity;
 

  @Column({ name: 'historico' })
  @MaxLength(2500, { message: 'O nome historico ter  no máximo 2500 caracteres' })
  historic!: string;


  @CreateDateColumn({ name: 'data_cadastro', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'data_atualizacao', type: 'timestamp' })
  updatedAt!: Date;
}
