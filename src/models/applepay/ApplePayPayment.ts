import type { ApplePayPaymentToken } from './ApplePayPaymentToken.js';
import type { ApplePayPaymentContact } from './ApplePayPaymentContact.js';

/**
 * The result of authorizing a payment request that contains payment information.
 *
 * Data in ApplePayPaymentToken is encrypted. Billing and shipping contact data are not encrypted.
 */
export interface ApplePayPayment {
  /**
   * An object that contains the user's payment credentials.
   *
   */
  token?: ApplePayPaymentToken;

  /**
   * The shipping contact selected by the user for this transaction.
   *
   */
  billingContact?: ApplePayPaymentContact;

  /**
   * The billing contact selected by the user for this transaction.
   */
  shippingContact?: ApplePayPaymentContact;
}
