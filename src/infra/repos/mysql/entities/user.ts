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
import { v4 as uuidv4 } from 'uuid';
import { PatientEntity } from './patient';


@Entity({ name: 'usuarios' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;

  @PrimaryColumn({ name: 'user_id', unique: true,  default: uuidv4() })
  userId!: string;

  @Column({ name: 'nome' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @Length(6, 255, { message: 'O nome deve ter entre 6 e 255 caracteres' })
  name!: string;

  @Column({ name: 'crp', unique: true })
  @IsNotEmpty({ message: 'O crp é obrigatório' })
  @Length(6, 6, { message: 'O crp deve ter 6 caracteres' })
  crpCode!: string;

  @Column({ name: 'email', unique: true  })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @IsEmail({}, { message: 'Deve ser um e-mail válido' })
  email!: string;

  @Column({ name: 'senha', select: false })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  password!: string;

  @Column({ name: 'data_nascimento', type: 'date', nullable: true })
  @IsDateString({}, { message: 'A data de nascimento deve ser uma data válida' })
  birthDate?: string;

  @Column({ name: 'telefone' })
  @IsMobilePhone("pt-BR", {}, { message: 'O número de telefone deve ser válido' })
  phone!: string;

  @Column({ name: 'endereco', nullable: true })
  @IsNotEmpty({ message: 'O endereço é obrigatório' })
  address?: string;

  @Column({ name: 'tipo_usuario' })
  @IsEnum(['ADM', 'ESPECIALISTA'], { message: 'Tipo de usuário deve ser ADM, PROFISSIONAL' })
  userType!: string;

  @CreateDateColumn({ name: 'data_cadastro', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'data_atualizacao', type: 'timestamp' })
  updatedAt!: Date;

  @Column({ name: 'ultimo_login', type: 'timestamp', nullable: true })
  lastSession?: Date;

  @Column({ name: 'status_conta', default: true })
  @IsBoolean({ message: 'Status da conta deve ser um valor booleano' })
  accountStatus!: boolean;

  @OneToMany(() => PatientEntity, (patient) => patient.specialist, { cascade: true })
  patients?: PatientEntity[];
}
