import { MaxLength, IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Column
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { ProductEntity } from './product';
import { IngredientEntity } from './ingredient';


@Entity({ name: 'categorias' })
export class CategoryEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;
  
  @Column({ name: 'categoria_id', unique: true,  default: uuidv4() })
  categoryId!: string;
 
  @Column({ name: 'nome' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(255, { message: 'O nome historico ter  no máximo 255 caracteres' })
  name!: string;

  @CreateDateColumn({ name: 'data_cadastro', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'data_atualizacao', type: 'timestamp' })
  updatedAt!: Date;

  @OneToMany(() => ProductEntity, (product) => product.category, { cascade: true })
  products?: ProductEntity[];

  @OneToMany(() => IngredientEntity, (ingredient) => ingredient.category, { cascade: true })
  ingredients?: IngredientEntity[];
}
