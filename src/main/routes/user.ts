import { adaptExpressGetUserRoute as getUser, adaptExpressCreateUserRoute as createUser } from '@/main/adapters';
import { makeUserController } from '@/main/factories/application/controllers';
import { auth } from '@/main/middlewares'

import { Router } from 'express';

export default (router: Router): void => {
  router.get('/user', auth, getUser(makeUserController()));
  router.post('/user', auth, createUser(makeUserController()));
};
