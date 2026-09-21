import type { PayLinkStatusValue } from './PayLinkStatusValue.js';
import type { PaymentLinkOrder } from './PaymentLinkOrder.js';

/** @description Object containing details about a created pay-link. */
export interface CreatePayByLinkResponse {
  expirationDate?: string;
  paymentLinkOrder?: PaymentLinkOrder;
  status?: PayLinkStatusValue;
  redirectionUrl?: string;
  paymentLinkId?: string;
}
