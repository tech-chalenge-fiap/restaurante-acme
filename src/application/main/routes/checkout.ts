import { 
  adaptExpressGetCheckoutRoute as getCheckout,
  adaptExpressCreateCheckoutRoute as createCheckout
} from '@/application/main/adapters';
import { makeOrderController } from '@/application/main/factories/application/controllers';
import { auth } from '@/application/main/middlewares'
  
  import { Router } from 'express';
  
  export default (router: Router): void => {
    router.get('/checkout', auth, getCheckout(makeOrderController()));
    router.post('/checkout', auth, createCheckout(makeOrderController()));
  };
  