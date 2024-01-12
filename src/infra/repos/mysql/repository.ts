import { MySQLConnection } from '@/infra/repos/mysql/helpers'

import { ObjectLiteral, ObjectType, Repository} from 'typeorm'

export abstract class MySQLRepository {
  constructor (private readonly connection: MySQLConnection = MySQLConnection.getInstance()) {}

  getRepository<Entity extends ObjectLiteral> (entity: ObjectType<Entity>): Repository<Entity> {
    return this.connection.getRepository(entity)
  }
}
