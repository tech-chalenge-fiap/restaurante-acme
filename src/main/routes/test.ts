import { 
  adaptExpressGetTestRoute as getTest, 
  adaptExpressCreateTestRoute as createTest,
  adaptExpressGetTestCategoryRoute as getTestCategory, 
  adaptExpressCreateTestCategoryRoute as createTestCategory 
} from '@/main/adapters';
import { makeTestController } from '@/main/factories/application/controllers';
import { auth } from '@/main/middlewares'

import { Router } from 'express';

export default (router: Router): void => {
  router.get('/test', auth, getTest(makeTestController()));
  router.post('/test', auth, createTest(makeTestController()));
  router.get('/test/category', auth, getTestCategory(makeTestController()));
  router.post('/test/category', auth, createTestCategory(makeTestController()));
};
