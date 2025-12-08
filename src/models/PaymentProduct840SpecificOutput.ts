import type { Address } from './Address.js';
import type { PaymentProduct840CustomerAccount } from './PaymentProduct840CustomerAccount.js';

/** @description PayPal (payment product 840) specific details. */
export interface PaymentProduct840SpecificOutput {
  billingAddress?: Address;
  customerAccount?: PaymentProduct840CustomerAccount;
  shippingAddress?: Address;
  /**
   * @description A 17-character unique identifier of the PayPal transaction. This identifier is used to identify the transaction in the PayPal system and needed for the PayPal Javascript SDK flow.
   * @example 9A1234567890123
   */
  payPalTransactionId?: string;
}
