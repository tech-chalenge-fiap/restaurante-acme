import { OrderController } from '@/application/controllers';
import { RequestHandler } from 'express';

type OrderAdapter = (controller: OrderController) => RequestHandler;
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

export const adaptExpressGetOrdersRoute: OrderAdapter = controller => async (req, res) => {
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

export const adaptExpressUpdateOrderStatusRoute: OrderAdapter = controller => async (req, res) => {
  const { body } = req;
  const { statusCode, data } = await controller.handleUpdateOrderStatus(body);

  makeResponseHandler(data, statusCode, res)
};

export const adaptExpressDeleteOrderRoute: OrderAdapter = controller => async (req, res) => {
  const { query, locals } = req;
  const { statusCode, data } = await controller.handleDeleteOrder({
      ...locals,
      ...query
    }
  );

  makeResponseHandler(data, statusCode, res)
};

export const adaptExpressGetCheckoutRoute: OrderAdapter = controller => async (req, res) => {
  const { query, locals } = req;
  const { statusCode, data } = await controller.handleGetCheckout({
    ...locals,
    ...query
  });

  makeResponseHandler(data, statusCode, res)
};


export const adaptExpressCreateCheckoutRoute: OrderAdapter = controller => async (req, res) => {
  const { body } = req;
  const { statusCode, data } = await controller.handleCreateCheckout(body);

  makeResponseHandler(data, statusCode, res)
};

export const adaptExpressUpdatePaymentStatusRoute: OrderAdapter = controller => async (req, res) => {
  const { body } = req;
  const { statusCode, data } = await controller.handleUpdatePaymentStatus(body);

  makeResponseHandler(data, statusCode, res)
};




