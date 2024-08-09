import type { CreateCheckoutRequest } from './CreateCheckoutRequest.js';
import type { CreationDateTime } from './CreationDateTime.js';
import type { Customer } from './Customer.js';

export interface CreateCommerceCaseRequest {
  /**
   * @description Unique reference of the Commerce Case that is also returned for reporting and reconciliation purposes.
   * @example customer-commerce-case-123
   */
  merchantReference?: string;
  customer?: Customer;
  creationDateTime?: CreationDateTime;
  checkout?: CreateCheckoutRequest;
}
