import type { AvsResult } from './AvsResult.js';

/** @description Fraud results contained in the CardFraudResults object. */
export interface CardFraudResults {
  avsResult?: AvsResult;
}
