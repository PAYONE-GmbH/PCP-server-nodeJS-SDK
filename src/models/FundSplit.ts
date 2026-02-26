import type { FundDistribution } from './FundDistribution.js';

/** @description Instructions for distributing funds to multiple sellers or partners in a marketplace context. */
export interface FundSplit {
  /**
   * Format: UUID
   * @readonly
   */
  id?: string;

  /**
   * Format: UUID
   * @readonly
   */
  paymentEventId?: string;

  /** @description List of fund distributions. */
  fundDistributions?: FundDistribution[];
}
