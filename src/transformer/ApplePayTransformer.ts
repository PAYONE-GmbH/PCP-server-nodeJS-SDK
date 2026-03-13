import type { ApplePaymentDataTokenInformation } from '../models/ApplePaymentDataTokenInformation.js';
import { ApplePaymentTokenVersion } from '../models/ApplePaymentTokenVersion.js';
import type { ApplePayPayment } from '../models/applepay/ApplePayPayment.js';
import type { ApplePayPaymentData } from '../models/applepay/ApplePayPaymentData.js';
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

export function tokenFromPaymentData(
  paymentData?: ApplePayPaymentData
): ApplePaymentDataTokenInformation | undefined {
  const version = paymentData?.version ? versionFromString(paymentData.version) : undefined;
  const signature = paymentData?.signature;
  const transactionId = paymentData?.header?.transactionId;

  if (version === undefined || signature === undefined || transactionId === undefined) {
    return undefined;
  }

  return {
    version,
    signature,
    header: {
      transactionId,
      applicationData: paymentData?.header?.applicationData,
    },
  };
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
      token: tokenFromPaymentData(payment.token?.paymentData),
    },
  };
}
