import { 
  adaptExpressGetUserRoute as getUser, 
  adaptExpressCreateUserRoute as createUser
} from '@/application/main/adapters';
import { makeUserController } from '@/application/main/factories/application/controllers';
import { auth } from '@/application/main/middlewares'

import { Router } from 'express';

export default (router: Router): void => {
  router.get('/user', auth, getUser(makeUserController()));
  router.post('/user', auth, createUser(makeUserController()));
};
