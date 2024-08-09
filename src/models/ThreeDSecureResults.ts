import type { AppliedExemption } from "./AppliedExemption.js";

/** @description 3D Secure results object */
export interface ThreeDSecureResults {
  /**
   * @description 3D Secure Protocol version used during this transaction.
   * @example 2.2.0
   */
  version?: string;
  /**
   * @description 3D Secure ECI (Electronic Commerce Indicator) depending on the Scheme. Returned by DS.
   * @example 5
   */
  schemeEci?: string;
  appliedExemption?: AppliedExemption;
}
