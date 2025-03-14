import type { AmountOfMoney } from './AmountOfMoney.js';
import type { PaymentInstructions } from './PaymentInstructions.js';
import type { PaymentReferences } from './PaymentReferences.js';

/**
 * @description Object containing Capture details.
 */
export interface CaptureOutput {
  /**
   * @description Amount of money related to the capture.
   */
  amountOfMoney?: AmountOfMoney;

  /**
   * @description Additional parameters for the transaction in JSON format.
   * This field must not contain any personal data.
   */
  merchantParameters?: string;

  /**
   * @description References associated with the capture.
   */
  references?: PaymentReferences;

  /**
   * @description Payment method identifier used by the payment engine.
   */
  paymentMethod?: string;

  /**
   * @description Payment instructions associated with the capture.
   */
  paymentInstructions?: PaymentInstructions;
}
