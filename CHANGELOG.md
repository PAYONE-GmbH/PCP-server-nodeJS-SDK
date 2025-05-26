# [1.2.0](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/compare/v1.1.0...v1.2.0) (2025-05-26)

### Documentation

* docs: improve description for taxAmountPerUnit field in OrderLineDetailsInput interface ([91e9c6c62ebd94413d023506b1dfac520b0aa72b](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/91e9c6c62ebd94413d023506b1dfac520b0aa72b))
* docs: update description for category field in APIError interface for clarity ([606a252c27bfa4a632d619a0ed39e4eaae65beea](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/606a252c27bfa4a632d619a0ed39e4eaae65beea))
* docs: update docs ([be11f7de4c00943dd843538f40cbba35c7b3298f](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/be11f7de4c00943dd843538f40cbba35c7b3298f))

### Features

* feat: add ActionType enum and update MerchantAction interface to use it ([0a820a89be3d7270bde5a168120bf464a33bd971](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/0a820a89be3d7270bde5a168120bf464a33bd971))
* feat: add AvsResult enum and integrate it into CardFraudResults interface ([a8831eca61f2c81adb6175a5b61d0a16d04a121c](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/a8831eca61f2c81adb6175a5b61d0a16d04a121c))
* feat: add BusinessRelation enum and integrate it into Customer interface ([8a5ebacdb2e6d6cc6d24e8095f4d6a631786c149](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/8a5ebacdb2e6d6cc6d24e8095f4d6a631786c149))
* feat: add CustomerAccount interface and integrate it into Customer model ([bb5c2f24431f1bae2e3f80fcfb258812a67f50c5](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/bb5c2f24431f1bae2e3f80fcfb258812a67f50c5))
* feat: add fraudNetId field to RedirectPaymentProduct840SpecificInput interface ([12830d6d693699a0950fc465223ace852c69feca](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/12830d6d693699a0950fc465223ace852c69feca))
* feat: introduce RecurringPaymentSequenceIndicator enum and update CardRecurrenceDetails interface ([d5479e86552314b9351de25ea08f5c80100cbf42](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/d5479e86552314b9351de25ea08f5c80100cbf42))

# [1.1.0](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/compare/v1.0.0...v1.1.0) (2025-03-12)

### Documentation

* docs: add link to npm ([5352fe0114d93a250a6bba933f5c2d6bc2df2d33](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/5352fe0114d93a250a6bba933f5c2d6bc2df2d33))

### Features

* feat: implement api version 1.28.0 ([dc2d0f39ddc3ddb489504531d0da8efedb9011ab](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/dc2d0f39ddc3ddb489504531d0da8efedb9011ab))

# [1.0.0](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/compare/v0.0.3...v1.0.0) (2024-08-22)

### Documentation

* docs: remove manual changelog generation hint ([04b8d42de81097407f885793cbdd786d3c5afdce](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/04b8d42de81097407f885793cbdd786d3c5afdce))
* docs: update changelog generation docs ([34e0d08efc83750f37951c495a901da6898fccbd](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/34e0d08efc83750f37951c495a901da6898fccbd))

## [0.0.3](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/compare/v0.0.2...v0.0.3) (2024-08-13)

### Documentation

* docs: remove dev note ([affd97ce41f4a0a6d335f003d15d513e09480f92](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/affd97ce41f4a0a6d335f003d15d513e09480f92))

## [0.0.2](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/compare/e9a92f3001fe33df9bdad537b68f999b9e93e805...v0.0.2) (2024-08-12)

### Bug Fixes

* fix: use plain glob export, as otherwise enums cannot be imported ([663cbaa7789878b0db1c7936bf88d1627d4dddad](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/663cbaa7789878b0db1c7936bf88d1627d4dddad))

### Documentation

* docs: add badges, note and formatting to readme ([df6461a8902c8aa6592d77203ad5a844d84d44e1](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/df6461a8902c8aa6592d77203ad5a844d84d44e1))
* docs: add contributing guidelines ([3816787fbee8c7e8d686c8b37587e4c75f93b782](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/3816787fbee8c7e8d686c8b37587e4c75f93b782))
* docs: adjust naming ([ff8d0bd2c53e86ea20799d1d871aeaae1d61ca9d](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/ff8d0bd2c53e86ea20799d1d871aeaae1d61ca9d))
* docs: update readme ([487c39f4b99a7426a52c7e45471f87503986925a](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/487c39f4b99a7426a52c7e45471f87503986925a))
* docs: update readme ([baa39d1afa94d9ab807324d9466921d1bcf56538](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/baa39d1afa94d9ab807324d9466921d1bcf56538))
* docs: update readme ([f3adc58a9b39a4170f4c686dde07bfc1c5dcb6b0](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/f3adc58a9b39a4170f4c686dde07bfc1c5dcb6b0))
* docs: update readme ([4d596a66f3007e3d96e0ef39cacd3f278f507fdc](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/4d596a66f3007e3d96e0ef39cacd3f278f507fdc))
* docs: update readme and add sonar and npm badges ([0526b28226d87c19a9b0ea34a2778aba2ace829a](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/0526b28226d87c19a9b0ea34a2778aba2ace829a))
* docs: update readme with build, test, and release instructions ([62a5c25619d74e43145f6c09424afb8b339980d5](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/62a5c25619d74e43145f6c09424afb8b339980d5))

### Features

* feature(api-calls): discriminate between actual api error responses and retrieval errors ([26fa674bc6376351a778e400d01beb936bd719e2](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/26fa674bc6376351a778e400d01beb936bd719e2))
* feat(api-clients): add client for payment execution, payment information and order management ([4434b586c90c90b5acd39e3f96f8532d38a93e8f](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/4434b586c90c90b5acd39e3f96f8532d38a93e8f))
* feat(apple-pay-transformer): add return type to applePayPaymentToMobilePaymentMethodSpecificInput ([de8674f9fa9873e361a97cad5e1a1d83ed6202e3](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/de8674f9fa9873e361a97cad5e1a1d83ed6202e3))
* feature(apple-pay): add models for payloads received from client communication with apple pay ([cd0e7538150c2a7d6bfc5086fff68137c0e085a9](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/cd0e7538150c2a7d6bfc5086fff68137c0e085a9))
* feat(CheckoutsResponse): all fields are required ([adc1fb4908a6efeb48d466a755ca39cd023d2c69](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/adc1fb4908a6efeb48d466a755ca39cd023d2c69))
* feat(commerce-case-client): use TypeError for missing arguments, handle void responses ([d815f275533559718e3add72a008af350c929290](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/d815f275533559718e3add72a008af350c929290))
* feature(models): convert models to be only types ([ec7fecfad118a413b1aba8d1ba2ae953c9d818cd](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/ec7fecfad118a413b1aba8d1ba2ae953c9d818cd))
* feat(order-model): references could be empty when send as response ([1dd2d51f398e528f65944faed04a1e98a8de16b2](https://github.com/PAYONE-GmbH/PCP-server-nodeJS-SDK/commit/1dd2d51f398e528f65944faed04a1e98a8de16b2))

