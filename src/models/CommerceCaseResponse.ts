import type { CheckoutResponse } from './CheckoutResponse.js';
import type { CreationDateTime } from './CreationDateTime.js';
import type { Customer } from './Customer.js';

export interface CommerceCaseResponse {
  /**
   * @description Unique reference of the Commerce Case that is also returned for reporting and reconciliation purposes.
   * @example customer-commerce-case-123
   */
  merchantReference?: string;
  /**
   * Format: UUID
   * @description Unique ID reference of the Commerce Case. It can be used to add additional Checkouts to the Commerce Case.
   * @example 0c3ab9d7-19ed-40da-9a0e-1f96f4cfb8ae
   */
  commerceCaseId?: string;
  customer?: Customer;
  checkouts?: CheckoutResponse[];
  creationDateTime?: CreationDateTime;
}
