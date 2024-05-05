import type { Request, Response, Express } from 'express'
import swaggerUi from 'swagger-ui-express'

export const initSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, async (_req: Request, res: Response): Promise<Response> => {
    return res.send(
      swaggerUi.generateHTML(await import('../docs/swagger.json'))
    )
  })
}
