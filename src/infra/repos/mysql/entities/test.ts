import { MaxLength, IsNotEmpty } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { TestCategoryEntity } from './test-category';


@Entity({ name: 'tests' })
export class TestEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;
  
  @Column({ name: 'teste_id', unique: true,  default: uuidv4() })
  testId!: string;

  @Column({ name: 'nome' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(255, { message: 'O nome historico ter  no máximo 255 caracteres' })
  name!: string;

  @Column({ name: 'descricao' })
  @MaxLength(2500, { message: 'O nome historico ter  no máximo 2500 caracteres' })
  description!: string;

  @CreateDateColumn({ name: 'data_cadastro', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'data_atualizacao', type: 'timestamp' })
  updatedAt!: Date;

  @ManyToOne(() => TestCategoryEntity, (category) => category.tests, { onDelete: 'CASCADE' })
  category?: TestCategoryEntity;
 
}
