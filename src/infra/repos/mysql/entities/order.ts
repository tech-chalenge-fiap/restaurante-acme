import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne
  } from 'typeorm';

  import { v4 as uuidv4 } from 'uuid';

  import { OrderProductsEntity, ClientEntity } from '@/infra/repos/mysql/entities'
import { IsNotEmpty } from 'class-validator';
  
  
  @Entity({ name: 'pedidos' })
  export class OrderEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id?: number;
  
    @Column({ name: 'pedido_id', unique: true,  default: uuidv4() })
    orderId!: string;
  
    @CreateDateColumn({ name: 'data_cadastro', type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ name: 'data_atualizacao', type: 'timestamp' })
    updatedAt!: Date;

    @ManyToOne(() => ClientEntity, (client) => client.orders, { onDelete: 'CASCADE' })
    @IsNotEmpty({ message: 'O client é obrigatório' })
    client!: ClientEntity;

    @OneToMany(() => OrderProductsEntity, (orderProducts) => orderProducts.order, { cascade: true })
    @IsNotEmpty({ message: 'OrderProducts é obrigatório' })
    orderProducts!: OrderProductsEntity[];
  }
  