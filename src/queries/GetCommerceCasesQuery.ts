import type { PaymentChannel, StatusCheckout } from '../models/index.js';
import type { QueryConfig } from '../utils/QueryConfig.js';

export class GetCommerceCasesQuery implements QueryConfig {
  private offset?: number;
  private size?: number;
  private fromDate?: string;
  private toDate?: string;
  private commerceCaseId?: string;
  private merchantReference?: string;
  private merchantCustomerId?: string;
  private includeCheckoutStatus?: StatusCheckout[];
  private includePaymentChannel?: PaymentChannel[];

  constructor() {}

  public setOffset(offset: number): this {
    this.offset = offset;
    return this;
  }

  public setSize(size: number): this {
    this.size = size;
    return this;
  }

  public setFromDate(fromDate: string): this {
    this.fromDate = fromDate;
    return this;
  }

  public setToDate(toDate: string): this {
    this.toDate = toDate;
    return this;
  }

  public setCommerceCaseId(commerceCaseId: string): this {
    this.commerceCaseId = commerceCaseId;
    return this;
  }

  public setMerchantReference(merchantReference: string): this {
    this.merchantReference = merchantReference;
    return this;
  }

  public setMerchantCustomerId(merchantCustomerId: string): this {
    this.merchantCustomerId = merchantCustomerId;
    return this;
  }

  public setIncludeCheckoutStatus(includeCheckoutStatus: StatusCheckout[]): this {
    this.includeCheckoutStatus = includeCheckoutStatus;
    return this;
  }

  public setIncludePaymentChannel(includePaymentChannel: PaymentChannel[]): this {
    this.includePaymentChannel = includePaymentChannel;
    return this;
  }

  public getOffset(): number | undefined {
    return this.offset;
  }

  public getSize(): number | undefined {
    return this.size;
  }

  public getFromDate(): string | undefined {
    return this.fromDate;
  }

  public getToDate(): string | undefined {
    return this.toDate;
  }

  public getCommerceCaseId(): string | undefined {
    return this.commerceCaseId;
  }

  public getMerchantReference(): string | undefined {
    return this.merchantReference;
  }

  public getMerchantCustomerId(): string | undefined {
    return this.merchantCustomerId;
  }

  public getIncludeCheckoutStatus(): StatusCheckout[] | undefined {
    return this.includeCheckoutStatus;
  }

  public getIncludePaymentChannel(): PaymentChannel[] | undefined {
    return this.includePaymentChannel;
  }

  public toQueryMap(): Map<string, string> {
    const query = new Map<string, string>();

    if (this.offset !== undefined) {
      query.set('offset', this.offset.toString());
    }
    if (this.size !== undefined) {
      query.set('size', this.size.toString());
    }
    if (this.fromDate !== undefined) {
      query.set('fromDate', this.fromDate);
    }
    if (this.toDate !== undefined) {
      query.set('toDate', this.toDate);
    }
    if (this.commerceCaseId !== undefined) {
      query.set('commerceCaseId', this.commerceCaseId);
    }
    if (this.merchantReference !== undefined) {
      query.set('merchantReference', this.merchantReference);
    }
    if (this.merchantCustomerId !== undefined) {
      query.set('merchantCustomerId', this.merchantCustomerId);
    }
    if (this.includeCheckoutStatus !== undefined) {
      query.set('includeCheckoutStatus', this.includeCheckoutStatus.join(','));
    }
    if (this.includePaymentChannel !== undefined) {
      query.set('includePaymentChannel', this.includePaymentChannel.join(','));
    }
    return query;
  }
}
