import type { CardFraudResults } from './CardFraudResults.js';
import type { ThreeDSecureResults } from './ThreeDSecureResults.js';

/** @description Object containing the card payment method details.    */
export interface CardPaymentMethodSpecificOutput {
  /**
   * Format: int32
   * @description Payment product identifier - please check product documentation for a full overview of possible values.
   * @example 840
   */
  paymentProductId?: number;
  /** @description Card Authorization code as returned by the acquirer */
  authorisationCode?: string;
  fraudResults?: CardFraudResults;
  threeDSecureResults?: ThreeDSecureResults;
}
