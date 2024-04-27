import { adaptExpressGetPatientRoute as getPatient, adaptExpressCreatePatientRoute as createPatient } from '@/main/adapters';
import { makePatientController } from '@/main/factories/application/controllers';
import { auth } from '@/main/middlewares'

import { Router } from 'express';

export default (router: Router): void => {
  router.get('/patient', auth, getPatient(makePatientController()));
  router.post('/patient', auth, createPatient(makePatientController()));
};
