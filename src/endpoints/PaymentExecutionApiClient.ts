import { Headers, RequestInit } from 'node-fetch';
import { CommunicatorConfiguration } from '../CommunicatorConfiguration';
import {
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
} from '../models';
import { BaseApiClient } from './BaseApiClient';

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
      throw new Error('Merchant ID is required');
    }
    if (!commerceCaseId) {
      throw new Error('Commerce Case ID is required');
    }
    if (!checkoutId) {
      throw new Error('Checkout ID is required');
    }
    if (!payload) {
      throw new Error('Payload is required');
    }

    const url = new URL(
      `/v1/${merchantId}/commerce-cases/${commerceCaseId}/checkouts/${checkoutId}/payment-executions`,
      this.getConfig()?.getHost(),
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
      throw new Error('Merchant ID is required');
    }
    if (!commerceCaseId) {
      throw new Error('Commerce Case ID is required');
    }
    if (!checkoutId) {
      throw new Error('Checkout ID is required');
    }
    if (!paymentExecutionId) {
      throw new Error('Payment Execution ID is required');
    }
    if (!payload) {
      throw new Error('Payload is required');
    }

    const url = new URL(
      `/v1/${merchantId}/commerce-cases/${commerceCaseId}/checkouts/${checkoutId}/payment-executions/${paymentExecutionId}/capture`,
      this.getConfig()?.getHost(),
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
      throw new Error('Merchant ID is required');
    }
    if (!commerceCaseId) {
      throw new Error('Commerce Case ID is required');
    }
    if (!checkoutId) {
      throw new Error('Checkout ID is required');
    }
    if (!paymentExecutionId) {
      throw new Error('Payment Execution ID is required');
    }
    if (!payload) {
      throw new Error('Payload is required');
    }

    const url = new URL(
      `/v1/${merchantId}/commerce-cases/${commerceCaseId}/checkouts/${checkoutId}/payment-executions/${paymentExecutionId}/cancel`,
      this.getConfig()?.getHost(),
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
      throw new Error('Merchant ID is required');
    }
    if (!commerceCaseId) {
      throw new Error('Commerce Case ID is required');
    }
    if (!checkoutId) {
      throw new Error('Checkout ID is required');
    }
    if (!paymentExecutionId) {
      throw new Error('Payment Execution ID is required');
    }
    if (!payload) {
      throw new Error('Payload is required');
    }

    const url = new URL(
      `/v1/${merchantId}/commerce-cases/${commerceCaseId}/checkouts/${checkoutId}/payment-executions/${paymentExecutionId}/refund`,
      this.getConfig()?.getHost(),
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
      throw new Error('Merchant ID is required');
    }
    if (!commerceCaseId) {
      throw new Error('Commerce Case ID is required');
    }
    if (!checkoutId) {
      throw new Error('Checkout ID is required');
    }
    if (!paymentExecutionId) {
      throw new Error('Payment Execution ID is required');
    }
    if (!payload) {
      throw new Error('Payload is required');
    }

    const url = new URL(
      `/v1/${merchantId}/commerce-cases/${commerceCaseId}/checkouts/${checkoutId}/payment-executions/${paymentExecutionId}/complete`,
      this.getConfig()?.getHost(),
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
