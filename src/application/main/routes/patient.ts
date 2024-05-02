import { adaptExpressGetPatientRoute as getPatient, adaptExpressCreatePatientRoute as createPatient } from '@/application/main/adapters';
import { makePatientController } from '@/application/main/factories/application/controllers';
import { auth } from '@/application/main/middlewares'

import { Router } from 'express';

export default (router: Router): void => {
  router.get('/patient', auth, getPatient(makePatientController()));
  router.post('/patient', auth, createPatient(makePatientController()));
};
