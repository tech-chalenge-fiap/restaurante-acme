import { logger } from '@/infra/helpers'

export class ConnectionNotFoundError extends Error {
    constructor () {
      super('No connection was found')
      this.name = 'ConnectionNotFoundError'
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