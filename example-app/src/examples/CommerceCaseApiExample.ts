import {
  CommerceCaseApiClient,
  CommunicatorConfiguration,
  CreateCommerceCaseRequest,
  Customer,
  GetCommerceCasesQuery,
} from 'pcp-server-nodejs-sdk';

export class CommerceCaseApiExample {
  client: CommerceCaseApiClient;
  merchantId = process.env.MERCHANT_ID!;
  commerceCaseId = process.env.COMMERCE_CASE_ID!;

  constructor(config: CommunicatorConfiguration) {
    this.client = new CommerceCaseApiClient(config);
  }

  async runPostOne() {
    const payload = new CreateCommerceCaseRequest();
    const res = await this.client.createCommerceCaseRequest(this.merchantId, payload);
    console.log(res);
  }

  async runGetAll() {
    const query = new GetCommerceCasesQuery();
    query.setOffset(2);
    query.setSize(1);
    const res = await this.client.getCommerceCasesRequest(this.merchantId, query);
    console.log(res);
  }
  async runGetOne() {
    const res = await this.client.getCommerceCaseRequest(this.merchantId, this.commerceCaseId);
    console.log(res);
  }
  async runUpdateOne() {
    const getOneResponse = await this.client.getCommerceCaseRequest(this.merchantId, this.commerceCaseId);

    if (!getOneResponse.customer) {
      throw new Error('Customer not found');
    }
    if (!getOneResponse.customer.billingAddress) {
      throw new Error('Billing address not found');
    }
    const modifiedCustomer: Customer = {
      ...getOneResponse.customer,
      billingAddress: {
        ...getOneResponse.customer.billingAddress,
        city: 'New York',
      },
    };

    const res = await this.client.updateCommerceCaseRequest(this.merchantId, this.commerceCaseId, modifiedCustomer);
    console.log(res);
  }
}
