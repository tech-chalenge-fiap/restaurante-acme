import { adaptExpressHealthcheckRoute as healthcheck } from '@/application/main/adapters';
import { auth } from '@/application/main/middlewares'

import { Router } from 'express';

export default (router: Router): void => {
  router.get('/healthcheck', healthcheck());
};
