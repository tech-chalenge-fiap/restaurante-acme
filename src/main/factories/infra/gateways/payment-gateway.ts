import { Pagarme, PaymentGateway } from '@/infra/gateways'

export const paymentGateway = (): PaymentGateway => {
  return new Pagarme()
}