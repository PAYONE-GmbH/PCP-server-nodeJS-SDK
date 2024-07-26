# PayOne Node SDK

Welcome to the Node SDK for the PayOne PCP platform! This repository contains a powerful, easy-to-use software development kit (SDK) designed to simplify the integration of online payment processing into your applications.

### TODOS
- [ ] Setup changelog
- [ ] Setup sonarcloud
- [ ] Setup Jest and coverage
- [ ] Setup Github actions


## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
    - [Configuration](#configuration)
- [Contributing](#contributing)
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



### Run tests


### Releasing the library

- Checkout develop branch
- Create release branch (release/0.1.0)
```sh
git checkout -b release/0.1.0
```
- Run prepare-release.sh script to set correct version
```sh
./prepare-release.sh
```
- Create PR on develop branch
- Merge develop in main branch


## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

Thank you for using our SDK for Online Payments! If you have any questions or need further assistance, feel free to open an issue or contact us.