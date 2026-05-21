import type { FundSplit } from './FundSplit.js';

/**
 * @description Request object for creating a fund split instruction for a chargeback event in a marketplace transaction.
 *     Contains the fund split details specifying how the chargeback amount should be distributed among the
 *     different sellers and/or the platform involved in the original marketplace order.
 */
export interface FundSplitRequest {
  fundSplit: FundSplit;
}
