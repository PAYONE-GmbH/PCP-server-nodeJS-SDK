import type { CreatePaymentIntentRequest, PatchPaymentIntentRequest } from 'pcp-server-nodejs-sdk';
import type { RouteDependencies } from '../sdk.js';
import { createResourceRouter } from './router.js';

export function paymentIntentRoutes({ clients: { intents }, merchantId }: RouteDependencies) {
  const { add, finish } = createResourceRouter();
  add('post', '/payment-intents', ({ body }) =>
    intents.createPaymentIntent(merchantId, body as CreatePaymentIntentRequest),
  );
  add('get', '/payment-intents/:paymentIntentId', ({ params: p }) =>
    intents.getPaymentIntent(merchantId, p.paymentIntentId),
  );
  add('patch', '/payment-intents/:paymentIntentId', ({ params: p, body }) =>
    intents.patchPaymentIntent(merchantId, p.paymentIntentId, body as PatchPaymentIntentRequest),
  );
  return finish();
}
