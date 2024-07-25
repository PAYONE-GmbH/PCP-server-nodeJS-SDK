import { PaymentChannel, StatusCheckout, ExtendedCheckoutStatus } from '../models';
import { QueryConfig } from '../utils/QueryConfig';

export class GetCheckoutsQuery implements QueryConfig {
  private offset?: number;
  private size?: number;
  private fromDate?: string;
  private toDate?: string;
  private fromCheckoutAmount?: number;
  private toCheckoutAmount?: number;
  private fromOpenAmount?: number;
  private toOpenAmount?: number;
  private fromCollectedAmount?: number;
  private toCollectedAmount?: number;
  private fromCancelledAmount?: number;
  private toCancelledAmount?: number;
  private fromRefundAmount?: number;
  private toRefundAmount?: number;
  private fromChargebackAmount?: number;
  private toChargebackAmount?: number;
  private checkoutId?: string;
  private merchantReference?: string;
  private merchantCustomerId?: string;
  private includePaymentProductId?: number[];
  private includeCheckoutStatus?: StatusCheckout[];
  private includeExtendedCheckoutStatus?: ExtendedCheckoutStatus[];
  private includePaymentChannel?: PaymentChannel[];
  private paymentReference?: string;
  private paymentId?: string;
  private firstName?: string;
  private surname?: string;
  private email?: string;
  private phoneNumber?: string;
  private dateOfBirth?: string;
  private companyInformation?: string;

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

  public setFromCheckoutAmount(fromCheckoutAmount: number): this {
    this.fromCheckoutAmount = fromCheckoutAmount;
    return this;
  }

  public setToCheckoutAmount(toCheckoutAmount: number): this {
    this.toCheckoutAmount = toCheckoutAmount;
    return this;
  }

  public setFromOpenAmount(fromOpenAmount: number): this {
    this.fromOpenAmount = fromOpenAmount;
    return this;
  }

  public setToOpenAmount(toOpenAmount: number): this {
    this.toOpenAmount = toOpenAmount;
    return this;
  }

  public setFromCollectedAmount(fromCollectedAmount: number): this {
    this.fromCollectedAmount = fromCollectedAmount;
    return this;
  }

  public setToCollectedAmount(toCollectedAmount: number): this {
    this.toCollectedAmount = toCollectedAmount;
    return this;
  }

  public setFromCancelledAmount(fromCancelledAmount: number): this {
    this.fromCancelledAmount = fromCancelledAmount;
    return this;
  }

  public setToCancelledAmount(toCancelledAmount: number): this {
    this.toCancelledAmount = toCancelledAmount;
    return this;
  }

  public setFromRefundAmount(fromRefundAmount: number): this {
    this.fromRefundAmount = fromRefundAmount;
    return this;
  }

  public setToRefundAmount(toRefundAmount: number): this {
    this.toRefundAmount = toRefundAmount;
    return this;
  }

  public setFromChargebackAmount(fromChargebackAmount: number): this {
    this.fromChargebackAmount = fromChargebackAmount;
    return this;
  }

  public setToChargebackAmount(toChargebackAmount: number): this {
    this.toChargebackAmount = toChargebackAmount;
    return this;
  }

