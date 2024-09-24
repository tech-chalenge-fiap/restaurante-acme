import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Column
} from 'typeorm';
import { OrderEntity } from './order';
import { ProductEntity } from './product';
import { IngredientProductEntity } from './ingredient-product';
import { IsNumber, IsPositive, Min } from 'class-validator';

@Entity({ name: 'produtos_pedidos' })
export class OrderProductEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;

  @Column({ name: 'quantidade', default: 1  })
  @IsNumber({}, { message: 'A quantidade deve ser um número' })
  @IsPositive({ message: 'A quantidade deve ser positivo' })
  count!: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderProducts, { onDelete: 'CASCADE' })
  order!: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderProducts, { onDelete: 'CASCADE' })
  product!: ProductEntity;

  @OneToMany(() => IngredientProductEntity, (ingredientProduct) => ingredientProduct.orderProduct, { cascade: true })
  ingredientProducts?: IngredientProductEntity[]; 
}
