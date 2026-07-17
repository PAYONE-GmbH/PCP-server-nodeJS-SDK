import type { AddressSelectionAtPayPal } from './AddressSelectionAtPayPal.js';
import type { JavaScriptSdkFlow } from './JavaScriptSdkFlow.js';

/** @description Specific input required for PayPal payments (payment product ID 840). */
export interface RedirectPaymentProduct840SpecificInputData {
  addressSelectionAtPayPal?: AddressSelectionAtPayPal;
  javaScriptSdkFlow?: JavaScriptSdkFlow;
}
