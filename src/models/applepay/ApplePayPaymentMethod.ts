import type { ApplePayPaymentMethodType } from './ApplePayPaymentMethodType.js';
import type { ApplePayPaymentContact } from './ApplePayPaymentContact.js';
/**
 * Information about the card used in the transaction.
 */
export interface ApplePayPaymentMethod {
  /**
   * @description A string, suitable for display, that describes the card.
   */
  displayName?: string;

  /**
   * @description A string, suitable for display, that is the name of the payment network backing the card.
   */
  network?: string;

  /**
   * @description A string value representing the card's type of payment.
   */
  type?: ApplePayPaymentMethodType;

  /**
   * @description string|null The payment pass object currently selected to complete the payment.
   */
  paymentPass?: string;

  /**
   * @description The billing contact associated with the card.
   */
  billingContact?: ApplePayPaymentContact;
}
