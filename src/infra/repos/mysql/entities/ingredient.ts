import { MaxLength, IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Column,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { IngredientProductEntity } from './ingredient-product';


@Entity({ name: 'ingredientes' })
export class IngredientEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;

  @Column({ name: 'ingrediente_id', unique: true, default: uuidv4() })
  ingredientId!: string;

  @Column({ name: 'nome' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(255, { message: 'O nome historico ter  no máximo 255 caracteres' })
  name!: string;

  @Column({ name: 'descricao' })
  @MaxLength(2500, { message: 'A descricao ter  no máximo 2500 caracteres' })
  description!: string;

  @CreateDateColumn({ name: 'data_cadastro', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'data_atualizacao', type: 'timestamp' })
  updatedAt!: Date;

  @OneToMany(() => IngredientProductEntity, (ingredientProduct) => ingredientProduct.ingredient, { cascade: true })
  ingredientProducts?: IngredientProductEntity[];
}
