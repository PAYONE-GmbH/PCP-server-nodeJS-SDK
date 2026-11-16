import type { CreatePayByLinkRequest } from 'pcp-server-nodejs-sdk';
import type { RouteDependencies } from '../sdk.js';
import { checkoutPath, createResourceRouter } from './router.js';

export function payByLinkRoutes({ clients: { links }, merchantId }: RouteDependencies) {
  const { add, finish } = createResourceRouter();
  add('post', `${checkoutPath}/pay-by-link`, ({ params: p, body }) =>
    links.createPayByLink(
      merchantId,
      p.commerceCaseId,
      p.checkoutId,
      body as CreatePayByLinkRequest,
    ),
  );
  return finish();
}
