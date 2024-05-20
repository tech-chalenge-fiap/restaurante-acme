import { ClientHttp } from '@/domain/contracts/gateways';
import { Route, Tags, Response, TsoaController, Get, Post, Body, Query, Security } from '.';
import { Example } from 'tsoa';

@Route('/client')
export class CreateClientDoc extends TsoaController {
  /**
   * @summary Rota para criação de um cliente
   */
  @Post()
  @Example({
    "name": "Jhon Doe",
    "cpf": "40730786700",
    "email": "teste@outlook.com"
  })
  @Tags('Client')
  @Security('apiKey')
  @Response<ClientHttp.CreateClientOutput>(201, 'Created')
  CreateClient(@Body() _body: ClientHttp.CreateClientInput): void {
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
  @Response<ClientHttp.GetClientOutput>(200, 'Ok')
  FindClient(@Query('cpf') _cpf: string): void {
    /* Documentation - Rout to find a client */
  }
}
