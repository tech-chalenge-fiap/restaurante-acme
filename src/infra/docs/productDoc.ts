import { Order } from '@/domain/contracts/repos/order';
import { Route, Tags, Response, TsoaController, Get, Path } from '.'

@Route('/product/:productId')
export class FindProductDoc extends TsoaController {
  /**
   * @summary Rota para procurar um produto
   */
  @Get()
  @Tags('Product')
  @Response<Order.FindProductInput>(201, 'Created')
  FindProduct(@Path() productId: string): void {
    /* Documentation - Rout to find a product */
  }
}

@Route('/categories')
export class FindProductsCategoriesDoc extends TsoaController {
  /**
   * @summary Rota para buscar categorias de produto
   */
  @Get()
  @Tags('Product categories')
  @Response<Order.FindCategoriesOutput>(200, 'Ok')
  FindProductsCategories(): void {
    /* Documentation - Rout to find products categories */
  }
}
