import { Route, Tags, Response, TsoaController, Get } from '.'

@Route('/healthcheck')
export class HealthCheckDoc extends TsoaController {
  /**
   * @summary Rota para verificação da saúde do servidor
   */
  @Get()
  @Tags('Health Check')
  @Response<{ uptime: number; message: 'OK' }>(200, 'Ok')
  getHealthCheck(): void {
    /* Documentation - Rout to check server's health */
  }
}
