import { adaptExpressHealthcheckRoute as healthcheck } from '@/main/adapters';
import { auth } from '@/main/middlewares'

import { Router } from 'express';

export default (router: Router): void => {
  router.get('/healthcheck', healthcheck());
};
