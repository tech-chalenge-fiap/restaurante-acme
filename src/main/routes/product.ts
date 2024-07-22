import { 
    adaptExpressGetProductRoute as getProduct,
    adaptExpressGetCategoriesRoute as getCategories 
  } from '@/main/adapters';
  import { makeProductController } from '@/main/factories/application/controllers';
  import { auth } from '@/main/middlewares'
  
  import { Router } from 'express';
  
  export default (router: Router): void => {
    router.get('/product', auth, getProduct(makeProductController()));
    router.get('/categories', auth, getCategories(makeProductController()));
  };
  