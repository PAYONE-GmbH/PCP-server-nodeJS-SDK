import type { PositiveAmountOfMoney } from './PositiveAmountOfMoney.js';
import type { PaymentReferences } from './PaymentReferences.js';

/**
 * @description Request to initiate a refund for a Payment Information of Checkout.
 * It is possible to initiate multiple partial refunds by providing an amount that is
 * lower than the total captured amount of the Payment Information.
 */
export interface PaymentInformationRefundRequest {
  /**
   * @description The amount of money to be refunded.
   */
  amountOfMoney: PositiveAmountOfMoney;

  /**
   * @description References associated with the refund request.
   */
  references?: PaymentReferences;

  /**
   * @description Account holder of the bank account.
   * Does not necessarily have to be the customer (e.g., joint accounts).
   * The name of the account holder is required for payment methods that use a credit transfer
   * for the refund (e.g., girocard, SEPA Direct Debit).
   */
  accountHolder?: string;
}
