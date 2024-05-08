import { OrderRepository } from '@/infra/repos/mysql'
import { CategoryProductsEntity, IngredientProductsEntity, OrderEntity, OrderProductsEntity, ProductsEntity } from '@/infra/repos/mysql/entities'

export const makeOrderRepo = (): OrderRepository => {
  return new OrderRepository(OrderEntity, ProductsEntity, OrderProductsEntity, IngredientProductsEntity, CategoryProductsEntity)
}
