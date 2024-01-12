import { HttpResponse, serverError } from '@/application/helpers'

export abstract class Controller {
  abstract perform (httpRequest: any): Promise<HttpResponse>

  async handleGet (httpRequest: any): Promise<HttpResponse> {
    try {
        return await this.perform(httpRequest)
      } catch (error) {
        console.log(error)
        return serverError(error)
      }
  }
}