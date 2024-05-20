import { OrderManager } from '@/domain/services'

export const makeOrderService = (): OrderManager => {
  return new OrderManager()
}
