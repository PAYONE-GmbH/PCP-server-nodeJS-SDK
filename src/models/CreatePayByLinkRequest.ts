import type { OrderItem } from './OrderItem.js';
import type { OrderType } from './OrderType.js';
import type { PaymentLinkSpecificInput } from './PaymentLinkSpecificInput.js';
import type { References } from './References.js';

/** @description Request object for pay-link generation. */
export interface CreatePayByLinkRequest {
  paymentLinkSpecificInput: PaymentLinkSpecificInput;
  orderType: OrderType;
  items?: OrderItem[];
  orderReferences: References;
}
