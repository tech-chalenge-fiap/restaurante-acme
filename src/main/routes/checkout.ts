import { 
  adaptExpressGetCheckoutRoute as getCheckout,
  adaptExpressCreateCheckoutRoute as createCheckout
} from '@/main/adapters';
import { makeOrderController } from '@/main/factories/application/controllers';
import { auth } from '@/main/middlewares'
  
  import { Router } from 'express';
  
  export default (router: Router): void => {
    router.get('/checkout', auth, getCheckout(makeOrderController()));
    router.post('/checkout', auth, createCheckout(makeOrderController()));
  };
  