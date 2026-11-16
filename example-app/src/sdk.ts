import {
  AuthenticationApiClient,
  CheckoutApiClient,
  CommerceCaseApiClient,
  type CommunicatorConfiguration,
  OrderManagementCheckoutActionsApiClient,
  PayByLinkApiClient,
  PaymentExecutionApiClient,
  PaymentInformationApiClient,
  PaymentIntentApiClient,
} from 'pcp-server-nodejs-sdk';

export function createSdkClients(config: CommunicatorConfiguration) {
  return {
    authentication: new AuthenticationApiClient(config),
    commerceCases: new CommerceCaseApiClient(config),
    checkouts: new CheckoutApiClient(config),
    orders: new OrderManagementCheckoutActionsApiClient(config),
    payments: new PaymentExecutionApiClient(config),
    information: new PaymentInformationApiClient(config),
    intents: new PaymentIntentApiClient(config),
    links: new PayByLinkApiClient(config),
  };
}

export interface RouteDependencies {
  clients: ReturnType<typeof createSdkClients>;
  merchantId: string;
}
