import type { CartItemInput } from './CartItemInput.js';

/**
 * @description Return object contains additional information about the return/shipment, which is the basis for the Refund.
 *     The amountOfMoney in the cartItem will not be used in the request.
 */
export interface ReturnInformation {
  /**
   * @description Reason of the Refund (e.g. communicated by or to the consumer).
   * @example Customer complained
   */
  returnReason?: string;
  /** @description Items returned. */
  items?: CartItemInput[];
}
