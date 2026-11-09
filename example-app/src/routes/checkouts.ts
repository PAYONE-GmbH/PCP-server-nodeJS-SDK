import type {
  CompleteOrderRequest,
  CreateCheckoutRequest,
  PatchCheckoutRequest,
} from 'pcp-server-nodejs-sdk';
import { CheckoutsQuery, searchParams } from '../helpers/queries.js';
import type { RouteDependencies } from '../sdk.js';
import { checkoutPath, commerceCasePath, createResourceRouter } from './router.js';

export function checkoutRoutes({ clients: { checkouts }, merchantId }: RouteDependencies) {
  const { add, finish } = createResourceRouter();
  add('post', `${commerceCasePath}/checkouts`, ({ params, body }) =>
    checkouts.createCheckoutRequest(
      merchantId,
      params.commerceCaseId,
      body as CreateCheckoutRequest,
    ),
  );
  add('get', '/checkouts', (request) =>
    checkouts.getCheckoutsRequest(
      merchantId,
      new CheckoutsQuery(searchParams(request.originalUrl)),
    ),
  );
  add('get', checkoutPath, ({ params: p }) =>
    checkouts.getCheckoutRequest(merchantId, p.commerceCaseId, p.checkoutId),
  );
  add('patch', checkoutPath, ({ params: p, body }) =>
    checkouts.updateCheckoutRequest(
      merchantId,
      p.commerceCaseId,
      p.checkoutId,
      body as PatchCheckoutRequest,
    ),
  );
  add('delete', checkoutPath, ({ params: p }) =>
    checkouts.removeCheckoutRequest(merchantId, p.commerceCaseId, p.checkoutId),
  );
  add('post', `${checkoutPath}/complete-order`, ({ params: p, body }) =>
    checkouts.completeCheckoutRequest(
      merchantId,
      p.commerceCaseId,
      p.checkoutId,
      body as CompleteOrderRequest,
    ),
  );
  return finish();
}
