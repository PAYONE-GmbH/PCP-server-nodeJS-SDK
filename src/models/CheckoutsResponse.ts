import type { CheckoutResponse } from './CheckoutResponse.js';

/** @description Object that holds the number of found Checkouts and the requested page of Checkouts */
export interface CheckoutsResponse {
  /**
   * Format: int64
   * @description Number of found Checkouts
   * @example 3390
   */
  numberOfCheckouts: number;
  /** @description List of Checkouts */
  checkouts: CheckoutResponse[];
}
