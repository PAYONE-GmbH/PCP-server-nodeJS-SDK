import type { AddressPersonal } from './AddressPersonal.js';

/** @description Object containing information regarding shipping or delivery. */
export interface ShippingAddress extends AddressPersonal {
  companyName?: string;
}
