import { logger } from '@/infra/helpers'


export class ConnectionNotFoundError extends Error {
    constructor () {
      super('No connection was found')
      this.name = 'ConnectionNotFoundError'
      logger.error(`[${this.name}] ${this.message}`)
    }
}

export class TransactionError extends Error {
  constructor (error: Error) {
    super(error.message)
    this.name = 'TransactionError'
    logger.error(`[${this.name}] ${this.message}`)
  }
}

export class TransactionNotFoundError extends Error {
  constructor () {
    super('No transaction was found')
    this.name = 'TransactionNotFoundError'
    logger.error(`[${this.name}] ${this.message}`)
  }
}


export class EntityError extends Error {
  constructor (error: string) {
    super(error)
    this.name = 'EntityError'
    logger.error(`[${this.name}] ${this.message}`)
  }
}