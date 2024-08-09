import type { PaymentProduct840SpecificOutput } from './PaymentProduct840SpecificOutput.js';

/** @description Object containing the redirect payment product details. */
export interface RedirectPaymentMethodSpecificOutput {
  /**
   * Format: int32
   * @description <- Payment product identifier - please check product documentation for a full overview of possible values.
   * @example 840
   */
  paymentProductId?: number;
  paymentProduct840SpecificOutput?: PaymentProduct840SpecificOutput;
  /**
   * @description ID of the token. This property is populated when the payment was done with a token.
   * @example 0ca037cc-9079-4df7-8f6f-f2a3443ee521
   */
  paymentProcessingToken?: string;
  /**
   * @description Token to identify the card in the reporting.
   * @example 12a037cc-833d-8b45-8f6f-11c34171f4e1
   */
  reportingToken?: string;
}
