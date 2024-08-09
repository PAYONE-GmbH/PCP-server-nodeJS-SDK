import type { CardPaymentDetails } from './CardPaymentDetails.js';
import type { PaymentChannel } from './PaymentChannel.js';
import type { PaymentEvent } from './PaymentEvent.js';

/** @description Object containing the related data of the created Payment Information. */
export interface PaymentInformationResponse {
  /**
   * Format: UUID
   * @description Unique ID of the Commerce Case.
   * @example 4f0c512e-f12c-11ec-8ea0-0242ac120002
   */
  commerceCaseId?: string;
  /**
   * Format: UUID
   * @description Unique ID of the Commerce Case.
   * @example 4f0c512e-f12c-11ec-8ea0-0242ac120002
   */
  checkoutId?: string;
  /**
   * @description Unique identifier of the customer.
   * @example 1234
   */
  merchantCustomerId?: string;
  /**
   * Format: UUID
   * @description Unique ID of the Payment Information.
   * @example 637ef15b-1a0a-48f2-27d8-c954a344329c
   */
  paymentInformationId?: string;
  paymentChannel?: PaymentChannel;
  /**
   * Format: int32
   * @description Payment product identifier - please check see product documentation for a full overview of possible values.
   * @example 840
   */
  paymentProductId?: number;
  /**
   * @description Unique identifier of the POS terminal of the payment transaction.
   * @example 60023723
   */
  terminalId?: string;
  /**
   * @description Unique ID that identifies a store location or transaction point and which refers to the contract number of
   *     the merchant accepting the card.
   * @example 455600217015
   */
  cardAcceptorId?: string;
  /**
   * @description Unique reference of the PaymentInformation. In case of card present transactions, the reference from the ECR
   *     or terminal will be used. It is always the reference for external transactions.
   *     (e.g. card present payments, cash payments or payments processed by other payment providers).
   *
   * @example 6a891660b8cf16edaeb26f87d86f0b2f
   */
  merchantReference?: string;
  cardPaymentDetails?: CardPaymentDetails;
  events?: PaymentEvent[];
}
