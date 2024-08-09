import type { Customer } from './Customer.js';

/** @description Update the customer data of the given Commerce Case */
export interface PatchCommerceCaseRequest {
  customer?: Customer;
}
