import type { Address } from './Address.js';
import type { PaymentProduct840CustomerAccount } from './PaymentProduct840CustomerAccount.js';
import type { PayPalTransactionId } from './PayPalTransactionId.js';

/** @description PayPal (payment product 840) specific details. */
export interface PaymentProduct840SpecificOutputData {
  billingAddress?: Address;
  customerAccount?: PaymentProduct840CustomerAccount;
  payPalTransactionId?: PayPalTransactionId;
}
