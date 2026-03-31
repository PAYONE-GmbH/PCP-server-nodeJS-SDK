/** @description Additional information about the Apple payment data token header. */
export interface ApplePaymentDataTokenHeaderInformation {
  /** @description A hexadecimal Transaction identifier identifier as a string. */
  transactionId: string;
  /** @description SHA–256 hash, hex encoded as a string. Hash of the applicationData property of the original PKPaymentRequest object. */
  applicationData?: string;
}
