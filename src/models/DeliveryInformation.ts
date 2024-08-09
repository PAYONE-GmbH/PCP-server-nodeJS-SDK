import type { CartItemInput } from './CartItemInput.js';

/**
 * @description Delivery object contains additional information about the delivery/shipment, which is the basis for the Capture.
 *     The amountOfMoney in the cartItem will not be used in the request.
 */
export interface DeliveryInformation {
  /** @description Items delivered. */
  items?: CartItemInput[];
}
