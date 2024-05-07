import { 
  adaptExpressGetClientRoute as getClient, 
  adaptExpressCreateClientRoute as createClient
} from '@/application/main/adapters';
import { makeClientController } from '@/application/main/factories/application/controllers';
import { auth } from '@/application/main/middlewares'

import { Router } from 'express';

export default (router: Router): void => {
  router.get('/client', auth, getClient(makeClientController()));
  router.post('/client', auth, createClient(makeClientController()));
};
