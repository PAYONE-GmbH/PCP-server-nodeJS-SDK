import type { ApplePayPayment } from '../models/applepay/ApplePayPayment.js';
import { ApplePaymentTokenVersion } from '../models/ApplePaymentTokenVersion.js';
import type { MobilePaymentMethodSpecificInput } from '../models/MobilePaymentMethodSpecificInput.js';
import { MobilePaymentNetwork } from '../models/MobilePaymentNetwork.js';

function networkFromString(value: string): MobilePaymentNetwork {
  switch (value.toUpperCase()) {
    case MobilePaymentNetwork.MASTERCARD:
      return MobilePaymentNetwork.MASTERCARD;
    case MobilePaymentNetwork.VISA:
      return MobilePaymentNetwork.VISA;
    case MobilePaymentNetwork.AMEX:
      return MobilePaymentNetwork.AMEX;
    case MobilePaymentNetwork.GIROCARD:
      return MobilePaymentNetwork.GIROCARD;
    case MobilePaymentNetwork.DISCOVER:
      return MobilePaymentNetwork.DISCOVER;
    case MobilePaymentNetwork.JCB:
      return MobilePaymentNetwork.JCB;
    default:
      throw new TypeError(`'${value}' can't represent a Network`);
  }
}

function versionFromString(value: string): ApplePaymentTokenVersion {
  switch (value) {
    case ApplePaymentTokenVersion.EC_V1:
      return ApplePaymentTokenVersion.EC_V1;
    default:
      throw new TypeError(`'${value}' can't represent an ApplePaymentTokenVersion`);
  }
}

export function transformApplePayPaymentToMobilePaymentMethodSpecificInput(
  payment: ApplePayPayment,
): MobilePaymentMethodSpecificInput {
  return {
    paymentProductId: 302,
    publicKeyHash: payment.token?.paymentData?.header?.publicKeyHash,
    ephemeralKey: payment.token?.paymentData?.header?.ephemeralPublicKey,
    paymentProduct302SpecificInput: {
      network: payment.token?.paymentMethod?.network
        ? networkFromString(payment.token.paymentMethod.network)
        : undefined,
      token: {
        version: payment.token?.paymentData?.version ? versionFromString(payment.token.paymentData.version) : undefined,
        signature: payment.token?.paymentData?.signature,
        header: {
          transactionId: payment.token?.paymentData?.header?.transactionId,
          applicationData: payment.token?.paymentData?.header?.applicationData,
        },
      },
    },
  };
}
