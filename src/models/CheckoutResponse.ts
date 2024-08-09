import type { AllowedPaymentActions } from './AllowedPaymentActions.js';
import type { AmountOfMoney } from './AmountOfMoney.js';
import type { CheckoutReferences } from './CheckoutReferences.js';
import type { CreationDateTime } from './CreationDateTime.js';
import type { PaymentExecution } from './PaymentExecution.js';
import type { PaymentInformationResponse } from './PaymentInformationResponse.js';
import type { Shipping } from './Shipping.js';
import type { ShoppingCartResult } from './ShoppingCartResult.js';
import type { StatusCheckout } from './StatusCheckout.js';
import type { StatusOutput } from './StatusOutput.js';

/**
 * @description The Checkout corresponds to the order of the WL API. We do not take additionalInput from the WL API. We have no
 *    shipping and use deliveryAddress instead of address.
 */
export interface CheckoutResponse {
  /**
   * Format: UUID
   * @description reference to the Commerce Case.
   * @example 4f0c512e-f12c-11ec-8ea0-0242ac120002
   */
  commerceCaseId?: string;
  /**
   * Format: UUID
   * @description reference to the Checkout.
   * @example 4f0c512e-f12c-11ec-8ea0-0242ac120002
   */
  checkoutId?: string;
  /**
   * @description Unique identifier for the customer.
   * @example 1234
   */
  merchantCustomerId?: string;
  amountOfMoney?: AmountOfMoney;
  references?: CheckoutReferences;
  shipping?: Shipping;
  shoppingCart?: ShoppingCartResult;
  paymentExecutions?: PaymentExecution[];
  checkoutStatus?: StatusCheckout;
  statusOutput?: StatusOutput;
  paymentInformation?: PaymentInformationResponse[];
  creationDateTime?: CreationDateTime;
  allowedPaymentActions?: AllowedPaymentActions[];
}
