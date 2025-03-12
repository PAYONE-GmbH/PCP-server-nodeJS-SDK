import type { SepaTransferPaymentProduct772SpecificInput } from './SepaTransferPaymentProduct772SpecificInput.js';

/**
 * @description Object containing the specific input details for SEPA transfers.
 */
export interface BankPayoutMethodSpecificInput {
  /**
   * @description Payment product identifier - please check product documentation for a full
   * overview of possible values.
   * @minimum 0
   * @maximum 99999
   */
  paymentProductId?: number;

  /**
   * @description Specific input for SEPA transfer payment product 772.
   */
  paymentProduct772SpecificInput?: SepaTransferPaymentProduct772SpecificInput;
}
