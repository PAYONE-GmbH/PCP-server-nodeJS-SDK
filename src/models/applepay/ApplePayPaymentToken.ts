import type { ApplePayPaymentData } from './ApplePayPaymentData.js';
import type { ApplePayPaymentMethod } from './ApplePayPaymentMethod.js';

/**
 * An object that contains the user's payment credentials.
 *
 * You access the payment token of an authorized payment request using the token property of the ApplePayPayment object.
 */
export interface ApplePayPaymentToken {
  /**
   *
   * This data is used by your e-commerce back-end system, which decrypts it and submits it to your payment processor.
   *  For a full guide on this data, see:
   *  https://developer.apple.com/documentation/passkit_apple_pay_and_wallet/apple_pay/payment_token_format_reference
   *
   */
  paymentData?: ApplePayPaymentData;

  /**
   * @description An object that contains the user's payment credentials.
   * You access the payment token of an authorized payment request using the token property of the ApplePayPayment object.
   */
  paymentMethod?: ApplePayPaymentMethod;

  /**
   * @description A unique identifier for this payment.
   * This identifier is suitable for use in a receipt.
   */
  transactionIdentifier?: string;
}
