/**
 * Commerce Platform API
 * RESTful API for the creation of Commerce Cases with Checkouts and the execution of Payments.
 *
 * OpenAPI spec version: 1.8.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * Contains detailed information on one single error.
 */
export class APIError {
  /**
   * Error code
   */
  'errorCode': string;
  /**
   * Category the error belongs to. The category should give an indication of the type of error you are dealing with. Possible values: * DIRECT_PLATFORM_ERROR - indicating that a functional error has occurred in the platform. * PAYMENT_PLATFORM_ERROR - indicating that a functional error has occurred in the payment platform. * IO_ERROR - indicating that a technical error has occurred within the payment platform or between the payment platform and third party systems. * COMMERCE_PLATFORM_ERROR - indicating an error originating from the Commerce Platform. * COMMERCE_PORTAL_BACKEND_ERROR - indicating an error originating from the Commerce Portal Backend.
   */
  'category'?: string;
  /**
   * HTTP status code for this error that can be used to determine the type of error
   */
  'httpStatusCode'?: number;
  /**
   * ID of the error. This is a short human-readable message that briefly describes the error.
   */
  'id'?: string;
  /**
   * Human-readable error message that is not meant to be relayed to customer as it might tip off people who are trying to commit fraud
   */
  'message'?: string;
  /**
   * Returned only if the error relates to a value that was missing or incorrect.  Contains a location path to the value as a JSonata query.  Some common examples: * a.b selects the value of property b of root property a, * a[1] selects the first element of the array in root property a, * a[b=\'some value\'] selects all elements of the array in root property a that have a property b with value \'some value\'.
   */
  'propertyName'?: string;

  static readonly discriminator: string | undefined = undefined;

  static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
    {
      name: 'errorCode',
      baseName: 'errorCode',
      type: 'string',
      format: '',
    },
    {
      name: 'category',
      baseName: 'category',
      type: 'string',
      format: '',
    },
    {
      name: 'httpStatusCode',
      baseName: 'httpStatusCode',
      type: 'number',
      format: 'int32',
    },
    {
      name: 'id',
      baseName: 'id',
      type: 'string',
      format: '',
    },
    {
      name: 'message',
      baseName: 'message',
      type: 'string',
      format: '',
    },
    {
      name: 'propertyName',
      baseName: 'propertyName',
      type: 'string',
      format: '',
    },
  ];

  static getAttributeTypeMap() {
    return APIError.attributeTypeMap;
  }

  public constructor() {}
}
