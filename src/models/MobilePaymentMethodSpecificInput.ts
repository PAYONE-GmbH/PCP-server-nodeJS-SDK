import type { AuthorizationMode } from './AuthorizationMode.js';
import type { PaymentProduct320SpecificInput } from './PaymentProduct320SpecificInput.js';

/** @description Object containing the specific input details for mobile payments. */
export interface MobilePaymentMethodSpecificInput {
  /**
   * Format: int32
   * @description Payment product identifier - please check product documentation for a full overview of possible values.
   * @example 840
   */
  paymentProductId?: number;
  authorizationMode?: AuthorizationMode;
  /**
   * @description The payment data if we will do the decryption of the encrypted payment data. Typically you'd use
   *     encryptedCustomerInput in the root of the create payment request to provide the encrypted payment data
   *     instead.
   */
  encryptedPaymentData?: string;
  /** @description Public Key Hash A unique identifier to retrieve key used by Apple to encrypt information. */
  publicKeyHash?: string;
  /** @description Ephemeral Key A unique generated key used by Apple to encrypt data. */
  ephemeralKey?: string;
  paymentProduct302SpecificInput?: PaymentProduct320SpecificInput;
}
