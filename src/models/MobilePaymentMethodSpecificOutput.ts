import type { CardFraudResults } from './CardFraudResults.js';
import type { ThreeDSecureResults } from './ThreeDSecureResults.js';

/** @description Object containing the mobile payment method details. */
export interface MobilePaymentMethodSpecificOutput {
  /**
   * Format: int32
   * @description Payment product identifier - please check product documentation for a full overview of possible values.
   * @example 302
   */
  paymentProductId?: number;
  /** @description Card Authorization code as returned by the acquirer */
  authorisationCode?: string;
  fraudResults?: CardFraudResults;
  threeDSecureResults?: ThreeDSecureResults;
  /** @description The card network that was used for a mobile payment method operation */
  network?: string;
}
