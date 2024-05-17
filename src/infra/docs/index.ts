import {
  Route as route,
  Get as get,
  Post as post,
  Delete as deleteMethod,
  Patch as patch,
  Tags as tags,
  Path as path,
  Security as security,
  Query as query,
  Header as header,
  Body as body,
  Response as response,
  Put as put,
  Controller,
  HttpStatusCodeLiteral,
  HttpStatusCodeStringLiteral,
  OtherValidOpenApiHttpStatusCode
} from 'tsoa';


export function Route(value: string): any {
  return route(value)
}

export function Query(value: string): any {
  return query(value)
}

export function Header(value: string): any {
  return header(value)
}

export function Get(value?: string): any {
  return get(value)
}

export function Post(value?: string): any {
  return post(value)
}

export function Delete(value?: string): any {
  return deleteMethod(value)
}

export function Patch(value?: string): any {
  return patch(value)
}

export function Body(_value?: string): any {
  return body()
}

export function Tags(value: string): any {
  return tags(value)
}

export function Path(value?: string): any {
  return path(value)
}

export function Security(value: string): any {
  return security(value)
}

export function Put(value?: string): any {
  return put(value)
}

export class TsoaController extends Controller {}

export function Response<T>(
  name: HttpStatusCodeLiteral | HttpStatusCodeStringLiteral | OtherValidOpenApiHttpStatusCode,
  description?: string,
  example?: T
): any {
  return response<T>(name, description, example)
}

export * from './healthCheckDoc'
export * from './orderDoc'
export * from './clientDoc'
export * from './productDoc'
