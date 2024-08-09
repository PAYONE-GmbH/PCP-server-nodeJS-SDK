import type { CancellationReason } from './CancellationReason.js';
import type { DeliveryInformation } from './DeliveryInformation.js';
import type { PaymentReferences } from './PaymentReferences.js';

/** @description If the shopping cart is specified, a Capture is made with the amount of the shopping cart for the items that are specified. */
export interface CapturePaymentRequest {
  /**
   * Format: int64
   * @description Here you can specify the amount that you want to capture (specified in cents, where single digit currencies
   *     are presumed to have 2 digits). The amount can be lower than the amount that was authorized, but not higher.
   *      If left empty, the full amount will be captured and the request will be final.
   *      If the full amount is captured, the request will also be final.
   */
  amount?: number;
  /**
   * @description This property indicates whether this will be the final operation.
   *     If the full amount should not captured but the property is set to true, the remaining amount will automatically be cancelled.
   *
   * @default false
   */
  isFinal: boolean;
  cancellationReason?: CancellationReason;
  references?: PaymentReferences;
  delivery?: DeliveryInformation;
}
