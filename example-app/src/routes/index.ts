import { Router } from 'express';
import type { RouteDependencies } from '../sdk.js';
import { authenticationRoutes } from './authentication.js';
import { checkoutRoutes } from './checkouts.js';
import { commerceCaseRoutes } from './commerce-cases.js';
import { orderRoutes } from './orders.js';
import { payByLinkRoutes } from './pay-by-link.js';
import { paymentExecutionRoutes } from './payment-executions.js';
import { paymentInformationRoutes } from './payment-information.js';
import { paymentIntentRoutes } from './payment-intents.js';

export function createApiRouter(dependencies: RouteDependencies) {
  const router = Router();
  const resources = [
    authenticationRoutes,
    commerceCaseRoutes,
    checkoutRoutes,
    orderRoutes,
    paymentExecutionRoutes,
    paymentInformationRoutes,
    payByLinkRoutes,
    paymentIntentRoutes,
  ].map((createRoutes) => createRoutes(dependencies));
  router.get('/', (_request, response) => {
    response.json({ routes: resources.flatMap((resource) => resource.routes) });
  });
  for (const resource of resources) router.use(resource.router);
  return router;
}
