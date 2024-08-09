import type { CreateCheckoutResponse } from './CreateCheckoutResponse.js';
import type { CreationDateTime } from './CreationDateTime.js';
import type { Customer } from './Customer.js';

/**
 * @description The response contains references to the created Commerce case and the Checkout. It also contains the payment
 *     response if the flag 'autoExecuteOrder' was set to true. */
export interface CreateCommerceCaseResponse {
  /**
   * Format: UUID
   * @description Unique ID of the Commerce Case. It can used to add additional Checkouts to the Commerce Case.
   * @example 707ef15b-7a0a-48f2-b7d8-c95103418a9c
   */
  commerceCaseId?: string;
  /**
   * @description Unique reference of the Commerce Case that is also returned for reporting and reconciliation purposes.
   * @example customer-commerce-case-123
   */
  merchantReference?: string;
  customer?: Customer;
  checkout?: CreateCheckoutResponse;
  creationDateTime?: CreationDateTime;
}
