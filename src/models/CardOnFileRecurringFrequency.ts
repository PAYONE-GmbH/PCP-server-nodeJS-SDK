/**
 * @description Period of payment occurrence for recurring and installment payments. Allowed values:
 *     * Yearly
 *     * Quarterly
 *     * Monthly
 *     * Weekly
 *     * Daily
 *     Supported soon
 */
export enum CardOnFileRecurringFrequency {
  YEARLY = 'Yearly',
  QUARTERLY = 'Quarterly',
  MONTHLY = 'Monthly',
  WEEKLY = 'Weekly',
  DAILY = 'Daily',
}
