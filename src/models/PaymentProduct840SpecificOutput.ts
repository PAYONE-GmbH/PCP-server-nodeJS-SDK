import type { Address } from './Address.js';
import type { PaymentProduct840CustomerAccount } from './PaymentProduct840CustomerAccount.js';

/** @description PayPal (payment product 840) specific details. */
export interface PaymentProduct840SpecificOutput {
  billingAddress?: Address;
  customerAccount?: PaymentProduct840CustomerAccount;
  shippingAddress?: Address;
}
