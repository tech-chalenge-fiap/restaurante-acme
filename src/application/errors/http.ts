import { logger } from '@/infra/helpers'
export class ServerError extends Error {
  constructor (error?: Error) {
    super('Server failed. Try again soon')
    this.name = 'ServerError'
    this.stack = error?.stack
    logger.error(`[${this.name}] ${error?.message}`)
  }
}

export class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
    logger.error(`[${this.name}] Unauthorized user`)
  }
}

export class ForbiddenError extends Error {
  constructor () {
    super('Access denied')
    this.name = 'ForbiddenError'
    logger.error(`[${this.name}] ${this.message}`)
  }
}

export class NotFoundError extends Error {
  constructor () {
    super('The request found no results')
    this.name = 'NotFoundError'
    logger.error(`[${this.name}] ${this.message}`)
  }
}

