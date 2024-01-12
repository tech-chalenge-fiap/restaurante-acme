type ClientData = { id: string, name: string }

export class Client {
  id: string
  name?: string

  constructor (clientData: ClientData) {
    this.id = clientData.id
    this.name = clientData.name
  }
}
