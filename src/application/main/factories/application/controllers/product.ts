import { makeOrderRepo } from '@/application/main/factories/infra/repos/mysql'
import { ProductController } from '@/application/controllers'

export const makeProductController = (): ProductController => {
  return new ProductController(makeOrderRepo())
}

