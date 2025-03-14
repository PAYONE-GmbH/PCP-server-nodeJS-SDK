import type { AuthorizationMode } from './AuthorizationMode.js';
import type { MobilePaymentThreeDSecure } from './MobilePaymentThreeDSecure.js';
import type { PaymentProduct302SpecificInput } from './PaymentProduct302SpecificInput.js';

/**
 * @description Object containing the specific input details for mobile payments.
 */
export interface MobilePaymentMethodSpecificInput {
  /**
   * @description Payment product identifier - please check product documentation for a full overview of possible values.
   * @minimum 0
   * @maximum 99999
   */
  paymentProductId?: number;

  /**
   * @description Authorization mode for the mobile payment.
   */
  authorizationMode?: AuthorizationMode;

  /**
   * @description The encrypted payment data, if decryption is required.
   * Typically, you'd use encryptedCustomerInput in the root of the create payment request instead.
   */
  encryptedPaymentData?: string;

  /**
   * @description Public Key Hash - A unique identifier to retrieve the key used by Apple to encrypt information.
   */
  publicKeyHash?: string;

  /**
   * @description Ephemeral Key - A unique generated key used by Apple to encrypt data.
   */
  ephemeralKey?: string;

  /**
   * @description Three-D Secure details for the mobile payment.
   */
  threeDSecure?: MobilePaymentThreeDSecure;

  /**
   * @description Specific input for payment product 302.
   */
  paymentProduct302SpecificInput?: PaymentProduct302SpecificInput;
}
