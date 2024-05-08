import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  Column
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { IsNotEmpty, Length } from 'class-validator';
import { OrderProductEntity } from './order-product'; 
import { CategoryEntity } from './category';

@Entity({ name: 'produtos' })
export class ProductEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;

  @Column({ name: 'produto_id', unique: true, default: uuidv4() })
  productId!: string;

  @Column({ name: 'nome' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @Length(6, 255, { message: 'O nome deve ter entre 6 e 255 caracteres' })
  name!: string;

  @Column({ name: 'descricao' })
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  @Length(6, 255, { message: 'A descrição deve ter entre 6 e 255 caracteres' })
  description!: string;

  @CreateDateColumn({ name: 'data_cadastro', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'data_atualizacao', type: 'timestamp' })
  updatedAt!: Date;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product, { cascade: true })
  orderProducts!: OrderProductEntity[]; 

  @ManyToOne(() => CategoryEntity, (category) => category.products, { onDelete: 'SET NULL' })
  category?: CategoryEntity; 
}
