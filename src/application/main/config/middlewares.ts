import { Express, json } from 'express'
import cors from 'cors'
import { initSwagger } from './swagger'

export const setupMiddlewares = (app: Express): void => {
  initSwagger(app)
  app.use(cors())
  app.use(json())
  app.use((req, res, next) => {
    res.type('json')
    next()
  })
}
