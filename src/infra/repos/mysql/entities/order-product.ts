import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { OrderEntity } from './order';
import { ProductEntity } from './product';
import { IngredientProductEntity } from './ingredient-product';

@Entity({ name: 'produtos_pedidos' })
export class OrderProductEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderProducts, { onDelete: 'CASCADE' })
  order!: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderProducts, { onDelete: 'CASCADE' })
  product!: ProductEntity;

  @OneToMany(() => IngredientProductEntity, (ingredientProduct) => ingredientProduct.orderProduct, { cascade: true })
  ingredientProducts?: IngredientProductEntity[]; 
}
