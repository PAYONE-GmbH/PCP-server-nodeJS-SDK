import type { Address } from './Address.js';
import type { PaymentProduct840SpecificOutputData } from './PaymentProduct840SpecificOutputData.js';

/** @description PayPal (payment product 840) specific details. */
export interface PaymentProduct840SpecificOutput extends PaymentProduct840SpecificOutputData {
  shippingAddress?: Address;
}
