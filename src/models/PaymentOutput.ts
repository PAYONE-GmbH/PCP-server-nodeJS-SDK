import type { AmountOfMoney } from './AmountOfMoney.js';
import type { CardPaymentMethodSpecificOutput } from './CardPaymentMethodSpecificOutput.js';
import type { FinancingPaymentMethodSpecificOutput } from './FinancingPaymentMethodSpecificOutput.js';
import type { MobilePaymentMethodSpecificOutput } from './MobilePaymentMethodSpecificOutput.js';
import type { PaymentReferences } from './PaymentReferences.js';
import type { RedirectPaymentMethodSpecificOutput } from './RedirectPaymentMethodSpecificOutput.js';
import type { SepaDirectDebitPaymentMethodSpecificOutput } from './SepaDirectDebitPaymentMethodSpecificOutput.js';

/** @description Object containing payment details. */
export interface PaymentOutput {
  amountOfMoney?: AmountOfMoney;
  /**
   * @description It allows you to store additional parameters for the transaction in JSON format. This field should not contain any personal data.
   * @example {'SessionID':'126548354','ShopperID':'7354131'}
   */
  merchantParameters?: string;
  references?: PaymentReferences;
  cardPaymentMethodSpecificOutput?: CardPaymentMethodSpecificOutput;
  mobilePaymentMethodSpecificOutput?: MobilePaymentMethodSpecificOutput;
  /** @description Payment method identifier based on the paymentProductId. */
  paymentMethod?: string;
  redirectPaymentMethodSpecificOutput?: RedirectPaymentMethodSpecificOutput;
  sepaDirectDebitPaymentMethodSpecificOutput?: SepaDirectDebitPaymentMethodSpecificOutput;
  financingPaymentMethodSpecificOutput?: FinancingPaymentMethodSpecificOutput;
}
