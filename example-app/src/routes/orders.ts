import type {
  CancelRequest,
  DeliverRequest,
  OrderRequest,
  ReturnRequest,
} from 'pcp-server-nodejs-sdk';
import type { RouteDependencies } from '../sdk.js';
import { checkoutPath, createResourceRouter } from './router.js';

export function orderRoutes({ clients: { orders }, merchantId }: RouteDependencies) {
  const { add, finish } = createResourceRouter();
  add('post', `${checkoutPath}/order`, ({ params: p, body }) =>
    orders.createOrder(merchantId, p.commerceCaseId, p.checkoutId, body as OrderRequest),
  );
  add('post', `${checkoutPath}/deliver`, ({ params: p, body }) =>
    orders.deliverOrder(merchantId, p.commerceCaseId, p.checkoutId, body as DeliverRequest),
  );
  add('post', `${checkoutPath}/return`, ({ params: p, body }) =>
    orders.returnOrder(merchantId, p.commerceCaseId, p.checkoutId, body as ReturnRequest),
  );
  add('post', `${checkoutPath}/cancel`, ({ params: p, body }) =>
    orders.cancelOrder(merchantId, p.commerceCaseId, p.checkoutId, body as CancelRequest),
  );
  return finish();
}
