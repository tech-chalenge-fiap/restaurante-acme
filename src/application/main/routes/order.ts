import { adaptExpressGetOrderRoute as getOrder, adaptExpressCreateOrderRoute as createOrder } from '@/application/main/adapters';
import { makeOrderController } from '@/application/main/factories/application/controllers';
import { auth } from '@/application/main/middlewares'

import { Router } from 'express';

export default (router: Router): void => {
  router.get('/pedido', auth, getOrder(makeOrderController()));
  router.post('/pedido', auth, createOrder(makeOrderController()));
};
