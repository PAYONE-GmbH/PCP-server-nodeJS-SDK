export interface RedirectPaymentProduct900SpecificInput {
  captureTrigger?: CaptureTrigger;
}

/**
 * @description  Indicates the event upon which the payment should be captured.
 *           This value is shown to customers in the Wero portal to clarify
 *           when the capture will occur.
 *           Has the following possible values:
 *           - shipping: Upon shipping the order.
 *           - delivery: Upon delivering the order.
 *           - availability: As soon as the order is available.
 *           - serviceFulfillment: Upon fulfilling the service.
 *           - other: For any other use case.
 */
export enum CaptureTrigger {
  SHIPPING = 'shipping',
  DELIVERY = 'delivery',
  AVAILABILITY = 'availability',
  SERVICE_FULFILLMENT = 'serviceFulfillment',
  OTHER = 'other',
}
