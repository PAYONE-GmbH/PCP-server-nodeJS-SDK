import type { AmountOfMoney } from './AmountOfMoney.js';
import type { PaymentChannel } from './PaymentChannel.js';
import type { PaymentProductId } from './PaymentProductId.js';
import type { PaymentType } from './PaymentType.js';

export interface PaymentInformationRequest {
  amountOfMoney: AmountOfMoney;
  type: PaymentType;
  paymentChannel: PaymentChannel;
  paymentProductId: PaymentProductId;
  /**
   * @description Unique reference of the PaymentInformation. In case of card present transactions, the reference from the ECR
   *     or terminal will be used. It is always the reference for external transactions.
   *     (e.g. card present payments, cash payments or payments processed by other payment providers).
   *
   * @example 6a891660b8cf16edaeb26f87d86f0b2f
   */
  merchantReference?: string;
}
