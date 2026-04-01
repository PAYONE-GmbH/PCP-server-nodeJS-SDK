import type { PaymentReferences } from './PaymentReferences.js';

/**
 * @description Object that holds all reference properties that are linked to this transaction.
 */
export interface PaymentReferencesForRefund extends PaymentReferences {
  /**
   * @description Reference of the capture that should be used for the refund.
   * @example your-order-6372
   */
  captureReference?: string;
}
