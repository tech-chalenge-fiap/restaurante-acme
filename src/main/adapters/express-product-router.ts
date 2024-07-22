import {  ProductController } from '@/application/controllers';
import { RequestHandler } from 'express';

type ProductAdapter = (controller: ProductController) => RequestHandler;
type CategoryAdapter = (controller: ProductController) => RequestHandler;
type GenericType<T = any> = T


const makeResponseHandler = (data: GenericType, statusCode: number, res: GenericType) => {
  let errors = {}
  try {
    errors = { errors: JSON.parse(data.message) }
  } catch (error) {
    errors = { errors: data.message }
  }
  const json = [200, 201, 204].includes(statusCode) ? data : errors;
  res.status(statusCode).json(json)
}

export const adaptExpressGetProductRoute: ProductAdapter = controller => async (req, res) => {
  const { query, locals } = req;
  const { statusCode, data } = await controller.handleGetProduct({
    ...locals,
    ...query
  });

  makeResponseHandler(data, statusCode, res)
};


export const adaptExpressGetCategoriesRoute: CategoryAdapter = controller => async (req, res) => {
  const { query, locals } = req;
  const { statusCode, data } = await controller.handleGetCategories();

  makeResponseHandler(data, statusCode, res)
};

