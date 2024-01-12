import { ConnectionNotFoundError } from '@/infra/repos/mysql/helpers';
import { DataSource, Repository, ObjectLiteral, ObjectType } from 'typeorm';
import { env } from '@/main/config/env'

export type GenericType <T = any> = T
export class MySQLConnection {
  private static instance: MySQLConnection;
  private dataSource: DataSource;

  private constructor() {
    this.dataSource = new DataSource({
      type: 'mysql',
      ...env.database.mysql,
      entities: [`${process.cwd()}/${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/repos/mysql/entities/index.{js,ts}`],
      logging: false,
      synchronize: true,
      
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
      console.log("MySQL Connection has already been created")
    } else {
      throw new ConnectionNotFoundError();
    }
  }

  public getRepository<T extends ObjectLiteral>(entity: ObjectType<T>): Repository<T> {
    if (!this.dataSource) {
      throw new ConnectionNotFoundError();
    }

    return this.dataSource.getRepository(entity);
  }

  public async disconnect(): Promise<void> {
    if (this.dataSource) {
      await this.dataSource.destroy()
      console.log("Disconnected from MySQL");
    } else {
      throw new ConnectionNotFoundError();
    }
  }
}
