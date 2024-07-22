import { makeOrderRepo } from '@/main/factories/infra/repos/mysql'
import { ProductController } from '@/application/controllers'

export const makeProductController = (): ProductController => {
  return new ProductController(makeOrderRepo())
}

