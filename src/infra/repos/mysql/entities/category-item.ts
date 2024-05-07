import { MaxLength, IsNotEmpty } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { OrderItemEntity } from './order-item';


@Entity({ name: 'items_categoria' })
export class CategoryItemEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;
  
  @Column({ name: 'items_categoria_id', unique: true,  default: uuidv4() })
  itemCategoryId!: string;
 
  @Column({ name: 'nome' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(255, { message: 'O nome historico ter  no máximo 255 caracteres' })
  name!: string;

  @CreateDateColumn({ name: 'data_cadastro', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'data_atualizacao', type: 'timestamp' })
  updatedAt!: Date;

  @OneToMany(() => OrderItemEntity, (order) => order.categoryItem, { cascade: true })
  ordemItems?: OrderItemEntity[];
}
