import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Column
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { OrderProductEntity, ClientEntity } from '@/infra/repos/mysql/entities'
import { IsEnum, IsNotEmpty, MaxLength } from 'class-validator';


@Entity({ name: 'pedidos' })
export class OrderEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;

  @Column({ name: 'pedido_id', unique: true, default: uuidv4() })
  orderId!: string;
  
  @Column({ name: 'status', default: 'Recebido'})
  @IsEnum(['Recebido', 'Em Preparação', 'Pronto', 'Finalizado'], { message: "O status do pedido deve ser ['Recebido', 'Em Preparação', 'Pronto', 'Finalizado']" })
  @MaxLength(255, { message: 'O status ter  no máximo 255 caracteres' })
  status!: string;


  @CreateDateColumn({ name: 'data_cadastro', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'data_atualizacao', type: 'timestamp' })
  updatedAt!: Date;

  @ManyToOne(() => ClientEntity, (client) => client.orders, { onDelete: 'CASCADE' })
  client?: ClientEntity;

  @OneToMany(() => OrderProductEntity, (orderProducts) => orderProducts.order, { cascade: true })
  orderProducts?: OrderProductEntity[];
}
