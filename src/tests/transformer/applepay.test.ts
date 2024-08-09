import { describe, expect, test } from 'vitest';
import type { ApplePayPayment } from '../../models/applepay/ApplePayPayment.js';
import type { MobilePaymentMethodSpecificInput } from '../../models/MobilePaymentMethodSpecificInput.js';
import { ApplePayPaymentMethodType } from '../../models/applepay/ApplePayPaymentMethodType.js';
import { Network } from '../../models/Network.js';
import { applePayPaymentToMobilePaymentMethodSpecificInput } from '../../transformer/applepay.js';

describe('applepay transformer', () => {
  describe('applePayPaymentToMobilePaymentMethodSpecificInput', () => {
    test('converts a full ApplePayPayment correctly', () => {
      const payment: ApplePayPayment = {
        token: {
          paymentData: {
            data: 'data',
            header: {
              applicationData: undefined,
              publicKeyHash: 'hashhashhash',
              transactionId: 'transaction-101',
            },
            signature: undefined,
            version: undefined,
          },
          paymentMethod: {
            displayName: 'The name is...',
            network: 'MasterCard',
            type: ApplePayPaymentMethodType.CREDIT,
            paymentPass: undefined,
            billingContact: undefined,
          },
          transactionIdentifier: 'transaction-101-cc',
        },
        billingContact: {
          phoneNumber: '+1239452324',
          emailAddress: 'mail@imail.com',
          givenName: 'John',
          familyName: 'Michell',
          phoneticGivenName: '',
          phoneticFamilyName: '',
          addressLines: ['Alarichtstraße 12'],
          locality: 'Berlin',
          postalCode: '12105',
          subAdministrativeArea: '',
        },
        shippingContact: undefined,
      };

      const expected: MobilePaymentMethodSpecificInput = {
        paymentProductId: 302,
        publicKeyHash: 'hashhashhash',
        ephemeralKey: undefined,
        paymentProduct302SpecificInput: {
          network: Network.MASTERCARD,
          token: {
            signature: undefined,
            header: {
              transactionId: 'transaction-101',
              applicationData: undefined,
            },
          },
        },
      };

      expect(applePayPaymentToMobilePaymentMethodSpecificInput(payment)).toEqual(expected);
    });
  });
});
