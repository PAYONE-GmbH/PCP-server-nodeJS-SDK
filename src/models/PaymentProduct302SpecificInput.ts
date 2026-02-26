import type { ApplePaymentDataTokenInformation } from './ApplePaymentDataTokenInformation.js';
import type { MobilePaymentNetwork } from './MobilePaymentNetwork.js';

/**
 * Object containing additional information needed for Apple Pay payment transactions.
 */
export interface PaymentProduct302SpecificInput {
  /**
   * Type of your Apple Pay integration.
   * - `MERCHANT_CERTIFICATE`: using your own certificate (paid Apple Pay account needed).
   * - `MASS_ENABLEMENT`: using PAYONE certificate.
   */
  integrationType?: 'MERCHANT_CERTIFICATE' | 'MASS_ENABLEMENT';

  /**
   * Network/Scheme of the card used for the payment.
   */
  network?: MobilePaymentNetwork;

  /**
   * Token containing Apple Pay payment data.
   */
  token?: ApplePaymentDataTokenInformation;

  /**
   * Domain of your Webshop. Needed for initializing the Apple Pay payment session
   * when `integrationType` is `MASS_ENABLEMENT`.
   */
  domainName?: string;

  /**
   * Name of your Store. Needed for initializing the Apple Pay payment session
   * when `integrationType` is `MASS_ENABLEMENT`.
   * @maxLength 64
   */
  displayName?: string;
}
