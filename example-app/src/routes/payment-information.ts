import type {
  PaymentInformationRefundRequest,
  PaymentInformationRequest,
} from 'pcp-server-nodejs-sdk';
import type { RouteDependencies } from '../sdk.js';
import { checkoutPath, createResourceRouter } from './router.js';

export function paymentInformationRoutes({
  clients: { information },
  merchantId,
}: RouteDependencies) {
  const { add, finish } = createResourceRouter();
  const path = `${checkoutPath}/payment-information`;
  add('post', path, ({ params: p, body }) =>
    information.createPaymentInformation(
      merchantId,
      p.commerceCaseId,
      p.checkoutId,
      body as PaymentInformationRequest,
    ),
  );
  add('get', `${path}/:paymentInformationId`, ({ params: p }) =>
    information.getPaymentInformation(
      merchantId,
      p.commerceCaseId,
      p.checkoutId,
      p.paymentInformationId,
    ),
  );
  add('post', `${path}/:paymentInformationId/refund`, ({ params: p, body }) =>
    information.refundPaymentInformation(
      merchantId,
      p.commerceCaseId,
      p.checkoutId,
      p.paymentInformationId,
      body as PaymentInformationRefundRequest,
    ),
  );
  return finish();
}
