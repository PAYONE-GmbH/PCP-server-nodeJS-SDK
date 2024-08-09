import type { AuthorizationMode } from "./AuthorizationMode.js";
import type { CardInfo } from "./CardInfo.js";
import type { CardOnFileRecurringFrequency } from "./CardOnFileRecurringFrequency.js";
import type { CardRecurrenceDetails } from "./CardRecurrenceDetails.js";
import type { TransactionChannel } from "./TransactionChannel.js";
import type { UnscheduledCardOnFileRequestor } from "./UnscheduledCardOnFileRequestor.js";
import type { UnscheduledCardOnFileSequenceIndicator } from "./UnscheduledCardOnFileSequenceIndicator.js";

/** @description Object containing the specific input details for card payments.  */
export interface CardPaymentMethodSpecificInput {
  authorizationMode?: AuthorizationMode;
  recurring?: CardRecurrenceDetails;
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
  transactionChannel?: TransactionChannel;
  unscheduledCardOnFileRequestor?: UnscheduledCardOnFileRequestor;
  unscheduledCardOnFileSequenceIndicator?: UnscheduledCardOnFileSequenceIndicator;
  /**
   * Format: int32
   * @description Payment product identifier - please check product documentation for a full overview of possible values.
   * @example 840
   */
  paymentProductId?: number;
  card?: CardInfo;
  /**
   * @description The URL that the customer is redirect to after the payment flow has finished. You can add any number of key
   *     value pairs in the query string that, for instance help you to identify the customer when they return to
   *     your site. Please note that we will also append some additional key value pairs that will also help you with
   *     this identification process.
   *     Note: The provided URL should be absolute and contain the protocol to use, e.g. http:// or https://. For use
   *     on mobile devices a custom protocol can be used in the form of protocol://. This protocol must be registered
   *     on the device first.
   *     URLs without a protocol will be rejected.
   * @example https://secure.ogone.com/ncol/test/displayparams.asp
   */
  returnUrl?: string;
  cardOnFileRecurringFrequency?: CardOnFileRecurringFrequency;
  /**
   * @description The end date of the last scheduled payment in a series of transactions.
   *     Format YYYYMMDD Supported soon
   */
  cardOnFileRecurringExpiration?: string;
}
