import { makeOrderRepo, makeRegisterRepo } from '@/application/main/factories/infra/repos/mysql'
import { OrderController } from '@/application/controllers'
import { makeTokenHandler } from '@/application/main/factories/infra/gateways'
import { makeValidator } from '@/application/main/factories/application/validation'

export const makeOrderController = (): OrderController => {
  return new OrderController(makeValidator(), makeTokenHandler(), makeRegisterRepo(), makeOrderRepo())
}
