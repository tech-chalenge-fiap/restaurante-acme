import { PatientController, UserController, TestController } from '@/application/controllers';
import { RequestHandler } from 'express';

type UserAdapter = (controller: UserController) => RequestHandler;
type PatientAdapter = (controller: PatientController) => RequestHandler;
type TestAdapter = (controller: TestController) => RequestHandler;
type GenericType<T = any> = T

type AdapterHealthcheck = () => RequestHandler;

const makeResponseHandler = (data: GenericType, statusCode: number, res: GenericType) => {
  let errors = {}
  try {
    errors = { errors: JSON.parse(data.message) }
  } catch (error) {
    errors = { errors: data.message }
  }
  const json = [200, 204].includes(statusCode) ? data : errors;
  res.status(statusCode).json(json)
}

export const adaptExpressGetUserRoute: UserAdapter = controller => async (req, res) => {
  const { query, locals } = req;
  const { statusCode, data } = await controller.handleGetUser({
    ...locals,
    ...query
  });

  makeResponseHandler(data, statusCode, res)
};


export const adaptExpressCreateUserRoute: UserAdapter = controller => async (req, res) => {
  const { body } = req;
  const { statusCode, data } = await controller.handleCreateUser(body);

  makeResponseHandler(data, statusCode, res)
};

export const adaptExpressGetPatientRoute: PatientAdapter = controller => async (req, res) => {
  const { query, locals } = req;
  const { statusCode, data } = await controller.handleGetPatient({
    ...locals,
    ...query
  });

  makeResponseHandler(data, statusCode, res)
};


export const adaptExpressCreatePatientRoute: PatientAdapter = controller => async (req, res) => {
  const { body } = req;
  const { statusCode, data } = await controller.handleCreatePatient(body);

  makeResponseHandler(data, statusCode, res)
};

export const adaptExpressGetTestRoute: TestAdapter = controller => async (req, res) => {
  const { query, locals } = req;
  const { statusCode, data } = await controller.handleGetTest({
    ...locals,
    ...query
  });

  makeResponseHandler(data, statusCode, res)
};


export const adaptExpressCreateTestRoute: TestAdapter = controller => async (req, res) => {
  const { body } = req;
  const { statusCode, data } = await controller.handleCreateTest(body);

  makeResponseHandler(data, statusCode, res)
};


export const adaptExpressGetTestCategoryRoute: TestAdapter = controller => async (req, res) => {
  const { query, locals } = req;
  const { statusCode, data } = await controller.handleGetTestCategory({
    ...locals,
    ...query
  });

  makeResponseHandler(data, statusCode, res)
};


export const adaptExpressCreateTestCategoryRoute: TestAdapter = controller => async (req, res) => {
  const { body } = req;
  const { statusCode, data } = await controller.handleCreateTestCategory(body);
  makeResponseHandler(data, statusCode, res)
};



export const adaptExpressHealthcheckRoute: AdapterHealthcheck = () => async (_, res) => {
  const json = { ok: true };
  res.status(200).json(json);
};

