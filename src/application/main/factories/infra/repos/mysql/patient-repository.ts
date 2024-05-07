import { PedidoAggregateRepository } from '@/infra/repos/mysql'
import { makeMySQLConnection } from '@/application/main/factories/infra/repos/mysql/helpers'

export const makePatientRepo = (): PedidoAggregateRepository => {
  return new PedidoAggregateRepository(makeMySQLConnection())
}
