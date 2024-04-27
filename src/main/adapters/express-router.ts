import { PatientController, UserController, TestController } from '@/application/controllers';
import { RequestHandler } from 'express';

type UserAdapter = (controller: UserController) => RequestHandler;
type PatientAdapter = (controller: PatientController) => RequestHandler;
type TestAdapter = (controller: TestController) => RequestHandler;

type AdapterHealthcheck = () => RequestHandler;

export const adaptExpressGetUserRoute: UserAdapter = controller => async (req, res) => {
  const { query, locals } = req;
  const { statusCode, data } = await controller.handleGetUser({
    ...locals,
    ...query
  });

  const json = [200, 204].includes(statusCode) ? data : { errors: data.message };
  res.status(statusCode).json(json);
};


export const adaptExpressCreateUserRoute: UserAdapter = controller => async (req, res) => {
  const { body, locals } = req;
  const { statusCode, data } = await controller.handleCreateUser({
    ...locals,
    ...body
  });

  let errors = {}
  try{
    errors = { errors: JSON.parse(data.message) }
  }catch(error) {
    errors = { errors: data.message }
  }
  const json = [200, 204].includes(statusCode) ? data : errors;
  res.status(statusCode).json(json)
};

export const adaptExpressGetPatientRoute: PatientAdapter = controller => async (req, res) => {
  const { query, locals } = req;
  const { statusCode, data } = await controller.handleGetPatient({
    ...locals,
    ...query
  });

  const json = [200, 204].includes(statusCode) ? data : { errors: data.message };
  res.status(statusCode).json(json);
};


export const adaptExpressCreatePatientRoute: PatientAdapter = controller => async (req, res) => {
  const { body, locals } = req;
  const { statusCode, data } = await controller.handleCreatePatient({
    ...locals,
    ...body
  });
  let errors = {}
  try{
    errors = { errors: JSON.parse(data.message) }
  }catch(error) {
    errors = { errors: data.message }
  }
  const json = [200, 204].includes(statusCode) ? data : errors;
  res.status(statusCode).json(json)
};

export const adaptExpressGetTestRoute: TestAdapter = controller => async (req, res) => {
  const { query, locals } = req;
  const { statusCode, data } = await controller.handleGetTest({
    ...locals,
    ...query
  });

  const json = [200, 204].includes(statusCode) ? data : { errors: data.message };
  res.status(statusCode).json(json);
};


export const adaptExpressCreateTestRoute: TestAdapter = controller => async (req, res) => {
  const { body, locals } = req;
  const { statusCode, data } = await controller.handleCreateTest({
    ...locals,
    ...body
  });
  let errors = {}
  try{
    errors = { errors: JSON.parse(data.message) }
  }catch(error) {
    errors = { errors: data.message }
  }
  const json = [200, 204].includes(statusCode) ? data : errors;
  res.status(statusCode).json(json)
};


export const adaptExpressGetTestCategoryRoute: TestAdapter = controller => async (req, res) => {
  const { query, locals } = req;
  const { statusCode, data } = await controller.handleGetTestCategory({
    ...locals,
    ...query
  });

  const json = [200, 204].includes(statusCode) ? data : { errors: data.message };
  res.status(statusCode).json(json);
};


export const adaptExpressCreateTestCategoryRoute: TestAdapter = controller => async (req, res) => {
  const { body, locals } = req;
  const { statusCode, data } = await controller.handleCreateTestCategory({
    ...locals,
    ...body
  });
  let errors = {}
  try{
    errors = { errors: JSON.parse(data.message) }
  }catch(error) {
    errors = { errors: data.message }
  }
  const json = [200, 204].includes(statusCode) ? data : errors;
  res.status(statusCode).json(json)
};



export const adaptExpressHealthcheckRoute: AdapterHealthcheck = () => async (_, res) => {
  const json = { ok: true };
  res.status(200).json(json);
};

