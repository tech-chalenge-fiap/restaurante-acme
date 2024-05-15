import { OrderRepository } from '@/infra/repos/mysql'
import { OrderEntity, ProductEntity, OrderProductEntity, IngredientEntity, IngredientProductEntity, CategoryEntity, PaymentEntity } from '@/infra/repos/mysql/entities'

export const makeOrderRepo = (): OrderRepository => {
  return new OrderRepository(
    OrderEntity,
    ProductEntity,
    OrderProductEntity,
    IngredientEntity,
    IngredientProductEntity,
    CategoryEntity,
    PaymentEntity
  )
}
