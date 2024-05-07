import { NoteEntity, OrderEntity } from '@/infra/repos/mysql/entities'
import { MySQLRepository } from '@/infra/repos/mysql/repository'
import { Patient } from '@/domain/contracts/repos'
import { EntityError } from '@/infra/errors'

export class OrderRepository extends MySQLRepository implements Patient {

}
