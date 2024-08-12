import type { CancelItem } from './CancelItem.js';
import type { CancellationReason } from './CancellationReason.js';
import type { CancelType } from './CancelType.js';

/**
 *  @description Request to mark items as of the respective Checkout as cancelled and to automatically reverse the associated
 *     payment.
 *     A Cancel can be created for a full or the partial ShoppingCart of the Checkout.
 *     The platform will automatically calculate the respective amount to trigger the Cancel. For a partial Cancel a
 *     list of items must be provided.
 *
 *     The cancellationReason is mandatory for BNPL payment methods (paymentProductId 3390, 3391 and 3392).
 *     For other payment methods the cancellationReason is not mandatory but can be used for reporting and
 *     reconciliation purposes.
 */
export interface CancelRequest {
  cancelType?: CancelType;
  cancellationReason?: CancellationReason;
  cancelItems?: CancelItem[];
}
