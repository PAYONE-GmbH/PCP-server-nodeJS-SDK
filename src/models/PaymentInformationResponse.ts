import type { CardPaymentDetails } from './CardPaymentDetails.js';
import type { PaymentChannel } from './PaymentChannel.js';
import type { PaymentEvent } from './PaymentEvent.js';
import type { PaymentProductId } from './PaymentProductId.js';

/**
 * @description Object containing the related data of the created Payment Information.
 */
export interface PaymentInformationResponse {
  /**
   * @description Unique ID of the Commerce Case.
   */
  commerceCaseId?: string;

  /**
   * @description Unique ID of the Checkout.
   */
  checkoutId?: string;

  /**
   * @description Unique identifier of the customer.
   */
  merchantCustomerId?: string;

  /**
   * @description Unique ID of the Payment Information.
   */
  paymentInformationId?: string;

  paymentChannel?: PaymentChannel;

  paymentProductId?: PaymentProductId;

  /**
   * @description Unique identifier of the POS terminal of the payment transaction.
   */
  terminalId?: string;

  /**
   * @description Unique ID identifying a store location or transaction point.
   */
  cardAcceptorId?: string;

  /**
   * @description Unique reference of the PaymentInformation.
   */
  merchantReference?: string;

  /**
   * @description The date and time when the payment was created.
   */
  creationDateTime?: string;

  /**
   * @description The date and time when the payment was last updated.
   */
  lastUpdated?: string;

  cardPaymentDetails?: CardPaymentDetails;

  events?: PaymentEvent[];
}
