import { HttpResponse, serverError } from '@/application/helpers'

export abstract class Controller {
  abstract getClient (httpRequest: any): Promise<HttpResponse>

  async handleGetClient (httpRequest: any): Promise<HttpResponse> {
    try {
        return await this.getClient(httpRequest)
      } catch (error) {
        return serverError(error)
      }
  }
}