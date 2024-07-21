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

import { OrderProductEntity, ClientEntity, PaymentEntity } from '@/infra/repos/mysql/entities'
import { IsEnum, MaxLength } from 'class-validator';

export enum OrderStatus {
  INICIAL = '',
  RECEBIDO = 'Recebido',
  EM_PREPARACAO = 'Em Preparação',
  PRONTO = 'Pronto',
  FINALIZADO = 'Finalizado',
}

@Entity({ name: 'pedidos' })
export class OrderEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;

  @Column({ name: 'pedido_id', unique: true, default: uuidv4() })
  orderId!: string;

  @Column({ name: 'status', default: OrderStatus.INICIAL })
  @IsEnum(OrderStatus, { message: "O status do pedido deve ser 'Recebido', 'Em Preparação', 'Pronto' ou 'Finalizado'" })
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

  @OneToMany(() => PaymentEntity, (payment) => payment.order, { cascade: true })
  payments?: PaymentEntity[];
}
