# PAYONE Commerce Platform Node SDK

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=PAYONE-GmbH_PCP-server-nodeJS-SDK&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=PAYONE-GmbH_PCP-server-nodeJS-SDK)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=PAYONE-GmbH_PCP-server-nodeJS-SDK&metric=coverage)](https://sonarcloud.io/summary/new_code?id=PAYONE-GmbH_PCP-server-nodeJS-SDK)
[![npm](https://img.shields.io/npm/v/pcp-server-nodejs-sdk)](https://www.npmjs.com/package/pcp-server-nodejs-sdk)
[![npm downloads](https://img.shields.io/npm/dw/pcp-server-nodejs-sdk)](https://www.npmjs.com/package/pcp-server-nodejs-sdk)

Welcome to the Node SDK for the PAYONE Commerce Platform (api-version 1.28.0)! This repository contains a powerful, easy-to-use software development kit (SDK) designed to simplify the integration of online payment processing into your applications. 

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [General](#general)
  - [Error Handling](#error-handling)
  - [Client Side](#client-side)
  - [Apple Pay](#apple-pay)
- [Demo App](#demo-app)
- [Contributing](#contributing)
- [Releasing the library](#releasing-the-library)
  - [Preparing the Release](#preparing-the-release)
  - [Changelog Generation with Conventional Changelog](#changelog-generation-with-conventional-changelog)
  - [Merging the Release Branch](#merging-the-release-branch)
  - [GitHub Action for Release](#github-action-for-release)
  - [Optional: Creating a GitHub Release](#optional-creating-a-github-release)
- [License](#license)

## Features

- **Easy Integration**: Seamlessly integrate online payment processing into your application.
- **Secure Transactions**: Built with security best practices to ensure safe transactions.
- **Extensive Documentation**: Detailed documentation to help you get started quickly.
- **Open Source**: Fully open source and community-driven.

## Installation

[View in NPM](https://www.npmjs.com/package/pcp-server-nodejs-sdk)

```sh
# npm
npm i pcp-server-nodejs-sdk
# yarn
yarn add pcp-server-nodejs-sdk
```

**[back to top](#table-of-contents)**

## Usage

### General

To use this SDK you need to construct a `CommunicatorConfiguration` which encapsulate everything needed to connect to the PAYONE Commerce Platform.

```ts
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;

const config = new CommunicatorConfiguration(apiKey, apiSecret, 'api.preprod.commerce.payone.com');
```

With the configuration you can create an API client for each reource you want to interact with. For example to create a commerce case you can use the `CommerceCaseApiClient`.

```ts
const commerceCaseClient = new CommerceCaseApiClient(config);
```

All payloads and reponses are availabe as ts interfaces exported from this library.
For example, to create an empty commerce case you can pass an object with the `CreateCommerceCaseRequest` interface:

```ts
const createCommerceCaseRequest: CreateCommerceCaseRequest = {};

const createCommerceCaseResponse: CreateCommerceCaseResponse = commerceCaseClient.createCommerceCaseRequest(
  'merchant_id',
  createCommerceCaseRequest,
);
```

The models directly map to the API as described in [PAYONE Commerce Platform API Reference](https://docs.payone.com/pcp/commerce-platform-api).

### Error Handling

When making a request any client may throw a `ApiException`. There two subtypes of this exception:

- `ApiErrorReponseException`: This exception is thrown when the API returns an well-formed error response. The given errors are deserialized into `APIError` objects which are availble via the `getErrors()` method on the exception. They usually contain useful information about what is wrong in your request or the state of the resource.
- `ApiResponseRetrievalException`: This exception is a catch-all exception for any error that cannot be turned into a helpful error response. This includes malformed responses or unknown responses.

### Client Side

For most [payment methods](https://docs.payone.com/pcp/commerce-platform-payment-methods) some information from the client is needed, e.g. payment information given by Apple when a payment via ApplePay suceeds. PAYONE provides client side SDKs which helps you interact the third party payment providers. You can find the SDKs under the [PAYONE GitHub organization](https://github.com/PAYONE-GmbH). Either way ensure to never store or even send credit card information to your server. The PAYONE Commerce Platform never needs access to the credit card information. The client side is responsible for safely retrieving a credit card token. This token must be used with this SDK.

### Apple Pay

When a client is successfully made a payment via ApplePay it receives a [ApplePayPayment](https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypayment). This structure is accessible as the `ApplePayPayment` class. You can use the `ApplePayTransformer` to map an `ApplePayPayment` to a `MobilePaymentMethodSpecificInput` which can be used for payment executions or order requests. The transformer has a static method `transformApplePayPaymentToMobilePaymentMethodSpecificInput()` which takes an `ApplePayPayment` and returns a `MobilePaymentMethodSpecificInput`. The transformer does not check if the response is complete, if anything is missing the field will be set to `undefined`.

**[back to top](#table-of-contents)**

## Demo App

```sh
cd example-app
npm i
API_KEY=api_key API_SECRET=api_secret MERCHANT_ID=123 COMMERCE_CASE_ID=234 CHECKOUT_ID=345 npm run dev
```

**[back to top](#table-of-contents)**

## Contributing

See [Contributing](./CONTRIBUTING.md)

**[back to top](#table-of-contents)**

## Releasing the library

### Preparing the Release

- Checkout develop branch
- Create release branch (release/0.1.0)

```sh
git checkout -b release/0.1.0
```

- Apply versioning

```sh
npm version major|minor|patch
```

### Changelog Generation with Conventional Changelog

The changelog gets generated automatically when the npm version gets bumped via `npm version major|minor|patch` within the `version.sh` script.

1. **Conventional Commit Messages**:

   - Ensure all commit messages follow the conventional commit format, which helps in automatic changelog generation.
   - Commit messages should be in the format: `type(scope): subject`.

2. **Enforcing Commit Messages**:

   - We enforce conventional commit messages using [Lefthook](https://github.com/evilmartians/lefthook) with [commitlint](https://github.com/conventional-changelog/commitlint).
   - This setup ensures that all commit messages are validated before they are committed.

### Merging the Release Branch

- Create PR on `develop` branch
- Merge `develop` in `main` branch

### GitHub Action for Release

After successfully merging all changes to the `main` branch, an admin can trigger a GitHub Action to finalize and publish the release. This action ensures that the release process is automated, consistent, and deploys the new release from the `main` branch.

**Triggering the GitHub Action**:

- Only admins can trigger the release action.
- Ensure that all changes are committed to the `main` branch.
- Navigate to the Actions tab on your GitHub repository and manually trigger the release action for the `main` branch.

### Optional: Creating a GitHub Release

Once the release has been published to npm, developers can start using the latest version of the SDK. However, if you want to make the release more visible and include detailed release notes, you can optionally create a GitHub release.

1. **Navigate to the Releases Page**: Go to the "Releases" section of your repository on GitHub.
2. **Draft a New Release**: Click "Draft a new release".
3. **Tag the Release**: Select the version tag that corresponds to the version you just published on npm (e.g., `v0.1.0`).
4. **Release Title**: Add a descriptive title for the release (e.g., `v0.1.0 - Initial Release`).
5. **Auto-Generated Release Notes**: GitHub can automatically generate release notes based on merged pull requests and commit history. You can review these notes, adjust the content, and highlight important changes.
6. **Publish the Release**: Once you're satisfied with the release notes, click "Publish release".

Creating a GitHub release is optional, but it can provide additional context and visibility for your users. For detailed guidance, refer to the [GitHub documentation on managing releases](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository).

**[back to top](#table-of-contents)**

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

**[back to top](#table-of-contents)**

---

Thank you for using our SDK for Online Payments! If you have any questions or need further assistance, feel free to open an issue or contact us.
