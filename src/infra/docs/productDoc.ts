import { Order } from '@/domain/contracts/repos/order';
import { Route, Tags, Response, TsoaController, Get, Query } from '.'

@Route('/product')
export class FindProductDoc extends TsoaController {
  /**
   * @summary Rota para procurar um produto
   */
  @Get()
  @Tags('Product')
  @Response<Order.FindProductInput>(201, 'Created')
  FindProduct(@Query('cpf') _cpf: string): void {
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
