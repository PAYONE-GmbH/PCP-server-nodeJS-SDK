/**
 * Indicates the channel via which the payment is created. Allowed values:   * ECOMMERCE - The transaction is a regular E-Commerce transaction.   * MOTO - The transaction is a Mail Order/Telephone Order.    Defaults to ECOMMERCE.
 */
export enum TransactionChannel {
  Ecommerce = 'ECOMMERCE',
  Moto = 'MOTO',
}
