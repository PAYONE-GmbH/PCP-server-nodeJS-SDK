import { describe, test, expect } from 'vitest';
import { PaymentChannel } from '../models/PaymentChannel.js';
import { StatusCheckout } from '../models/StatusCheckout.js';
import { GetCommerceCasesQuery } from './GetCommerceCasesQuery.js';

describe('GetCommerceCasesQuery', () => {
  test('toQueryMap', () => {
    const query = new GetCommerceCasesQuery();
    query.setOffset(1);
    query.setSize(10);
    query.setFromDate('2021-01-01');
    query.setToDate('2021-01-31');
    query.setCommerceCaseId('123456');
    query.setMerchantReference('7890');
    query.setMerchantCustomerId('1234');
    query.setIncludeCheckoutStatus([StatusCheckout.BILLED, StatusCheckout.CHARGEBACKED]);
    query.setIncludePaymentChannel([PaymentChannel.ECOMMERCE, PaymentChannel.POS]);

    const queryMap = query.toQueryMap();

    expect(queryMap.get('offset')).toEqual('1');
    expect(queryMap.get('size')).toEqual('10');
    expect(queryMap.get('fromDate')).toEqual('2021-01-01');
    expect(queryMap.get('toDate')).toEqual('2021-01-31');
    expect(queryMap.get('commerceCaseId')).toEqual('123456');
    expect(queryMap.get('merchantReference')).toEqual('7890');
    expect(queryMap.get('merchantCustomerId')).toEqual('1234');
    expect(queryMap.get('includeCheckoutStatus')).toEqual('BILLED,CHARGEBACKED');
    expect(queryMap.get('includePaymentChannel')).toEqual('ECOMMERCE,POS');
  });

  test('getters', () => {
    const query = new GetCommerceCasesQuery();
    query.setOffset(1);
    query.setSize(10);
    query.setFromDate('2021-01-01');
    query.setToDate('2021-01-31');
    query.setCommerceCaseId('123456');
    query.setMerchantReference('7890');
    query.setMerchantCustomerId('1234');
    query.setIncludeCheckoutStatus([StatusCheckout.BILLED, StatusCheckout.CHARGEBACKED]);
    query.setIncludePaymentChannel([PaymentChannel.ECOMMERCE, PaymentChannel.POS]);

    expect(query.getOffset()).toEqual(1);
    expect(query.getSize()).toEqual(10);
    expect(query.getFromDate()).toEqual('2021-01-01');
    expect(query.getToDate()).toEqual('2021-01-31');
    expect(query.getCommerceCaseId()).toEqual('123456');
    expect(query.getMerchantReference()).toEqual('7890');
    expect(query.getMerchantCustomerId()).toEqual('1234');
    expect(query.getIncludeCheckoutStatus()).toEqual([StatusCheckout.BILLED, StatusCheckout.CHARGEBACKED]);
    expect(query.getIncludePaymentChannel()).toEqual([PaymentChannel.ECOMMERCE, PaymentChannel.POS]);
  });

  test('nulls', () => {
    const query = new GetCommerceCasesQuery();
    const queryMap = query.toQueryMap();

    expect(Object.keys(queryMap).length).toBe(0);
  });
});
