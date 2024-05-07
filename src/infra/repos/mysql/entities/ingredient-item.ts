import { MaxLength, IsNotEmpty } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';


@Entity({ name: 'ingredientes_item' })
export class IngredientItemEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;
  
  @Column({ name: 'ingredientes_item_id', unique: true,  default: uuidv4() })
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
}
