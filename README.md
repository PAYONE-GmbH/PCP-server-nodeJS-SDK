# PAYONE Commerce Platform Node SDK

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=PAYONE-GmbH_PCP-server-nodeJS-SDK&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=PAYONE-GmbH_PCP-server-nodeJS-SDK)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=PAYONE-GmbH_PCP-server-nodeJS-SDK&metric=coverage)](https://sonarcloud.io/summary/new_code?id=PAYONE-GmbH_PCP-server-nodeJS-SDK)
[![npm](https://img.shields.io/npm/v/pcp-server-nodejs-sdk)](https://www.npmjs.com/package/pcp-server-nodejs-sdk)
[![npm downloads](https://img.shields.io/npm/dw/pcp-server-nodejs-sdk)](https://www.npmjs.com/package/pcp-server-nodejs-sdk)

**NOTE:** This SDK is still under development. Some things may be broken, features may change in non-compatible ways or will be removed completely.

Welcome to the Node SDK for the PAYONE Commerce Platform! This repository contains a powerful, easy-to-use software development kit (SDK) designed to simplify the integration of online payment processing into your applications.

### TODOS

- [ ] Write more tests

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Configuration](#configuration)
- [Contributing](#contributing)
  - [Build the library](#build-the-library)
  - [Run tests](#run-tests)
  - [Releasing the library](#releasing-the-library)
    - [Preparing the Release](#preparing-the-release)
    - [Changelog Generation with Conventional Changelog](#changelog-generation-with-conventional-changelog)
    - [Merging the Release Branch](#merging-the-release-branch)
- [License](#license)

## Features

- **Easy Integration**: Seamlessly integrate online payment processing into your application.
- **Secure Transactions**: Built with security best practices to ensure safe transactions.
- **Extensive Documentation**: Detailed documentation to help you get started quickly.
- **Open Source**: Fully open source and community-driven.

## Installation

## Usage

### Configuration

### Run the example app

```sh
cd example-app
yarn
API_KEY=api_key API_SECRET=api_secret MERCHANT_ID=123 COMMERCE_CASE_ID=234 CHECKOUT_ID=345 yarn dev
```

## Contributing

We welcome contributions from the community. If you want to contribute, please follow these steps:

Fork the repository.
Create a new branch (`git checkout -b feature-branch`).
Make your changes.
Commit your changes (`git commit -am 'Add new feature'`).
Push to the branch (`git push origin feature-branch`).
Create a new Pull Request.
Please make sure to follow the coding standards and write appropriate tests for your changes.

### Build the library

```sh
npm run build
```

### Run tests

```sh
npm run test
# or for coverage
npm run coverage
```

### Releasing the library

#### Preparing the Release

- Checkout develop branch
- Create release branch (release/0.1.0)

```sh
git checkout -b release/0.1.0
```

- Run prepare-release.sh script to set correct version

```sh
./prepare-release.sh
```

#### Changelog Generation with Conventional Changelog

After calling the `prepare_release.sh` script, it is recommended to manually trigger the changelog generation script (which uses [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)).

1. **Conventional Commit Messages**:

   - Ensure all commit messages follow the conventional commit format, which helps in automatic changelog generation.
   - Commit messages should be in the format: `type(scope): subject`.

2. **Enforcing Commit Messages**:

   - We enforce conventional commit messages using [Lefthook](https://github.com/evilmartians/lefthook) with [commitlint](https://github.com/conventional-changelog/commitlint).
   - This setup ensures that all commit messages are validated before they are committed.

3. **Generate Changelog**:
   - Run the changelog generation script to update the `CHANGELOG.md` file:
     ```sh
     npm run changelog
     ```
   - Review and commit the updated changelog before proceeding with the release.

#### Merging the Release Branch

- Create PR on develop branch
- Merge develop in main branch

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

Thank you for using our SDK for Online Payments! If you have any questions or need further assistance, feel free to open an issue or contact us.
