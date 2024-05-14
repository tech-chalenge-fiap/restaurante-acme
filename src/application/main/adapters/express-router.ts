import { OrderController, RegisterController } from '@/application/controllers';
import { RequestHandler } from 'express';

type ClientAdapter = (controller: RegisterController) => RequestHandler;
type OrderAdapter = (controller: OrderController) => RequestHandler;
type GenericType<T = any> = T

type AdapterHealthcheck = () => RequestHandler;

const makeResponseHandler = (data: GenericType, statusCode: number, res: GenericType) => {
  let errors = {}
  try {
    errors = { errors: JSON.parse(data.message) }
  } catch (error) {
    errors = { errors: data.message }
  }
  const json = [200, 204].includes(statusCode) ? data : errors;
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

export const adaptExpressGetOrdersRoute: OrderAdapter = controller => async (req, res) => {
  const { query, locals } = req;
  const { statusCode, data } = await controller.handleGetOrders();

  makeResponseHandler(data, statusCode, res)
};


export const adaptExpressGetOrderRoute: OrderAdapter = controller => async (req, res) => {
  const { query, locals } = req;
  const { statusCode, data } = await controller.handleGetOrder({
    ...locals,
    ...query
  });

  makeResponseHandler(data, statusCode, res)
};


export const adaptExpressCreateOrderRoute: OrderAdapter = controller => async (req, res) => {
  const { body } = req;
  const { statusCode, data } = await controller.handleCreateOrder(body);

  makeResponseHandler(data, statusCode, res)
};

export const adaptExpressUpdateOrderRoute: OrderAdapter = controller => async (req, res) => {
  const { body } = req;
  const { statusCode, data } = await controller.handleUpdateOrder(body);

  makeResponseHandler(data, statusCode, res)
};

export const adaptExpressDeleteOrderRoute: OrderAdapter = controller => async (req, res) => {
  const { query } = req;
  const { statusCode, data } = await controller.handleDeleteOrder(query);

  makeResponseHandler(data, statusCode, res)
};


export const adaptExpressHealthcheckRoute: AdapterHealthcheck = () => async (_, res) => {
  const json = { ok: true };
  res.status(200).json(json);
};

