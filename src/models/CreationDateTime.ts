/**
 * Format: date-time
 * @description Creation date and time of the Checkout in RFC3339 format. It can either be provided in the request or
 *     otherwise will be automatically set to the time when the request CreateCommerceCase was received.
 *     Response values will always be in UTC time, but when providing this field in the requests, the time offset
 *     can have different formats.
 *
 *     Accepted formats are:
 *     * YYYY-MM-DD'T'HH:mm:ss'Z'
 *     * YYYY-MM-DD'T'HH:mm:ss+XX:XX
 *     * YYYY-MM-DD'T'HH:mm:ss-XX:XX
 *     * YYYY-MM-DD'T'HH:mm'Z'
 *     * YYYY-MM-DD'T'HH:mm+XX:XX
 *     * YYYY-MM-DD'T'HH:mm-XX:XX
 *
 *     All other formats may be ignored by the system.
 *
 * @example 2023-12-06T23:59:60Z
 */
export type CreationDateTime = string;