  public setCheckoutId(checkoutId: string): this {
    this.checkoutId = checkoutId;
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

  public setIncludePaymentProductId(includePaymentProductId: number[]): this {
    this.includePaymentProductId = includePaymentProductId;
    return this;
  }

  public setIncludeCheckoutStatus(includeCheckoutStatus: StatusCheckout[]): this {
    this.includeCheckoutStatus = includeCheckoutStatus;
    return this;
  }

  public setIncludeExtendedCheckoutStatus(includeExtendedCheckoutStatus: ExtendedCheckoutStatus[]): this {
    this.includeExtendedCheckoutStatus = includeExtendedCheckoutStatus;
    return this;
  }

  public setIncludePaymentChannel(includePaymentChannel: PaymentChannel[]): this {
    this.includePaymentChannel = includePaymentChannel;
    return this;
  }

  public setPaymentReference(paymentReference: string): this {
    this.paymentReference = paymentReference;
    return this;
  }

  public setPaymentId(paymentId: string): this {
    this.paymentId = paymentId;
    return this;
  }

  public setFirstName(firstName: string): this {
    this.firstName = firstName;
    return this;
  }

  public setSurname(surname: string): this {
    this.surname = surname;
    return this;
  }

  public setEmail(email: string): this {
    this.email = email;
    return this;
  }

  public setPhoneNumber(phoneNumber: string): this {
    this.phoneNumber = phoneNumber;
    return this;
  }

  public setDateOfBirth(dateOfBirth: string): this {
    this.dateOfBirth = dateOfBirth;
    return this;
  }

  public setCompanyInformation(companyInformation: string): this {
    this.companyInformation = companyInformation;
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

  public getFromCheckoutAmount(): number | undefined {
    return this.fromCheckoutAmount;
  }

  public getToCheckoutAmount(): number | undefined {
    return this.toCheckoutAmount;
  }

  public getFromOpenAmount(): number | undefined {
    return this.fromOpenAmount;
  }

  public getToOpenAmount(): number | undefined {
    return this.toOpenAmount;
  }

  public getFromCollectedAmount(): number | undefined {
    return this.fromCollectedAmount;
  }

  public getToCollectedAmount(): number | undefined {
    return this.toCollectedAmount;
  }

  public getFromCancelledAmount(): number | undefined {
    return this.fromCancelledAmount;
  }

  public getToCancelledAmount(): number | undefined {
    return this.toCancelledAmount;
  }

  public getFromRefundAmount(): number | undefined {
    return this.fromRefundAmount;
  }

  public getToRefundAmount(): number | undefined {
    return this.toRefundAmount;
  }

  public getFromChargebackAmount(): number | undefined {
    return this.fromChargebackAmount;
  }

  public getToChargebackAmount(): number | undefined {
    return this.toChargebackAmount;
  }

  public getCheckoutId(): string | undefined {
    return this.checkoutId;
  }

  public getMerchantReference(): string | undefined {
    return this.merchantReference;
  }

  public getMerchantCustomerId(): string | undefined {
    return this.merchantCustomerId;
  }

  public getIncludePaymentProductId(): number[] | undefined {
    return this.includePaymentProductId;
  }

  public getIncludeCheckoutStatus(): StatusCheckout[] | undefined {
    return this.includeCheckoutStatus;
  }

  public getIncludeExtendedCheckoutStatus(): ExtendedCheckoutStatus[] | undefined {
    return this.includeExtendedCheckoutStatus;
  }

  public getIncludePaymentChannel(): PaymentChannel[] | undefined {
    return this.includePaymentChannel;
  }

  public getPaymentReference(): string | undefined {
    return this.paymentReference;
  }

  public getPaymentId(): string | undefined {
    return this.paymentId;
  }

  public getFirstName(): string | undefined {
    return this.firstName;
  }

  public getSurname(): string | undefined {
    return this.surname;
  }

  public getEmail(): string | undefined {
    return this.email;
  }

  public getPhoneNumber(): string | undefined {
    return this.phoneNumber;
  }

  public getDateOfBirth(): string | undefined {
    return this.dateOfBirth;
  }

  public getCompanyInformation(): string | undefined {
    return this.companyInformation;
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
    if (this.fromCheckoutAmount !== undefined) {
      query.set('fromCheckoutAmount', this.fromCheckoutAmount.toString());
    }
    if (this.toCheckoutAmount !== undefined) {
      query.set('toCheckoutAmount', this.toCheckoutAmount.toString());
    }
    if (this.fromOpenAmount !== undefined) {
      query.set('fromOpenAmount', this.fromOpenAmount.toString());
    }
    if (this.toOpenAmount !== undefined) {
      query.set('toOpenAmount', this.toOpenAmount.toString());
    }
    if (this.fromCollectedAmount !== undefined) {
      query.set('fromCollectedAmount', this.fromCollectedAmount.toString());
    }
    if (this.toCollectedAmount !== undefined) {
      query.set('toCollectedAmount', this.toCollectedAmount.toString());
    }
    if (this.fromCancelledAmount !== undefined) {
      query.set('fromCancelledAmount', this.fromCancelledAmount.toString());
    }
    if (this.toCancelledAmount !== undefined) {
      query.set('toCancelledAmount', this.toCancelledAmount.toString());
    }
    if (this.fromRefundAmount !== undefined) {
      query.set('fromRefundAmount', this.fromRefundAmount.toString());
    }
    if (this.toRefundAmount !== undefined) {
      query.set('toRefundAmount', this.toRefundAmount.toString());
    }
    if (this.fromChargebackAmount !== undefined) {
      query.set('fromChargebackAmount', this.fromChargebackAmount.toString());
    }
    if (this.toChargebackAmount !== undefined) {
      query.set('toChargebackAmount', this.toChargebackAmount.toString());
    }
    if (this.checkoutId !== undefined) {
      query.set('checkoutId', this.checkoutId);
    }
    if (this.merchantReference !== undefined) {
      query.set('merchantReference', this.merchantReference);
    }
    if (this.merchantCustomerId !== undefined) {
      query.set('merchantCustomerId', this.merchantCustomerId);
    }
    if (this.includePaymentProductId !== undefined) {
      const productIdList = this.includePaymentProductId.map(productId => productId.toString());
      query.set('includePaymentProductId', productIdList.join(','));
    }
    if (this.includeCheckoutStatus !== undefined) {
      query.set('includeCheckoutStatus', this.includeCheckoutStatus.join(','));
    }
    if (this.includeExtendedCheckoutStatus !== undefined) {
      query.set('includeExtendedCheckoutStatus', this.includeExtendedCheckoutStatus.join(','));
    }
    if (this.includePaymentChannel !== undefined) {
      query.set('includePaymentChannel', this.includePaymentChannel.join(','));
    }
    if (this.paymentReference !== undefined) {
      query.set('paymentReference', this.paymentReference);
    }
    if (this.paymentId !== undefined) {
      query.set('paymentId', this.paymentId);
    }
    if (this.firstName !== undefined) {
      query.set('firstName', this.firstName);
    }
    if (this.surname !== undefined) {
      query.set('surname', this.surname);
    }
    if (this.email !== undefined) {
      query.set('email', this.email);
    }
    if (this.phoneNumber !== undefined) {
      query.set('phoneNumber', this.phoneNumber);
    }
    if (this.dateOfBirth !== undefined) {
      query.set('dateOfBirth', this.dateOfBirth);
    }
    if (this.companyInformation !== undefined) {
      query.set('companyInformation', this.companyInformation);
    }
    return query;
  }
}
