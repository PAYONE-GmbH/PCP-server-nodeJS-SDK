import {
  AuthenticationApiClient,
  CheckoutApiClient,
  CommerceCaseApiClient,
  type CommunicatorConfiguration,
  GetCheckoutsQuery,
  GetCommerceCasesQuery,
  OrderManagementCheckoutActionsApiClient,
  PayByLinkApiClient,
  PaymentExecutionApiClient,
  PaymentInformationApiClient,
  PaymentIntentApiClient,
} from 'pcp-server-nodejs-sdk';

export interface RouteContext {
  params: Record<string, string>;
  body: <T>() => T;
  url: URL;
  requestId?: string;
}

export interface Route {
  method: string;
  path: string;
  handle: (context: RouteContext) => Promise<unknown>;
}

// The SDK accepts query classes; override only serialization to preserve HTTP filters.
function query<T extends { toQueryMap(): Map<string, string> }>(query: T, url: URL): T {
  query.toQueryMap = () => new Map(url.searchParams);
  return query;
}

export function createRoutes(config: CommunicatorConfiguration, merchantId: string): Route[] {
  const auth = new AuthenticationApiClient(config);
  const commerce = new CommerceCaseApiClient(config);
  const checkout = new CheckoutApiClient(config);
  const orders = new OrderManagementCheckoutActionsApiClient(config);
  const payments = new PaymentExecutionApiClient(config);
  const information = new PaymentInformationApiClient(config);
  const intents = new PaymentIntentApiClient(config);
  const links = new PayByLinkApiClient(config);
  const cc = '/api/commerce-cases';
  const co = `${cc}/:commerceCaseId/checkouts`;
  const item = `${co}/:checkoutId`;
  const execution = `${item}/payment-executions`;
  const payment = `${execution}/:paymentExecutionId`;
  const info = `${item}/payment-information`;

  return [
    {
      method: 'POST',
      path: '/api/authentication-tokens',
      handle: ({ requestId }) => auth.getAuthenticationTokens(merchantId, requestId),
    },
    {
      method: 'POST',
      path: cc,
      handle: ({ body }) => commerce.createCommerceCaseRequest(merchantId, body()),
    },
    {
      method: 'GET',
      path: cc,
      handle: ({ url }) =>
        commerce.getCommerceCasesRequest(merchantId, query(new GetCommerceCasesQuery(), url)),
    },
    {
      method: 'GET',
      path: `${cc}/:commerceCaseId`,
      handle: ({ params: p }) => commerce.getCommerceCaseRequest(merchantId, p.commerceCaseId),
    },
    {
      method: 'PATCH',
      path: `${cc}/:commerceCaseId`,
      handle: ({ params: p, body }) =>
        commerce.updateCommerceCaseRequest(merchantId, p.commerceCaseId, body()),
    },
    {
      method: 'POST',
      path: co,
      handle: ({ params: p, body }) =>
        checkout.createCheckoutRequest(merchantId, p.commerceCaseId, body()),
    },
    {
      method: 'GET',
      path: '/api/checkouts',
      handle: ({ url }) =>
        checkout.getCheckoutsRequest(merchantId, query(new GetCheckoutsQuery(), url)),
    },
    {
      method: 'GET',
      path: item,
      handle: ({ params: p }) =>
        checkout.getCheckoutRequest(merchantId, p.commerceCaseId, p.checkoutId),
    },
    {
      method: 'PATCH',
      path: item,
      handle: ({ params: p, body }) =>
        checkout.updateCheckoutRequest(merchantId, p.commerceCaseId, p.checkoutId, body()),
    },
    {
      method: 'DELETE',
      path: item,
      handle: ({ params: p }) =>
        checkout.removeCheckoutRequest(merchantId, p.commerceCaseId, p.checkoutId),
    },
    {
      method: 'POST',
      path: `${item}/complete-order`,
      handle: ({ params: p, body }) =>
        checkout.completeCheckoutRequest(merchantId, p.commerceCaseId, p.checkoutId, body()),
    },
    {
      method: 'POST',
      path: `${item}/order`,
      handle: ({ params: p, body }) =>
        orders.createOrder(merchantId, p.commerceCaseId, p.checkoutId, body()),
    },
    {
      method: 'POST',
      path: `${item}/deliver`,
      handle: ({ params: p, body }) =>
        orders.deliverOrder(merchantId, p.commerceCaseId, p.checkoutId, body()),
    },
    {
      method: 'POST',
      path: `${item}/return`,
      handle: ({ params: p, body }) =>
        orders.returnOrder(merchantId, p.commerceCaseId, p.checkoutId, body()),
    },
    {
      method: 'POST',
      path: `${item}/cancel`,
      handle: ({ params: p, body }) =>
        orders.cancelOrder(merchantId, p.commerceCaseId, p.checkoutId, body()),
    },
    {
      method: 'POST',
      path: execution,
      handle: ({ params: p, body }) =>
        payments.createPayment(merchantId, p.commerceCaseId, p.checkoutId, body()),
    },
    {
      method: 'POST',
      path: `${payment}/capture`,
      handle: ({ params: p, body }) =>
        payments.capturePayment(
          merchantId,
          p.commerceCaseId,
          p.checkoutId,
          p.paymentExecutionId,
          body(),
        ),
    },
    {
      method: 'POST',
      path: `${payment}/cancel`,
      handle: ({ params: p, body }) =>
        payments.cancelPayment(
          merchantId,
          p.commerceCaseId,
          p.checkoutId,
          p.paymentExecutionId,
          body(),
        ),
    },
    {
      method: 'POST',
      path: `${payment}/refund`,
      handle: ({ params: p, body }) =>
        payments.refundPayment(
          merchantId,
          p.commerceCaseId,
          p.checkoutId,
          p.paymentExecutionId,
          body(),
        ),
    },
    {
      method: 'POST',
      path: `${payment}/complete`,
      handle: ({ params: p, body }) =>
        payments.completePayment(
          merchantId,
          p.commerceCaseId,
          p.checkoutId,
          p.paymentExecutionId,
          body(),
        ),
    },
    {
      method: 'POST',
      path: `${payment}/pause`,
      handle: ({ params: p, body }) =>
        payments.pausePayment(
          merchantId,
          p.commerceCaseId,
          p.checkoutId,
          p.paymentExecutionId,
          body(),
        ),
    },
    {
      method: 'POST',
      path: `${payment}/refresh`,
      handle: ({ params: p, body }) =>
        payments.refreshPayment(
          merchantId,
          p.commerceCaseId,
          p.checkoutId,
          p.paymentExecutionId,
          body(),
        ),
    },
    {
      method: 'POST',
      path: `${payment}/events/:eventId/fund-splits`,
      handle: ({ params: p, body }) =>
        payments.createFundSplit(
          merchantId,
          p.commerceCaseId,
          p.checkoutId,
          p.paymentExecutionId,
          p.eventId,
          body(),
        ),
    },
    {
      method: 'POST',
      path: info,
      handle: ({ params: p, body }) =>
        information.createPaymentInformation(merchantId, p.commerceCaseId, p.checkoutId, body()),
    },
    {
      method: 'GET',
      path: `${info}/:paymentInformationId`,
      handle: ({ params: p }) =>
        information.getPaymentInformation(
          merchantId,
          p.commerceCaseId,
          p.checkoutId,
          p.paymentInformationId,
        ),
    },
    {
      method: 'POST',
      path: `${info}/:paymentInformationId/refund`,
      handle: ({ params: p, body }) =>
        information.refundPaymentInformation(
          merchantId,
          p.commerceCaseId,
          p.checkoutId,
          p.paymentInformationId,
          body(),
        ),
    },
    {
      method: 'POST',
      path: `${item}/pay-by-link`,
      handle: ({ params: p, body }) =>
        links.createPayByLink(merchantId, p.commerceCaseId, p.checkoutId, body()),
    },
    {
      method: 'POST',
      path: '/api/payment-intents',
      handle: ({ body }) => intents.createPaymentIntent(merchantId, body()),
    },
    {
      method: 'GET',
      path: '/api/payment-intents/:paymentIntentId',
      handle: ({ params: p }) => intents.getPaymentIntent(merchantId, p.paymentIntentId),
    },
    {
      method: 'PATCH',
      path: '/api/payment-intents/:paymentIntentId',
      handle: ({ params: p, body }) =>
        intents.patchPaymentIntent(merchantId, p.paymentIntentId, body()),
    },
  ];
}
