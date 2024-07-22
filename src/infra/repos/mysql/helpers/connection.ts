import { ConnectionNotFoundError, TransactionNotFoundError } from '@/infra/errors';
import { DataSource, Repository, ObjectLiteral, ObjectType, QueryRunner } from 'typeorm';
import { env } from '@/main/config/env'
import { logger } from '@/infra/helpers'

export type GenericType<T = any> = T
export class MySQLConnection {
  private static instance: MySQLConnection;
  private dataSource: DataSource;
  private queryRunner: QueryRunner | undefined

  private constructor() {
    this.dataSource = new DataSource({
      type: 'mysql',
      ...env.database.mysql,
      entities: [`${process.cwd()}/${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/repos/mysql/entities/index.{js,ts}`],
      migrations: [`${process.cwd()}/${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/repos/mysql/migrations/index.{js,ts}`],
      logging: false,
      synchronize: true
    });
  }

  public static getInstance(): MySQLConnection {
    if (!MySQLConnection.instance) {
      MySQLConnection.instance = new MySQLConnection();
    }
    return MySQLConnection.instance;
  }

  public async initialize(): Promise<void> {
    if (this.dataSource) {
      await this.dataSource.initialize();
      await this.dataSource.runMigrations();
      logger.success("MySQL Connection has already been created")
    } else {
      throw new ConnectionNotFoundError();
    }
  }

  public async prepareTransaction(): Promise<void> {
    if (this.dataSource === undefined) throw new ConnectionNotFoundError()
    this.queryRunner = this.dataSource.createQueryRunner()
    await this.queryRunner.connect()
  }

  public async openTransaction(): Promise<void> {
    if (this.queryRunner === undefined) throw new TransactionNotFoundError()
    await this.queryRunner.startTransaction()
  }

  public async closeTransaction(): Promise<void> {
    if (this.queryRunner === undefined) throw new TransactionNotFoundError()
    if (!this.transactionIsReleased()) {
      await this.queryRunner.release()
    }
  }

  public async commit(): Promise<void> {
    if (this.queryRunner === undefined) throw new TransactionNotFoundError()
    if (!this.transactionIsReleased()) {
      await this.queryRunner.commitTransaction()
    }
  }

  public async rollback(): Promise<void> {
    if (this.queryRunner === undefined) throw new TransactionNotFoundError()
    if (!this.transactionIsReleased()) {
      await this.queryRunner.rollbackTransaction()
    }
  }

  public transactionIsReleased(): boolean {
    if (this.queryRunner === undefined) throw new TransactionNotFoundError()
    return this.queryRunner.isReleased
  }


  public getRepository<T extends ObjectLiteral>(entity: ObjectType<T>): Repository<T> {
    if (this.queryRunner !== undefined && !this.transactionIsReleased()) {
      return this.queryRunner.manager.getRepository(entity)
    }
    if (!this.dataSource) {
      throw new ConnectionNotFoundError();
    }
    return this.dataSource.getRepository(entity);
  }

  public async disconnect(): Promise<void> {
    if (this.dataSource) {
      await this.dataSource.destroy()
      logger.warn("Disconnected from MySQL");
    } else {
      throw new ConnectionNotFoundError();
    }
  }
}
