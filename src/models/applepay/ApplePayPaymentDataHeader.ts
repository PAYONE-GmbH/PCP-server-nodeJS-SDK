export interface ApplePayPaymentDataHeader {
  /**
   * Optional. Hash of the applicationData property of the original PKPaymentRequest object
   * for transactions that initiate in apps. For transactions that initiate in Apple Pay on the Web,
   * the value is the hash of applicationData in ApplePayPaymentRequest or of applicationData in ApplePayRequest.
   * This key is omitted if the value of that property is nil.
   *
   * @description SHA-256 hash, hex encoded as a string
   */
  applicationData?: string;

  /**
   * Ephemeral public key bytes.
   *
   * @description X.509 encoded key bytes, Base64 encoded as a string
   */
  ephemeralPublicKey?: string;

  /**
   * The symmetric key wrapped using your RSA public key.
   *
   * @description A Base64-encoded string
   */
  wrappedKey?: string;

  /**
   * Hash of the X.509 encoded public key bytes of the merchant's certificate.
   *
   * @description SHA-256 hash, Base64 encoded as a string
   */
  publicKeyHash?: string;

  /**
   * Transaction identifier, generated on the device.
   *
   * @description A hexadecimal identifier, as a string
   */
  transactionId?: string;
}
