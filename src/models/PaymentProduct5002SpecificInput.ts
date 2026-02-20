import type { MobilePaymentNetwork } from './MobilePaymentNetwork.js';

/** @description Object containing additional Information needed for Click To Pay processing. */
export interface PaymentProduct5002SpecificInput {
  network?: MobilePaymentNetwork;

  /**
   * @description JWS Token Value (checkoutResponseSignature) as received in the Checkout Response on Client Side, Base64URL encoded.
   * @example rhHAQUrR118u[...]cwDw==
   */
  paymentCheckoutData?: string;

  /**
   * @description DPA Identifier provided by PAYONE during client side initialization for the corresponding card type selected by the end consumer in the Click to Pay flow.
   * @maxLength 64
   */
  srcDpaId?: string;
}
