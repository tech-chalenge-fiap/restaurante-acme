/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { HealthCheckDoc } from './../../infra/docs/healthCheckDoc';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CreateOrderDoc } from './../../infra/docs/orderDoc';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FindOrderDoc } from './../../infra/docs/orderDoc';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UpdateOrderDoc } from './../../infra/docs/orderDoc';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DeleteOrderDoc } from './../../infra/docs/orderDoc';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UpdateOrderStatusDoc } from './../../infra/docs/orderDoc';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FindAllOrdersDoc } from './../../infra/docs/orderDoc';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CreateClientDoc } from './../../infra/docs/clientDoc';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FindClientDoc } from './../../infra/docs/clientDoc';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FindProductDoc } from './../../infra/docs/productDoc';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FindProductsCategoriesDoc } from './../../infra/docs/productDoc';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CreateCheckoutDoc } from './../../infra/docs/checkoutDoc';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GetCheckoutDoc } from './../../infra/docs/checkoutDoc';
import { expressAuthentication } from './../middlewares/express-authentication';
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
import type { RequestHandler } from 'express';
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "OrderHttp.CreateOrderOutput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"status":{"dataType":"string","required":true},"orderId":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateIngredientProductInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"count":{"dataType":"double","required":true},"ingredientId":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateOrderProductInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"ingredientProducts":{"dataType":"array","array":{"dataType":"refAlias","ref":"CreateIngredientProductInput"}},"count":{"dataType":"double","required":true},"productId":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderHttp.CreateOrderInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"orderProducts":{"dataType":"array","array":{"dataType":"refAlias","ref":"CreateOrderProductInput"},"required":true},"clientId":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GenericType": {
        "dataType": "refAlias",
        "type": {"dataType":"any","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FindPaymentOutput": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"undefined"},{"dataType":"nestedObjectLiteral","nestedProperties":{"order":{"ref":"GenericType","required":true},"expirationDate":{"dataType":"datetime","required":true},"pixCode":{"dataType":"string","required":true},"pixUrl":{"dataType":"string","required":true},"status":{"dataType":"string","required":true},"paymentMethod":{"dataType":"string","required":true},"totalPrice":{"dataType":"double","required":true},"paymentId":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Register.FindClientOutput": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"undefined"},{"dataType":"nestedObjectLiteral","nestedProperties":{"email":{"dataType":"string","required":true},"cpf":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"clientId":{"dataType":"string","required":true},"id":{"dataType":"double"}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderProductCategoryOutput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true},"categoryId":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderProductIngredientOutput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"price":{"dataType":"double","required":true},"count":{"dataType":"double","required":true},"description":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"ingredientId":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderProductOutput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"ingredientProducts":{"dataType":"array","array":{"dataType":"refAlias","ref":"OrderProductIngredientOutput"},"required":true},"price":{"dataType":"double","required":true},"category":{"ref":"OrderProductCategoryOutput","required":true},"count":{"dataType":"double","required":true},"description":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"productId":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Order.FindOrderOutput": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"undefined"},{"dataType":"nestedObjectLiteral","nestedProperties":{"totalPrice":{"dataType":"double"},"orderProducts":{"dataType":"array","array":{"dataType":"refAlias","ref":"OrderProductOutput"},"required":true},"client":{"ref":"Register.FindClientOutput"},"createdAt":{"dataType":"string","required":true},"payments":{"dataType":"array","array":{"dataType":"refAlias","ref":"FindPaymentOutput"},"required":true},"status":{"dataType":"string","required":true},"orderId":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderHttp.GetOrderOutput": {
        "dataType": "refAlias",
        "type": {"ref":"Order.FindOrderOutput","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderHttp.UpdateOrderOutput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"status":{"dataType":"string","required":true},"orderId":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateOrderProductInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"ingredientProducts":{"dataType":"array","array":{"dataType":"refAlias","ref":"CreateIngredientProductInput"}},"count":{"dataType":"double","required":true},"productId":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderHttp.UpdateOrderInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"orderProducts":{"dataType":"array","array":{"dataType":"refAlias","ref":"UpdateOrderProductInput"},"required":true},"orderId":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Order.DeleteOrderOutput": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"undefined"},{"dataType":"nestedObjectLiteral","nestedProperties":{"affected":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]},{"dataType":"undefined"}],"required":true},"orderId":{"dataType":"string","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderHttp.DeleteOrderOutput": {
        "dataType": "refAlias",
        "type": {"ref":"Order.DeleteOrderOutput","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderHttp.UpdateOrderStatusInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"status":{"dataType":"string","required":true},"orderId":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Register.InsertClientOutput": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"undefined"},{"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string"},"clientId":{"dataType":"string","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ClientHttp.CreateClientOutput": {
        "dataType": "refAlias",
        "type": {"ref":"Register.InsertClientOutput","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ClientHttp.CreateClientInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true},"cpf":{"dataType":"string","required":true},"email":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ClientHttp.GetClientOutput": {
        "dataType": "refAlias",
        "type": {"ref":"Register.FindClientOutput","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductOutput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"updatedAt":{"dataType":"string","required":true},"createdAt":{"dataType":"string","required":true},"price":{"dataType":"double","required":true},"description":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"productId":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Order.FindProductOutput": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"undefined"},{"dataType":"nestedObjectLiteral","nestedProperties":{"category":{"ref":"ProductOutput","required":true},"price":{"dataType":"double","required":true},"description":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"productId":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderHttp.GetProductOutput": {
        "dataType": "refAlias",
        "type": {"ref":"Order.FindProductOutput","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IngredientsOutput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"updatedAt":{"dataType":"string","required":true},"createdAt":{"dataType":"string","required":true},"description":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"ingredientId":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FindCategoryOutput": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"undefined"},{"dataType":"nestedObjectLiteral","nestedProperties":{"ingredients":{"dataType":"array","array":{"dataType":"refAlias","ref":"IngredientsOutput"},"required":true},"products":{"dataType":"array","array":{"dataType":"refAlias","ref":"ProductOutput"},"required":true},"name":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Order.FindCategoriesOutput": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refAlias","ref":"FindCategoryOutput"}},{"dataType":"undefined"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderHttp.GetCategoriesOutput": {
        "dataType": "refAlias",
        "type": {"ref":"Order.FindCategoriesOutput","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderHttp.CreateCheckoutOutput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"status":{"dataType":"string","required":true},"paymentId":{"dataType":"string","required":true},"orderId":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderHttp.CreateCheckoutInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"paymentMethod":{"dataType":"string","required":true},"orderId":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Order.FindPaymentOutput": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"undefined"},{"dataType":"nestedObjectLiteral","nestedProperties":{"order":{"ref":"GenericType","required":true},"expirationDate":{"dataType":"datetime","required":true},"pixCode":{"dataType":"string","required":true},"pixUrl":{"dataType":"string","required":true},"status":{"dataType":"string","required":true},"paymentMethod":{"dataType":"string","required":true},"totalPrice":{"dataType":"double","required":true},"paymentId":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderHttp.GetPaymentOutput": {
        "dataType": "refAlias",
        "type": {"ref":"Order.FindPaymentOutput","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/healthcheck',
            ...(fetchMiddlewares<RequestHandler>(HealthCheckDoc)),
            ...(fetchMiddlewares<RequestHandler>(HealthCheckDoc.prototype.getHealthCheck)),

            function HealthCheckDoc_getHealthCheck(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new HealthCheckDoc();


              const promise = controller.getHealthCheck.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/order',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CreateOrderDoc)),
            ...(fetchMiddlewares<RequestHandler>(CreateOrderDoc.prototype.CreateOrder)),

            function CreateOrderDoc_CreateOrder(request: any, response: any, next: any) {
            const args = {
                    _body: {"in":"body","name":"_body","required":true,"ref":"OrderHttp.CreateOrderInput"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CreateOrderDoc();


              const promise = controller.CreateOrder.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/order',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(FindOrderDoc)),
            ...(fetchMiddlewares<RequestHandler>(FindOrderDoc.prototype.FindOrder)),

            function FindOrderDoc_FindOrder(request: any, response: any, next: any) {
            const args = {
                    _orderId: {"in":"query","name":"orderId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new FindOrderDoc();


              const promise = controller.FindOrder.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/order',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UpdateOrderDoc)),
            ...(fetchMiddlewares<RequestHandler>(UpdateOrderDoc.prototype.UpdateOrder)),

            function UpdateOrderDoc_UpdateOrder(request: any, response: any, next: any) {
            const args = {
                    _body: {"in":"body","name":"_body","required":true,"ref":"OrderHttp.UpdateOrderInput"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UpdateOrderDoc();


              const promise = controller.UpdateOrder.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/order',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(DeleteOrderDoc)),
            ...(fetchMiddlewares<RequestHandler>(DeleteOrderDoc.prototype.DeleteOrder)),

            function DeleteOrderDoc_DeleteOrder(request: any, response: any, next: any) {
            const args = {
                    _orderId: {"in":"query","name":"orderId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new DeleteOrderDoc();


              const promise = controller.DeleteOrder.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/order-status',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UpdateOrderStatusDoc)),
            ...(fetchMiddlewares<RequestHandler>(UpdateOrderStatusDoc.prototype.UpdateOrderStatus)),

            function UpdateOrderStatusDoc_UpdateOrderStatus(request: any, response: any, next: any) {
            const args = {
                    _body: {"in":"body","name":"_body","required":true,"ref":"OrderHttp.UpdateOrderStatusInput"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UpdateOrderStatusDoc();


              const promise = controller.UpdateOrderStatus.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/orders',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(FindAllOrdersDoc)),
            ...(fetchMiddlewares<RequestHandler>(FindAllOrdersDoc.prototype.FindAllOrders)),

            function FindAllOrdersDoc_FindAllOrders(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new FindAllOrdersDoc();


              const promise = controller.FindAllOrders.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/client',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CreateClientDoc)),
            ...(fetchMiddlewares<RequestHandler>(CreateClientDoc.prototype.CreateClient)),

            function CreateClientDoc_CreateClient(request: any, response: any, next: any) {
            const args = {
                    _body: {"in":"body","name":"_body","required":true,"ref":"ClientHttp.CreateClientInput"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CreateClientDoc();


              const promise = controller.CreateClient.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/client',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(FindClientDoc)),
            ...(fetchMiddlewares<RequestHandler>(FindClientDoc.prototype.FindClient)),

            function FindClientDoc_FindClient(request: any, response: any, next: any) {
            const args = {
                    _cpf: {"in":"query","name":"cpf","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new FindClientDoc();


              const promise = controller.FindClient.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/product',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(FindProductDoc)),
            ...(fetchMiddlewares<RequestHandler>(FindProductDoc.prototype.FindProduct)),

            function FindProductDoc_FindProduct(request: any, response: any, next: any) {
            const args = {
                    _productId: {"in":"query","name":"productId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new FindProductDoc();


              const promise = controller.FindProduct.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/categories',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(FindProductsCategoriesDoc)),
            ...(fetchMiddlewares<RequestHandler>(FindProductsCategoriesDoc.prototype.FindProductsCategories)),

            function FindProductsCategoriesDoc_FindProductsCategories(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new FindProductsCategoriesDoc();


              const promise = controller.FindProductsCategories.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/checkout',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CreateCheckoutDoc)),
            ...(fetchMiddlewares<RequestHandler>(CreateCheckoutDoc.prototype.CreateOrder)),

            function CreateCheckoutDoc_CreateOrder(request: any, response: any, next: any) {
            const args = {
                    _body: {"in":"body","name":"_body","required":true,"ref":"OrderHttp.CreateCheckoutInput"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CreateCheckoutDoc();


              const promise = controller.CreateOrder.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/checkout',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GetCheckoutDoc)),
            ...(fetchMiddlewares<RequestHandler>(GetCheckoutDoc.prototype.FindOrder)),

            function GetCheckoutDoc_FindOrder(request: any, response: any, next: any) {
            const args = {
                    _paymentId: {"in":"query","name":"paymentId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GetCheckoutDoc();


              const promise = controller.FindOrder.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, _response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await promiseAny(secMethodOrPromises);
                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
