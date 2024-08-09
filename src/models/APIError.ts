/** @description Contains detailed information on one single error. */
export interface APIError {
  /**
   * @description Error code
   * @example 50001130
   */
  errorCode: string;
  /**
   * @description Category the error belongs to. The category should give an indication of the type of error you are dealing
   *     with. Possible values:
   *     * DIRECT_PLATFORM_ERROR - indicating that a functional error has occurred in the platform.
   *     * PAYMENT_PLATFORM_ERROR - indicating that a functional error has occurred in the payment platform.
   *     * IO_ERROR - indicating that a technical error has occurred within the payment platform or between the
   *     payment platform and third party systems.
   *     * COMMERCE_PLATFORM_ERROR - indicating an error originating from the Commerce Platform.
   *     * COMMERCE_PORTAL_BACKEND_ERROR - indicating an error originating from the Commerce Portal Backend.
   * @example PAYMENT_PLATFORM_ERROR
   */
  category?: string;
  /**
   * Format: int32
   * @description HTTP status code for this error that can be used to determine the type of error
   * @example 404
   */
  httpStatusCode?: number;
  /**
   * @description ID of the error. This is a short human-readable message that briefly describes the error.
   * @example general-error-technical-fault-internal
   */
  id?: string;
  /**
   * @description Human-readable error message that is not meant to be relayed to customer as it might tip off people who are
   *     trying to commit fraud
   * @example Authorisation declined
   */
  message?: string;
  /**
   * @description Returned only if the error relates to a value that was missing or incorrect.
   *
   *     Contains a location path to the value as a JSonata query.
   *
   *     Some common examples:
   *     * a.b selects the value of property b of root property a,
   *     * a[1] selects the first element of the array in root property a,
   *     * a[b='some value'] selects all elements of the array in root property a that have a property b with value
   *     'some value'.
   * @example paymentId
   */
  propertyName?: string;
}
