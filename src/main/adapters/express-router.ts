import { Controller } from '@/application/controllers';
import { RequestHandler } from 'express';

type Adapter = (controller: Controller) => RequestHandler;

export const adaptExpressGetRoute: Adapter = controller => async (req, res) => {
  const { query, locals } = req;
  const { statusCode, data } = await controller.handleGet({
    ...locals,
    ...query
  });

  const json = [200, 204].includes(statusCode) ? data : { error: data.message };
  res.status(statusCode).json(json);
};
