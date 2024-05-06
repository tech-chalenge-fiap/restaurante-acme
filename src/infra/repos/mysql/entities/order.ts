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

  import { OrderItemEntity, ClientEntity } from '@/infra/repos/mysql/entities'
  
  
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
    client!: ClientEntity;

    @OneToMany(() => OrderItemEntity, (orderItems) => orderItems.order, { cascade: true })
    orderItems!: OrderItemEntity[];
  }
  