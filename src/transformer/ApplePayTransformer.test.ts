import { describe, expect, test } from 'vitest';
import type { ApplePayPayment } from '../models/applepay/ApplePayPayment.js';
import { ApplePayPaymentMethodType } from '../models/applepay/ApplePayPaymentMethodType.js';
import { ApplePaymentTokenVersion } from '../models/ApplePaymentTokenVersion.js';
import type { MobilePaymentMethodSpecificInput } from '../models/MobilePaymentMethodSpecificInput.js';
import { Network } from '../models/Network.js';
import { transformApplePayPaymentToMobilePaymentMethodSpecificInput } from './ApplePayTransformer.js';

describe('ApplePayTransformer', () => {
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
        network: undefined,
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
      network: undefined,
      token: {
        signature: undefined,
        header: {
          transactionId: 'transaction-101',
          applicationData: undefined,
        },
      },
    },
  };
  describe('transformApplePayPaymentToMobilePaymentMethodSpecificInput', () => {
    test('converts an ApplePayPayment correctly', () => {
      expect(transformApplePayPaymentToMobilePaymentMethodSpecificInput(payment)).toEqual(expected);
    });

    test('converts an ApplePayPayment with a specific payment data version correctly', () => {
      const payment2: ApplePayPayment = {
        ...payment,
        token: {
          ...payment.token,
          paymentData: {
            ...payment.token!.paymentData,
            version: 'EC_V1',
          },
        },
      };
      const expected2: MobilePaymentMethodSpecificInput = {
        ...expected,
        paymentProduct302SpecificInput: {
          ...expected.paymentProduct302SpecificInput,
          token: {
            ...expected.paymentProduct302SpecificInput!.token,
            version: ApplePaymentTokenVersion.EC_V1,
          },
        },
      };

      expect(transformApplePayPaymentToMobilePaymentMethodSpecificInput(payment2)).toEqual(expected2);
    });

    test('converts an ApplePayPayment with different networks correctly', () => {
      const networks = [
        { string: 'MasterCard', network: Network.MASTERCARD },
        { string: 'Visa', network: Network.VISA },
        { string: 'Amex', network: Network.AMEX },
        { string: 'Girocard', network: Network.GIROCARD },
        { string: 'Discover', network: Network.DISCOVER },
        { string: 'JCB', network: Network.JCB },
      ];
      networks.forEach(({ string, network }) => {
        const payment3: ApplePayPayment = {
          ...payment,
          token: {
            ...payment.token,
            paymentMethod: {
              ...payment.token!.paymentMethod,
              network: string,
            },
          },
        };
        const expected3: MobilePaymentMethodSpecificInput = {
          ...expected,
          paymentProduct302SpecificInput: {
            ...expected.paymentProduct302SpecificInput,
            network,
          },
        };

        expect(transformApplePayPaymentToMobilePaymentMethodSpecificInput(payment3)).toEqual(expected3);
      });
    });

    test('throws an error when the network is not recognized', () => {
      const payment5: ApplePayPayment = {
        ...payment,
        token: {
          ...payment.token,
          paymentMethod: {
            ...payment.token!.paymentMethod,
            network: 'Unknown',
          },
        },
      };

      expect(() => transformApplePayPaymentToMobilePaymentMethodSpecificInput(payment5)).toThrowError(TypeError);
    });

    test('throws an error when the payment data version is not recognized', () => {
      const payment6: ApplePayPayment = {
        ...payment,
        token: {
          ...payment.token,
          paymentData: {
            ...payment.token!.paymentData,
            version: 'Unknown',
          },
        },
      };

      expect(() => transformApplePayPaymentToMobilePaymentMethodSpecificInput(payment6)).toThrowError(TypeError);
    });
  });
});
