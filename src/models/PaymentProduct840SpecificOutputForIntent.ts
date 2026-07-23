import type { PaymentProduct840SpecificOutputData } from './PaymentProduct840SpecificOutputData.js';
import type { ShippingAddress } from './ShippingAddress.js';

/** @description PayPal (payment product 840) specific details. */
export interface PaymentProduct840SpecificOutputForIntent
  extends PaymentProduct840SpecificOutputData {
  shippingAddress?: ShippingAddress;
}
