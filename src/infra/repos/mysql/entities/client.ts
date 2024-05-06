import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  PrimaryColumn
} from 'typeorm';
import { IsEmail, IsNotEmpty, Length, IsEnum, IsDateString, IsBoolean, IsMobilePhone } from 'class-validator';
import { IsCPF } from 'brazilian-class-validator';
import { v4 as uuidv4 } from 'uuid';
import { OrderEntity } from './order';


@Entity({ name: 'clientes' })
export class ClientEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;

  @PrimaryColumn({ name: 'cliente_id', unique: true,  default: uuidv4() })
  clientId!: string;

  @Column({ name: 'nome' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @Length(6, 255, { message: 'O nome deve ter entre 6 e 255 caracteres' })
  name!: string;

  @Column({ name: 'cpf', unique: true })
  @IsNotEmpty({ message: 'O cpf é obrigatório' })
  @IsCPF({ message: 'O número de cpf deve ser válido' })
  registration!: string;

  @Column({ name: 'email', unique: true  })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @IsEmail({}, { message: 'Deve ser um e-mail válido' })
  email!: string;

  @CreateDateColumn({ name: 'data_cadastro', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'data_atualizacao', type: 'timestamp' })
  updatedAt!: Date;

  @OneToMany(() => OrderEntity, (order) => order.client, { cascade: true })
  orders?: OrderEntity[];
}
