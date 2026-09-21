import type { Address } from './Address.js';
import type { PaymentProduct840CustomerAccountForIntent } from './PaymentProduct840CustomerAccountForIntent.js';
import type { PayPalTransactionId } from './PayPalTransactionId.js';
import type { ShippingAddress } from './ShippingAddress.js';

/** @description PayPal (payment product 840) specific details. */
export interface PaymentProduct840SpecificOutputForIntent {
  billingAddress?: Address;
  customerAccount?: PaymentProduct840CustomerAccountForIntent;
  payPalTransactionId?: PayPalTransactionId;
  shippingAddress?: ShippingAddress;
}
