import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column
} from 'typeorm';

import { OrderProductEntity } from './order-product'; // Importação da entidade OrderProductEntity
import { IngredientEntity } from './ingredient'; // Importação da entidade IngredientEntity
import { IsNumber, IsPositive } from 'class-validator';

@Entity({ name: 'ingredientes_produtos' })
export class IngredientProductEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;

  @Column({ name: 'quantidade' })
  @IsNumber({}, { message: 'A quantidade deve ser um número' })
  @IsPositive({ message: 'A quantidade deve ser positivo' })
  count!: number;

  @ManyToOne(() => OrderProductEntity, (orderProduct) => orderProduct.ingredientProducts, { onDelete: 'CASCADE' })
  orderProduct!: OrderProductEntity;

  @ManyToOne(() => IngredientEntity, (ingredient) => ingredient.ingredientProducts, { onDelete: 'CASCADE' })
  ingredient!: IngredientEntity;
}
