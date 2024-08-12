import { Headers, type RequestInit } from 'node-fetch';
import { CommunicatorConfiguration } from '../CommunicatorConfiguration.js';
import type {
  CancelPaymentRequest,
  CancelPaymentResponse,
  CapturePaymentRequest,
  CapturePaymentResponse,
  CompletePaymentRequest,
  CompletePaymentResponse,
  CreatePaymentResponse,
  PaymentExecutionRequest,
  RefundPaymentResponse,
  RefundRequest,
} from '../models/index.js';
import {
  BaseApiClient,
  CHECKOUT_ID_REQUIRED_ERROR,
  COMMERCE_CASE_ID_REQUIRED_ERROR,
  MERCHANT_ID_REQUIRED_ERROR,
} from './BaseApiClient.js';

const PAYMENT_EXECUTION_ID_REQUIRED_ERROR = 'Payment Execution ID is required';

export class PaymentExecutionApiClient extends BaseApiClient {
  constructor(config: CommunicatorConfiguration) {
    super(config);
  }

  public async createPayment(
    merchantId: string,
    commerceCaseId: string,
    checkoutId: string,
    payload: PaymentExecutionRequest,
  ): Promise<CreatePaymentResponse> {
    if (!merchantId) {
      throw new TypeError(MERCHANT_ID_REQUIRED_ERROR);
    }
    if (!commerceCaseId) {
      throw new TypeError(COMMERCE_CASE_ID_REQUIRED_ERROR);
    }
    if (!checkoutId) {
      throw new TypeError(CHECKOUT_ID_REQUIRED_ERROR);
    }

    const url = new URL(
      `/v1/${merchantId}/commerce-cases/${commerceCaseId}/checkouts/${checkoutId}/payment-executions`,
      this.getConfig().getHost(),
    );

    const requestInit: RequestInit = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(payload),
    };

    return this.makeApiCall<CreatePaymentResponse>(url.toString(), requestInit);
  }

  public async capturePayment(
    merchantId: string,
    commerceCaseId: string,
    checkoutId: string,
    paymentExecutionId: string,
    payload: CapturePaymentRequest,
  ): Promise<CapturePaymentResponse> {
    if (!merchantId) {
      throw new TypeError(MERCHANT_ID_REQUIRED_ERROR);
    }
    if (!commerceCaseId) {
      throw new TypeError(COMMERCE_CASE_ID_REQUIRED_ERROR);
    }
    if (!checkoutId) {
      throw new TypeError(CHECKOUT_ID_REQUIRED_ERROR);
    }
    if (!paymentExecutionId) {
      throw new TypeError(PAYMENT_EXECUTION_ID_REQUIRED_ERROR);
    }

    const url = new URL(
      `/v1/${merchantId}/commerce-cases/${commerceCaseId}/checkouts/${checkoutId}/payment-executions/${paymentExecutionId}/capture`,
      this.getConfig().getHost(),
    );

    const requestInit: RequestInit = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(payload),
    };

    return this.makeApiCall<CapturePaymentResponse>(url.toString(), requestInit);
  }

  public async cancelPayment(
    merchantId: string,
    commerceCaseId: string,
    checkoutId: string,
    paymentExecutionId: string,
    payload: CancelPaymentRequest,
  ): Promise<CancelPaymentResponse> {
    if (!merchantId) {
      throw new TypeError(MERCHANT_ID_REQUIRED_ERROR);
    }
    if (!commerceCaseId) {
      throw new TypeError(COMMERCE_CASE_ID_REQUIRED_ERROR);
    }
    if (!checkoutId) {
      throw new TypeError(CHECKOUT_ID_REQUIRED_ERROR);
    }
    if (!paymentExecutionId) {
      throw new TypeError(PAYMENT_EXECUTION_ID_REQUIRED_ERROR);
    }

    const url = new URL(
      `/v1/${merchantId}/commerce-cases/${commerceCaseId}/checkouts/${checkoutId}/payment-executions/${paymentExecutionId}/cancel`,
      this.getConfig().getHost(),
    );

    const requestInit: RequestInit = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(payload),
    };

    return this.makeApiCall<CancelPaymentResponse>(url.toString(), requestInit);
  }

  public async refundPayment(
    merchantId: string,
    commerceCaseId: string,
    checkoutId: string,
    paymentExecutionId: string,
    payload: RefundRequest,
  ): Promise<RefundPaymentResponse> {
    if (!merchantId) {
      throw new TypeError(MERCHANT_ID_REQUIRED_ERROR);
    }
    if (!commerceCaseId) {
      throw new TypeError(COMMERCE_CASE_ID_REQUIRED_ERROR);
    }
    if (!checkoutId) {
      throw new TypeError(CHECKOUT_ID_REQUIRED_ERROR);
    }
    if (!paymentExecutionId) {
      throw new TypeError(PAYMENT_EXECUTION_ID_REQUIRED_ERROR);
    }

    const url = new URL(
      `/v1/${merchantId}/commerce-cases/${commerceCaseId}/checkouts/${checkoutId}/payment-executions/${paymentExecutionId}/refund`,
      this.getConfig().getHost(),
    );

    const requestInit: RequestInit = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(payload),
    };

    return this.makeApiCall<RefundPaymentResponse>(url.toString(), requestInit);
  }

  public async completePayment(
    merchantId: string,
    commerceCaseId: string,
    checkoutId: string,
    paymentExecutionId: string,
    payload: CompletePaymentRequest,
  ): Promise<CompletePaymentResponse> {
    if (!merchantId) {
      throw new TypeError(MERCHANT_ID_REQUIRED_ERROR);
    }
    if (!commerceCaseId) {
      throw new TypeError(COMMERCE_CASE_ID_REQUIRED_ERROR);
    }
    if (!checkoutId) {
      throw new TypeError(CHECKOUT_ID_REQUIRED_ERROR);
    }
    if (!paymentExecutionId) {
      throw new TypeError(PAYMENT_EXECUTION_ID_REQUIRED_ERROR);
    }

    const url = new URL(
      `/v1/${merchantId}/commerce-cases/${commerceCaseId}/checkouts/${checkoutId}/payment-executions/${paymentExecutionId}/complete`,
      this.getConfig().getHost(),
    );

    const requestInit: RequestInit = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(payload),
    };

    return this.makeApiCall<CompletePaymentResponse>(url.toString(), requestInit);
  }
}
