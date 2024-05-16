import { makeOrderRepo, makeRegisterRepo } from '@/application/main/factories/infra/repos/mysql'
import { makeOrderService } from '@/application/main/factories/domain/services'
import { OrderController } from '@/application/controllers'
import { makeTokenHandler, paymentGateway } from '@/application/main/factories/infra/gateways'
import { makeValidator } from '@/application/main/factories/application/validation'

export const makeOrderController = (): OrderController => {
  return new OrderController(makeValidator(), makeTokenHandler(), makeRegisterRepo(), makeOrderRepo(), makeOrderService(), paymentGateway())
}


