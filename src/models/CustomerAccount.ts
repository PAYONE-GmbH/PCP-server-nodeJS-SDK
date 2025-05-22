/**
 * @description Object containing data related to the account the customer has with you.
 */
export interface CustomerAccount {
  /**
   * @description Creation date and time of the customer account in ISO 8601 format (UTC).
   * Accepted formats are:
   * * YYYY-MM-DD'T'HH:mm:ss'Z'
   * * YYYY-MM-DD'T'HH:mm:ss+XX:XX
   * * YYYY-MM-DD'T'HH:mm:ss-XX:XX
   * * YYYY-MM-DD'T'HH:mm'Z'
   * * YYYY-MM-DD'T'HH:mm+XX:XX
   * * YYYY-MM-DD'T'HH:mm-XX:XX
   * @example 2023-10-05T14:30:15.123Z
   */
  createDate?: string;
}
