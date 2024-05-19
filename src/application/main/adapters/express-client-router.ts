import {  RegisterController } from '@/application/controllers';
import { RequestHandler } from 'express';

type ClientAdapter = (controller: RegisterController) => RequestHandler;
type GenericType<T = any> = T


const makeResponseHandler = (data: GenericType, statusCode: number, res: GenericType) => {
  let errors = {}
  try {
    errors = { errors: JSON.parse(data.message) }
  } catch (error) {
    errors = { errors: data.message }
  }
  const json = [200, 201, 204].includes(statusCode) ? data : errors;
  res.status(statusCode).json(json)
}

export const adaptExpressGetClientRoute: ClientAdapter = controller => async (req, res) => {
  const { query, locals } = req;
  const { statusCode, data } = await controller.handleGetClient({
    ...locals,
    ...query
  });

  makeResponseHandler(data, statusCode, res)
};


export const adaptExpressCreateClientRoute: ClientAdapter = controller => async (req, res) => {
  const { body } = req;
  const { statusCode, data } = await controller.handleCreateClient(body);

  makeResponseHandler(data, statusCode, res)
};
