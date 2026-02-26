import type { CardFraudResults } from './CardFraudResults.js';
import type { PaymentProductId } from './PaymentProductId.js';
import type { ThreeDSecureResults } from './ThreeDSecureResults.js';

/** @description Object containing the card payment method details.    */
export interface CardPaymentMethodSpecificOutput {
  paymentProductId?: PaymentProductId;
  /** @description Card Authorization code as returned by the acquirer */
  authorisationCode?: string;
  fraudResults?: CardFraudResults;
  threeDSecureResults?: ThreeDSecureResults;
}
