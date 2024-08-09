import type { RedirectPaymentProduct840SpecificInput } from './RedirectPaymentProduct840SpecificInput.js';
import type { RedirectionData } from './RedirectionData.js';

/** @description Object containing the specific input details for payments that involve redirects to 3rd parties to complete, like iDeal and PayPal */
export interface RedirectPaymentMethodSpecificInput {
  /**
   * @description * true = the payment requires approval before the funds will be captured using the Approve payment or
   *     Capture payment API
   *     * false = the payment does not require approval, and the funds will be captured automatically
   *
   *     If the parameter is not provided in the request, the default value will be true
   */
  requiresApproval?: boolean;
  /**
   * @description ID of the token to use to create the payment.
   * @example 0ca037cc-9079-4df7-8f6f-f2a3443ee521
   */
  paymentProcessingToken?: string;
  /**
   * @description Token to identify the card in the reporting.
   * @example 12a037cc-833d-8b45-8f6f-11c34171f4e1
   */
  readonly reportingToken?: string;
  /**
   * @description Indicates if this transaction should be tokenized
   *       * true - Tokenize the transaction.
   *       * false - Do not tokenize the transaction, unless it would be tokenized by other means such as auto-
   *     tokenization of recurring payments. example: false
   */
  tokenize?: boolean;
  /**
   * Format: int32
   * @description Payment product identifier - please check product documentation for a full overview of possible values.
   * @example 840
   */
  paymentProductId?: number;
  paymentProduct840SpecificInput?: RedirectPaymentProduct840SpecificInput;
  redirectionData?: RedirectionData;
}
