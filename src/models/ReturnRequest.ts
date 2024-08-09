import type { ReturnItem } from './ReturnItem.js';
import type { ReturnType } from './ReturnType.js';

/**
 * @description Request to mark items of the respective Checkout as returned and to automatically refund a payment for those
 *     items.
 *     A Return can be created for a full or the partial ShoppingCart of the Checkout.
 *     The platform will automatically calculate the respective amount to trigger the Refund. For a partial Return a
 *     list of items must be provided.
 *     The item details for the Refund will be automatically loaded from the Checkout.
 *     The returnReason can be provided for reporting and reconciliation purposes but is not mandatory.
 */
export interface ReturnRequest {
  returnType?: ReturnType;
  /**
   * @description Reason of the Refund (e.g. communicated by or to the consumer).
   * @example Customer complained
   */
  returnReason?: string; // Reason for the refund
  returnItems?: ReturnItem[];
}
