import { Middleware } from '@/application/middlewares'

import { RequestHandler } from 'express'

type Adapter = (middleware: Middleware) => RequestHandler

export const adaptExpressMiddleware: Adapter = middleware => async (req, res, next) => {
  const ip = req.ip?.replace(/.*:(\d+\.\d+\.\d+\.\d+)$/, '$1')
  const { statusCode, data } = await middleware.handle({ ...req.headers, ip })
  if (statusCode === 200) {
    const validEntries = Object.entries(data).filter(([, value]) => value)
    req.locals = { ...req.locals, ...Object.fromEntries(validEntries) }
    next()
  } else {
    res.status(statusCode).json({ error: data.message })
  }
}