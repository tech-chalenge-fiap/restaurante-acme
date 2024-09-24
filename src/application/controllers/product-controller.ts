import { OrderRepository } from '@/infra/repos/mysql'
import { HttpResponse, notFound, ok, serverError } from '@/application/helpers'
import { Order } from '@/domain/contracts/repos'

export class ProductController {
  constructor(readonly orderRepo: OrderRepository) { }

  async handleGetProduct(httpRequest: any): Promise<HttpResponse> {
    try {
      return await this.getProduct(httpRequest)
    } catch (error) {
      return serverError(error)
    }
  }

  async getProduct({ productId }: Order.FindProductInput): Promise<HttpResponse<Order.FindProductOutput | Error>> {
    const product = await this.orderRepo.findProduct({ productId })
    if (product === undefined) return notFound()
    return ok(product)
  }

  async handleGetCategories(): Promise<HttpResponse> {
    try {
      return await this.getCategories()
    } catch (error) {
      return serverError(error)
    }
  }

  async getCategories(): Promise<HttpResponse<Order.FindCategoriesOutput | Error>> {
    const product = await this.orderRepo.findCategories()
    if (product === undefined) return notFound()
    return ok(product)
  }
}
