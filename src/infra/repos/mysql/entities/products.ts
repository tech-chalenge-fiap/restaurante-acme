import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { CategoryProductsEntity } from './category-products';
import { IsNotEmpty, Length } from 'class-validator';
import { OrderProductsEntity } from './order-products';


@Entity({ name: 'produtos' })
export class ProductsEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;
  
  @Column({ name: 'produto_id', unique: true,  default: uuidv4() })
  orderProductsId!: string;

  @Column({ name: 'nome' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @Length(6, 255, { message: 'O nome deve ter entre 6 e 255 caracteres' })
  name!: string;

  @Column({ name: 'descricao' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @Length(6, 255, { message: 'O nome deve ter entre 6 e 255 caracteres' })
  description!: string;

  @CreateDateColumn({ name: 'data_cadastro', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'data_atualizacao', type: 'timestamp' })
  updatedAt!: Date;

  @ManyToMany(() => CategoryProductsEntity, (category) => category.products, { onDelete: 'CASCADE' })
  categoryProducts!: CategoryProductsEntity;
}
