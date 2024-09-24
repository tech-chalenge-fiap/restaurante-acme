import { OrderHttp } from '@/domain/contracts/gateways';
import { Route, Tags, Response, TsoaController, Get, Query, Security } from '.'

@Route('/product')
export class FindProductDoc extends TsoaController {
  /**
   * @summary Rota para procurar um produto
   */
  @Get()
  @Tags('Product')
  @Security('apiKey')
  @Response<OrderHttp.GetProductOutput>(200, 'Ok')
  FindProduct(@Query('productId') _productId: string): void {
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
  @Security('apiKey')
  @Response<OrderHttp.GetCategoriesOutput>(200, 'Ok')
  FindProductsCategories(): void {
    /* Documentation - Rout to find products categories */
  }
}
