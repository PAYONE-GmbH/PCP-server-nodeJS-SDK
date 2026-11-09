import { type Request, Router } from 'express';
import { HttpError } from '../middleware/error-handler.js';
import { jsonBody, validateIds } from '../middleware/validate-request.js';

export const commerceCasePath = '/commerce-cases/:commerceCaseId';
export const checkoutPath = `${commerceCasePath}/checkouts/:checkoutId`;
export const paymentPath = `${checkoutPath}/payment-executions/:paymentExecutionId`;

export interface RouteDescription {
  method: string;
  path: string;
}

// Register real Express routes and record their public paths for the browser explorer.
// Each Express Route owns method handling, including the 405 fallback.
export function createResourceRouter() {
  const router = Router();
  const routes: RouteDescription[] = [];
  const paths = new Map<string, ReturnType<Router['route']>>();

  function add(
    method: 'get' | 'post' | 'patch' | 'delete',
    path: string,
    handle: (request: Request<Record<string, string>>) => Promise<unknown>,
  ) {
    let route = paths.get(path);
    if (!route) {
      route = router.route(path);
      paths.set(path, route);
    }
    routes.push({ method: method.toUpperCase(), path: `/api${path}` });
    route[method]<Record<string, string>>(validateIds, ...jsonBody, async (request, response) => {
      const result = await handle(request);
      if (result === undefined) response.status(204).end();
      else response.json(result);
    });
  }

  function finish() {
    for (const [path, route] of paths) {
      const methods = routes
        .filter((entry) => entry.path === `/api${path}`)
        .map((entry) => entry.method);
      route.all((_request, response, next) => {
        response.set('Allow', [...methods, 'OPTIONS'].join(', '));
        next(new HttpError(405, 'Method not allowed'));
      });
    }
    return { router, routes };
  }

  return { add, finish };
}
