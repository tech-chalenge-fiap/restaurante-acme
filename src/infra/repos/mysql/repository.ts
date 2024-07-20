import { MySQLConnection } from '@/infra/repos/mysql/helpers'

import { ObjectLiteral, ObjectType, Repository } from 'typeorm'
export { Not } from 'typeorm'

export abstract class MySQLRepository {
  constructor (private readonly connection: MySQLConnection = MySQLConnection.getInstance()) {}

  async prepareTransaction(): Promise<void> {
    await this.connection.prepareTransaction()
  }

  async openTransaction(): Promise<void> {
    await this.connection.openTransaction()
  }

  public async closeTransaction(): Promise<void> {
    await this.connection.closeTransaction()
  }

  public async commit(): Promise<void> {
    await this.connection.commit()
  }

  public async rollback(): Promise<void> {
    await this.connection.rollback()
  }

  public isReleased (): boolean {
    return this.connection.transactionIsReleased()
  }

  getRepository<Entity extends ObjectLiteral> (entity: ObjectType<Entity>): Repository<Entity> {
    return this.connection.getRepository(entity)
  }
}
