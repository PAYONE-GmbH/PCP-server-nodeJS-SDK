import { describe, expect, test } from 'vitest';
import { ApplePaymentTokenVersion } from '../models/ApplePaymentTokenVersion.js';
import type { ApplePayPayment } from '../models/applepay/ApplePayPayment.js';
import type { ApplePayPaymentData } from '../models/applepay/ApplePayPaymentData.js';
import { ApplePayPaymentMethodType } from '../models/applepay/ApplePayPaymentMethodType.js';
import type { MobilePaymentMethodSpecificInput } from '../models/MobilePaymentMethodSpecificInput.js';
import { MobilePaymentNetwork } from '../models/MobilePaymentNetwork.js';
import {
  tokenFromPaymentData,
  transformApplePayPaymentToMobilePaymentMethodSpecificInput,
} from './ApplePayTransformer.js';

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
      token: undefined,
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
            signature: 'sig',
          },
        },
      };
      const expected2: MobilePaymentMethodSpecificInput = {
        ...expected,
        paymentProduct302SpecificInput: {
          ...expected.paymentProduct302SpecificInput,
          token: {
            version: ApplePaymentTokenVersion.EC_V1,
            signature: 'sig',
            header: {
              transactionId: 'transaction-101',
            },
          },
        },
      };

      expect(transformApplePayPaymentToMobilePaymentMethodSpecificInput(payment2)).toEqual(
        expected2,
      );
    });

    test('converts an ApplePayPayment with different networks correctly', () => {
      const networks = [
        { string: 'MasterCard', network: MobilePaymentNetwork.MASTERCARD },
        { string: 'Visa', network: MobilePaymentNetwork.VISA },
        { string: 'Amex', network: MobilePaymentNetwork.AMEX },
        { string: 'Girocard', network: MobilePaymentNetwork.GIROCARD },
        { string: 'Discover', network: MobilePaymentNetwork.DISCOVER },
        { string: 'JCB', network: MobilePaymentNetwork.JCB },
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

        expect(transformApplePayPaymentToMobilePaymentMethodSpecificInput(payment3)).toEqual(
          expected3,
        );
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

      expect(() =>
        transformApplePayPaymentToMobilePaymentMethodSpecificInput(payment5),
      ).toThrowError(TypeError);
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

      expect(() =>
        transformApplePayPaymentToMobilePaymentMethodSpecificInput(payment6),
      ).toThrowError(TypeError);
    });
  });

  describe('tokenFromPaymentData', () => {
    test('returns undefined when paymentData is undefined', () => {
      expect(tokenFromPaymentData(undefined)).toBeUndefined();
    });

    test('returns undefined when version is missing', () => {
      const paymentData: ApplePayPaymentData = {
        signature: 'sig',
        header: { transactionId: 'txn-1' },
      };
      expect(tokenFromPaymentData(paymentData)).toBeUndefined();
    });

    test('returns undefined when signature is missing', () => {
      const paymentData: ApplePayPaymentData = {
        version: 'EC_V1',
        header: { transactionId: 'txn-1' },
      };
      expect(tokenFromPaymentData(paymentData)).toBeUndefined();
    });

    test('returns undefined when transactionId is missing', () => {
      const paymentData: ApplePayPaymentData = {
        version: 'EC_V1',
        signature: 'sig',
        header: {},
      };
      expect(tokenFromPaymentData(paymentData)).toBeUndefined();
    });

    test('returns token when all required fields are present', () => {
      const paymentData: ApplePayPaymentData = {
        version: 'EC_V1',
        signature: 'sig',
        header: { transactionId: 'txn-1', applicationData: 'appdata' },
      };
      expect(tokenFromPaymentData(paymentData)).toEqual({
        version: ApplePaymentTokenVersion.EC_V1,
        signature: 'sig',
        header: { transactionId: 'txn-1', applicationData: 'appdata' },
      });
    });

    test('throws when version is not recognized', () => {
      const paymentData: ApplePayPaymentData = {
        version: 'Unknown',
        signature: 'sig',
        header: { transactionId: 'txn-1' },
      };
      expect(() => tokenFromPaymentData(paymentData)).toThrowError(TypeError);
    });
  });
});
