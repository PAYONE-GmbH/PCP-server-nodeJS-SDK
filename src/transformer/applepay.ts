import type { ApplePayPayment } from '../models/applepay/ApplePayPayment.js';
import { ApplePaymentTokenVersion } from '../models/ApplePaymentTokenVersion.js';
import type { MobilePaymentMethodSpecificInput } from '../models/MobilePaymentMethodSpecificInput.js';
import { Network } from '../models/Network.js';

function networkFromString(value: string): Network {
  switch (value.toUpperCase()) {
    case Network.MASTERCARD:
      return Network.MASTERCARD;
    case Network.VISA:
      return Network.VISA;
    case Network.AMEX:
      return Network.AMEX;
    case Network.GIROCARD:
      return Network.GIROCARD;
    case Network.DISCOVER:
      return Network.DISCOVER;
    case Network.JCB:
      return Network.JCB;
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

export function applePayPaymentToMobilePaymentMethodSpecificInput(
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
