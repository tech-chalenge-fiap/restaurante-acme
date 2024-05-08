import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';

import { OrderProductEntity } from './order-product'; // Importação da entidade OrderProductEntity
import { IngredientEntity } from './ingredient'; // Importação da entidade IngredientEntity

@Entity({ name: 'ingredientes_produtos' })
export class IngredientProductEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;

  @ManyToOne(() => OrderProductEntity, (orderProduct) => orderProduct.ingredientProducts, { onDelete: 'CASCADE' })
  orderProduct!: OrderProductEntity;

  @ManyToOne(() => IngredientEntity, (ingredient) => ingredient.ingredientProducts, { onDelete: 'CASCADE' })
  ingredient!: IngredientEntity;
}
