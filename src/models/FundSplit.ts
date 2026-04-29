import type { FundDistribution } from './FundDistribution.js';

/** @description Instructions for distributing funds to multiple suppliers or partners in a marketplace context.
        Only allowed for marketplace merchants or if feature to ignore Marketplace fields is enabled in configuration. */
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
