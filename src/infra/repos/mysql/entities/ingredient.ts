import { MaxLength, IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Column,
  ManyToOne,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { IngredientProductEntity } from './ingredient-product';
import { CategoryEntity } from './category';


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

  @Column({ name: 'preco', type: 'decimal', precision: 10, scale: 2 })
  @IsNumber({}, { message: 'O preço deve ser um número' })
  @IsPositive({ message: 'O preço deve ser positivo' })
  @Min(0.01, { message: 'O preço deve ser pelo menos 0,01' })
  price!: number;

  @CreateDateColumn({ name: 'data_cadastro', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'data_atualizacao', type: 'timestamp' })
  updatedAt!: Date;

  @OneToMany(() => IngredientProductEntity, (ingredientProduct) => ingredientProduct.ingredient, { cascade: true })
  ingredientProducts?: IngredientProductEntity[];

  @ManyToOne(() => CategoryEntity, (category) => category.products, { onDelete: 'SET NULL' })
  category?: CategoryEntity;
}
