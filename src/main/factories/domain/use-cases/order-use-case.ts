import { OrderManager } from '@/domain/use-cases'
import { makeTokenHandler } from '@/main/factories/infra/gateways'
import { makeOrderRepo } from '@/main/factories/infra/repos/mysql'

export const makeOrderService = (): OrderManager => {
  return new OrderManager(makeOrderRepo(),makeTokenHandler())
}
