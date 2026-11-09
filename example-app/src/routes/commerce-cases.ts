import type { CreateCommerceCaseRequest, PatchCommerceCaseRequest } from 'pcp-server-nodejs-sdk';
import { CommerceCasesQuery, searchParams } from '../helpers/queries.js';
import type { RouteDependencies } from '../sdk.js';
import { commerceCasePath, createResourceRouter } from './router.js';

export function commerceCaseRoutes({ clients: { commerceCases }, merchantId }: RouteDependencies) {
  const { add, finish } = createResourceRouter();
  add('post', '/commerce-cases', (request) =>
    commerceCases.createCommerceCaseRequest(merchantId, request.body as CreateCommerceCaseRequest),
  );
  add('get', '/commerce-cases', (request) =>
    commerceCases.getCommerceCasesRequest(
      merchantId,
      new CommerceCasesQuery(searchParams(request.originalUrl)),
    ),
  );
  add('get', commerceCasePath, ({ params }) =>
    commerceCases.getCommerceCaseRequest(merchantId, params.commerceCaseId),
  );
  add('patch', commerceCasePath, ({ params, body }) =>
    commerceCases.updateCommerceCaseRequest(
      merchantId,
      params.commerceCaseId,
      body as PatchCommerceCaseRequest,
    ),
  );
  return finish();
}
