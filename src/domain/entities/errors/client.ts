export class ClientNotFound extends Error {
  constructor () {
    super('Client Not Found')
    this.name = 'ClientNotFound'
  }
}
