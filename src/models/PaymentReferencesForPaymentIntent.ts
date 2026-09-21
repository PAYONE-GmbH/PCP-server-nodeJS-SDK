import type { PaymentReferences } from './PaymentReferences.js';

/** @description Payment references with a mandatory merchant reference for payment intents. */
export interface PaymentReferencesForPaymentIntent extends PaymentReferences {
  merchantReference: string;
}
