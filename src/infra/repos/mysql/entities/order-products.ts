import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { OrderEntity } from './order';
import { CategoryProductsEntity } from './category-products';
import { IsNotEmpty, Length } from 'class-validator';
import { ProductsEntity } from './products';


@Entity({ name: 'produtos_pedidos' })
export class OrderProductsEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;
  
  @Column({ name: 'produto_pedido_id', unique: true,  default: uuidv4() })
  orderProductsId!: string;

  @Column({ name: 'descricao' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @Length(6, 255, { message: 'O nome deve ter entre 6 e 255 caracteres' })
  description!: string;

  @CreateDateColumn({ name: 'data_cadastro', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'data_atualizacao', type: 'timestamp' })
  updatedAt!: Date;

  @ManyToOne(() => OrderEntity, (order) => order.orderProducts, { onDelete: 'CASCADE' })
  order!: OrderEntity;

  @ManyToOne(() => ProductsEntity, (products) => products.orderProducts, { onDelete: 'CASCADE' })
  products!: ProductsEntity;
}
