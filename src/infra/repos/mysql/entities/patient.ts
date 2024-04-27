import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne
  } from 'typeorm';
  import { IsEmail, IsNotEmpty, Length, IsEnum, IsDateString, IsMobilePhone, MaxLength } from 'class-validator';
  import { IsCPF } from 'brazilian-class-validator';
  import { v4 as uuidv4 } from 'uuid';

  import { NoteEntity, UserEntity } from '@/infra/repos/mysql/entities'
  
  
  @Entity({ name: 'pacientes' })
  export class PatientEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id?: number;
  
    @Column({ name: 'pacient_id', unique: true,  default: uuidv4() })
    patientId!: string;
  
    @Column({ name: 'nome' })
    @IsNotEmpty({ message: 'O nome é obrigatório' })
    @Length(6, 255, { message: 'O nome deve ter entre 6 e 255 caracteres' })
    name!: string;

    @Column({ name: 'email', unique: true })
    @IsNotEmpty({ message: 'O e-mail é obrigatório' })
    @IsEmail({}, { message: 'Deve ser um e-mail válido' })
    email!: string;

    @Column({ name: 'cpf', unique: true })
    @IsNotEmpty({ message: 'O cpf é obrigatório' })
    @IsCPF({ message: 'O número de cpf deve ser válido' })
    registration!: string;
  
    @Column({ name: 'data_nascimento', type: 'date', nullable: true })
    @IsDateString({}, { message: 'A data de nascimento deve ser uma data válida' })
    birthDate?: string;
  
    @Column({ name: 'telefone', nullable: true })
    @IsMobilePhone("pt-BR", {}, { message: 'O número de telefone deve ser válido' })
    phone?: string;
  
    @Column({ name: 'endereco', nullable: true })
    @IsNotEmpty({ message: 'O endereço é obrigatório' })
    address?: string;

    @Column({ name: 'escolaridade', nullable: true  })
    @IsEnum([
        'Ensino Pré-Escolar',
        'Ensino Fundamental', 
        'Ensino Médio', 'Ensino Superior', 
        'EJA - Educação de Jovens e Adultos', 
        'FA - Ensino Fundamental de Adultos'], 
        { message: 'Tipo de escolaridade inválido' })
    education?: string;

    @Column({ name: 'instituicao_ensino', nullable: true  })
    @IsEnum(['Privada', 'Pública'], { message: 'Tipo de instituicao_ensino inválido' })
    educationalInstitution?: string

    @Column({ name: 'serie_ano' })
    @MaxLength(20, { message: 'A série/ano deve ter no máximo 20 caracteres' })
    grade?: string;

    @Column({ name: 'genero', nullable: true  })
    gender?: string
  
    @CreateDateColumn({ name: 'data_cadastro', type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ name: 'data_atualizacao', type: 'timestamp' })
    updatedAt!: Date;

    @ManyToOne(() => UserEntity, (specialist) => specialist.patients, { onDelete: 'CASCADE' })
    specialist!: UserEntity;

    @OneToMany(() => NoteEntity, (note) => note.patient, { cascade: true })
    notes?: NoteEntity[];
  }
  