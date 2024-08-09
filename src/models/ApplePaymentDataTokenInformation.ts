import type { ApplePaymentDataTokenHeaderInformation } from './ApplePaymentDataTokenHeaderInformation.js';
import type { ApplePaymentTokenVersion } from './ApplePaymentTokenVersion.js';

/**
 * @description Additional information about the Apple payment data token. This information are needed for checking the validity
 *     of the payment data token before decryption.
 */
export interface ApplePaymentDataTokenInformation {
  version?: ApplePaymentTokenVersion;
  /**
   * @description Detached PKCS #7 signature, Base64 encoded as string. Signature of the payment and header data. The
   *     signature includes the signing certificate, its intermediate CA certificate, and information about the
   *     signing algorithm.
   */
  signature?: string;
  header?: ApplePaymentDataTokenHeaderInformation;
}
