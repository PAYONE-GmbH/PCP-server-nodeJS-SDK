import type {
  CancelPaymentRequest,
  CapturePaymentRequest,
  CompletePaymentRequest,
  FundSplitRequest,
  PausePaymentRequest,
  PaymentExecutionRequest,
  RefreshPaymentRequest,
  RefundRequest,
} from 'pcp-server-nodejs-sdk';
import type { RouteDependencies } from '../sdk.js';
import { checkoutPath, createResourceRouter, paymentPath } from './router.js';

export function paymentExecutionRoutes({ clients: { payments }, merchantId }: RouteDependencies) {
  const { add, finish } = createResourceRouter();
  add('post', `${checkoutPath}/payment-executions`, ({ params: p, body }) =>
    payments.createPayment(
      merchantId,
      p.commerceCaseId,
      p.checkoutId,
      body as PaymentExecutionRequest,
    ),
  );
  add('post', `${paymentPath}/capture`, ({ params: p, body }) =>
    payments.capturePayment(
      merchantId,
      p.commerceCaseId,
      p.checkoutId,
      p.paymentExecutionId,
      body as CapturePaymentRequest,
    ),
  );
  add('post', `${paymentPath}/cancel`, ({ params: p, body }) =>
    payments.cancelPayment(
      merchantId,
      p.commerceCaseId,
      p.checkoutId,
      p.paymentExecutionId,
      body as CancelPaymentRequest,
    ),
  );
  add('post', `${paymentPath}/refund`, ({ params: p, body }) =>
    payments.refundPayment(
      merchantId,
      p.commerceCaseId,
      p.checkoutId,
      p.paymentExecutionId,
      body as RefundRequest,
    ),
  );
  add('post', `${paymentPath}/complete`, ({ params: p, body }) =>
    payments.completePayment(
      merchantId,
      p.commerceCaseId,
      p.checkoutId,
      p.paymentExecutionId,
      body as CompletePaymentRequest,
    ),
  );
  add('post', `${paymentPath}/pause`, ({ params: p, body }) =>
    payments.pausePayment(
      merchantId,
      p.commerceCaseId,
      p.checkoutId,
      p.paymentExecutionId,
      body as PausePaymentRequest,
    ),
  );
  add('post', `${paymentPath}/refresh`, ({ params: p, body }) =>
    payments.refreshPayment(
      merchantId,
      p.commerceCaseId,
      p.checkoutId,
      p.paymentExecutionId,
      body as RefreshPaymentRequest,
    ),
  );
  add('post', `${paymentPath}/events/:eventId/fund-splits`, ({ params: p, body }) =>
    payments.createFundSplit(
      merchantId,
      p.commerceCaseId,
      p.checkoutId,
      p.paymentExecutionId,
      p.eventId,
      body as FundSplitRequest,
    ),
  );
  return finish();
}
