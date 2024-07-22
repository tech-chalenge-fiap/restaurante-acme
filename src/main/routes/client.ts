import { 
  adaptExpressGetClientRoute as getClient, 
  adaptExpressCreateClientRoute as createClient
} from '@/main/adapters';
import { makeRegisterController } from '@/main/factories/application/controllers';
import { auth } from '@/main/middlewares'

import { Router } from 'express';

export default (router: Router): void => {
  router.get('/client', auth, getClient(makeRegisterController()));
  router.post('/client', auth, createClient(makeRegisterController()));
};
