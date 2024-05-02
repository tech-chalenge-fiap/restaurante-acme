import { setupMiddlewares } from '@/application/main/config/middlewares'
import { setupRoutes } from '@/application/main/config/routes'
import express from 'express'

const app = express()
setupMiddlewares(app)
setupRoutes(app)
export { app }
