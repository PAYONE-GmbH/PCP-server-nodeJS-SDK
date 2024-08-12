import type { CancellationReason } from './CancellationReason.js';
import type { DeliverItem } from './DeliverItem.js';
import type { DeliverType } from './DeliverType.js';

/**
 * @description Request to mark items of the respective Checkout as delivered and to automatically execute a Capture.
 *     A Deliver can be created for a full or the partial ShoppingCart of the Checkout.
 *     The platform will automatically calculate the respective amount to trigger the Capture. For a partial Deliver a
 *     list of items must be provided.
 *     The item details for the Capture will be automatically loaded from the Checkout.
 *
 *     The cancellationReason must be provided if deliverType is set to PARTIAL and isFinal is set to true for BNPL
 *     payment methods (paymentProductId 3390, 3391 and 3392).
 *     For other payment methods the cancellationReason is not mandatory in this case but can be used for reporting
 *     and reconciliation purposes.
 */
export interface DeliverRequest {
  deliverType?: DeliverType;
  /**
   * @description This property indicates whether this will be the final operation.
   *     For deliverType FULL, it is always the final operation.
   *     If deliverType PARTIAL is provided and the property is set to true, the remaining amount of the items will be cancelled and the items are marked as CANCELLED.
   *
   * @default false
   */
  isFinal: boolean;
  cancellationReason?: CancellationReason;
  deliverItems?: DeliverItem[];
}
