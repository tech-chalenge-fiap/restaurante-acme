import { Register } from '@/domain/contracts/repos/register';
import { Route, Tags, Response, TsoaController, Get, Post, Body, Query, Security } from '.'

@Route('/client')
export class CreateClientDoc extends TsoaController {
  /**
   * @summary Rota para criação de um cliente
   */
  @Post()
  @Tags('Client')
  @Security('apiKey')
  @Response<Register.InsertClientOutput>(201, 'Created')
  CreateClient(@Body() _body: Register.InsertClientInput): void {
    /* Documentation - Rout to create a client */
  }
}

@Route('/client')
export class FindClientDoc extends TsoaController {
  /**
   * @summary Rota para buscar um cliente
   */
  @Get()
  @Tags('Client')
  @Security('apiKey')
  @Response<Register.FindClientOutput>(200, 'Ok')
  FindClient(@Query('cpf') _cpf: string): void {
    /* Documentation - Rout to find a client */
  }
}
