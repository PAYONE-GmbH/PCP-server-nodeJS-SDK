import type { RouteDependencies } from '../sdk.js';
import { createResourceRouter } from './router.js';

export function authenticationRoutes({ clients, merchantId }: RouteDependencies) {
  const { add, finish } = createResourceRouter();
  add('post', '/authentication-tokens', (request) =>
    clients.authentication.getAuthenticationTokens(merchantId, request.get('X-Request-ID')),
  );
  return finish();
}
