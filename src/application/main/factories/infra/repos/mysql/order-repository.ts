import { OrderRepository } from '@/infra/repos/mysql'
import { CategoryEntity, IngredientProductEntity, OrderEntity, OrderProductEntity, ProductEntity } from '@/infra/repos/mysql/entities'

export const makeOrderRepo = (): OrderRepository => {
  return new OrderRepository(OrderEntity, ProductEntity, OrderProductEntity, IngredientProductEntity, CategoryEntity)
}
