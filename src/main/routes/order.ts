import {
  adaptExpressGetOrdersRoute as getOrders,
  adaptExpressGetOrderRoute as getOrder,
  adaptExpressCreateOrderRoute as createOrder,
  adaptExpressDeleteOrderRoute as deleteOrder,
  adaptExpressUpdateOrderRoute as updateOrder,
  adaptExpressUpdateOrderStatusRoute as updateOrderStatus
} from '@/main/adapters';
import { makeOrderController } from '@/main/factories/application/controllers';
import { auth } from '@/main/middlewares'

import { Router } from 'express';

export default (router: Router): void => {
  router.get('/orders', auth, getOrders(makeOrderController()));
  router.get('/order', auth, getOrder(makeOrderController()));
  router.post('/order', auth, createOrder(makeOrderController()));
  router.delete('/order', auth, deleteOrder(makeOrderController()));
  router.put('/order', auth, updateOrder(makeOrderController()));
  router.put('/order-status', auth, updateOrderStatus(makeOrderController()));
};

