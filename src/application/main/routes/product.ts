import { 
    adaptExpressGetProductRoute as getProduct,
    adaptExpressGetCategoriesRoute as getCategories 
  } from '@/application/main/adapters';
  import { makeProductController } from '@/application/main/factories/application/controllers';
  import { auth } from '@/application/main/middlewares'
  
  import { Router } from 'express';
  
  export default (router: Router): void => {
    router.get('/product', auth, getProduct(makeProductController()));
    router.get('/categories', auth, getCategories(makeProductController()));
  };
  