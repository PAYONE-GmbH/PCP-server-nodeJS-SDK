import type { FraudNetId } from './FraudNetId.js';
import type { RedirectPaymentProduct840SpecificInputData } from './RedirectPaymentProduct840SpecificInputData.js';

/** @description Object containing specific input required for PayPal payments (Payment product ID 840). */
export interface RedirectPaymentProduct840SpecificInput
  extends RedirectPaymentProduct840SpecificInputData {
  /**
   * @description A unique ID determined by the merchant, to link a Paypal transaction to a FraudNet PayPal risk session.
   * Only applicable to customer-initiated transactions, when the FraudNet SDK is used, and to be passed in the API request the same tracking ID value
   * (FraudNet Session Identifier). This SDK is available here https://developer.paypal.com/docs/checkout/apm/pay-upon-invoice/fraudnet/
   */
  fraudNetId?: FraudNetId;

  /**
   * @description Unique payment transaction identifier of the payment gateway. Required for PayPal Express to associate the request with the original payment intent.
   */
  paymentId?: string;
}
