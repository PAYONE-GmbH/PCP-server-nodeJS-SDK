import type { AuthorizationMode } from './AuthorizationMode.js';
import type { MobilePaymentThreeDSecure } from './MobilePaymentThreeDSecure.js';
import type { PaymentProductId } from './PaymentProductId.js';
import type { PaymentProduct302SpecificInput } from './PaymentProduct302SpecificInput.js';

/**
 * @description Object containing the specific input details for mobile payments.
 */
export interface MobilePaymentMethodSpecificInput {
  paymentProductId?: PaymentProductId;

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

  threeDSecure?: MobilePaymentThreeDSecure;

  paymentProduct302SpecificInput?: PaymentProduct302SpecificInput;
}
