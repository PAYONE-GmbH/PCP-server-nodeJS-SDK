# Modular Express example

The example app uses Express 5 and TypeScript to run an HTTP backend for testing
client SDKs against PAYONE Preprod.
All 30 server-SDK operations are exposed. API credentials stay on the server, and
every request uses the merchant configured in `MERCHANT_ID`.

## Structure

```text
src/
  server.ts              Environment, startup, and shutdown
  config.ts              Environment validation and defaults
  app.ts                 Express application factory
  sdk.ts                 Shared SDK client construction
  routes/                One router per SDK area
    index.ts             API composition and route discovery
    router.ts            Registration, response handling, and 405 fallback
  middleware/            JSON/ID validation, masked logs, and error handling
  helpers/queries.ts     HTTP query adapters for the SDK query classes
public/
  index.html             Browser interface
  ui/                    Styles and native JavaScript modules
tests/                   Mock-PAYONE integration and browser workflow tests
HTTP_CLIENT.md           SDK HTTP-client configuration recipes
```

`createApp({ configuration, merchantId, ... })` returns an Express application
without reading environment variables or opening a port. SDK clients are created
once per app and passed explicitly to the resource routers. The routers call the
SDK directly; request bodies use the corresponding SDK model types, while PAYONE
validates their fields.

To add an endpoint, open its resource router and register a method, path, and async
SDK call with `add(...)`. Paths are relative to `/api`. The small registration helper
adds ID/body validation, converts undefined results to 204, and records the endpoint
for discovery. Express handles path matching and asynchronous error propagation.
For a new resource, include its router factory in `routes/index.ts` as well.
Route discovery and the browser explorer then include the endpoint automatically.
Extend `tests/app.test.ts` to verify the signed upstream request.

The standalone authentication and commerce-case demos are consolidated into the
browser workflows. HTTP customization examples are now [documented recipes](HTTP_CLIENT.md).

## Start

Requires Node.js 20.6+ and npm. From the repository root:

```sh
npm install
npm run build
npm --prefix example-app install
cp example-app/.env.example example-app/.env
```

Enter your Preprod credentials in `example-app/.env`, then run:

```sh
npm --prefix example-app run dev
```

If `.env` already exists, edit it instead of copying over it. Only `API_KEY`,
`API_SECRET`, and `MERCHANT_ID` are required. Existing `COMMERCE_CASE_ID` and
`CHECKOUT_ID` variables are optional and prefill the browser UI. API requests use
IDs from HTTP paths.

| Variable | Default | Purpose |
| --- | --- | --- |
| `API_HOST` | `https://api.preprod.commerce.payone.com` | PAYONE API base URL |
| `HOST` | `0.0.0.0` | Listen on all network interfaces |
| `PORT` | `3000` | HTTP port |
| `CORS_ORIGIN` | `*` | Allowed browser origin (or one exact origin) |

`npm --prefix example-app start` uses environment variables supplied by the shell
without loading `.env`. Rebuild the root SDK after changing its source code.

## Browser interface

Open **http://localhost:3000/** after starting the backend (or use the LAN address
below). The page provides these SDK demos as clickable actions:

- Retrieve an authentication token.
- Create a commerce case with an empty request object.
- List commerce cases with the original `offset=2&size=1` query.
- Retrieve a commerce case by ID.
- Update the billing-address city (default `New York`), fetching the existing
  customer first and preserving its other fields.

Enter the commerce-case ID in **Ressourcen-IDs**. IDs returned at the top level of
successful responses automatically populate the corresponding fields. Optional
`COMMERCE_CASE_ID` and `CHECKOUT_ID` environment variables provide initial values.
For custom payloads, use the **API-Explorer**: select any of the 30 operations,
fill in its resource IDs, query parameters and JSON body, then send the request.
All actions run against the configured PAYONE environment.

The page displays the last 20 requests and responses, including HTTP status,
headers, body, duration and response `X-Request-ID`. A city update produces two
entries (GET, then PATCH). Tokens are visible in the UI; server logs remain masked.
History is kept in page memory and cleared on reload or with **Leeren**.
The JSON route listing remains available at `/api`.

## Connect a client

- Browser or iOS Simulator on this Mac: `http://localhost:3000`
- Android Emulator: `http://10.0.2.2:3000`
- Physical device on the same network: `http://<Mac-LAN-IP>:3000`

Allow inbound connections to the configured port if the macOS firewall asks.
Native test apps must allow local plain-HTTP connections in their development
network configuration. These URLs are for your app's backend requests; PAYONE URLs
returned by the API continue to be used by the payment client SDK itself.

## Requests

```sh
# Health and machine-readable route list (no PAYONE call)
curl http://localhost:3000/health
curl http://localhost:3000/api

# Authentication token (entire AuthenticationToken JSON response)
curl -X POST http://localhost:3000/api/authentication-tokens

# Create a commerce case; use its returned commerceCaseId in subsequent paths
curl -X POST http://localhost:3000/api/commerce-cases \
  -H 'Content-Type: application/json' \
  -d '{"merchantReference":"client-sdk-test"}'

# Fetch an existing checkout
curl http://localhost:3000/api/commerce-cases/CASE_ID/checkouts/CHECKOUT_ID

# Filter and paginate
curl 'http://localhost:3000/api/checkouts?offset=0&size=10'
```

Request bodies are the corresponding server-SDK request models, passed directly
as JSON objects, without a `payload` wrapper. PAYONE validates model fields.
An empty body is treated as `{}`. Maximum body size is 1 MiB.
List filters use PAYONE query names; array filters are comma-separated, for example
`includeCheckoutStatus=CREATED,PENDING_COMPLETION`. Each query key is single-valued.
An optional `X-Request-ID` header is forwarded for authentication-token requests.

## Routes

All paths below start with `/api`. Abbreviations:

- `CC` = `/commerce-cases/:commerceCaseId`
- `CO` = `CC/checkouts/:checkoutId`
- `PE` = `CO/payment-executions/:paymentExecutionId`

| Method | Path | SDK operation |
| --- | --- | --- |
| POST | `/authentication-tokens` | getAuthenticationTokens |
| POST | `/commerce-cases` | createCommerceCaseRequest |
| GET | `/commerce-cases` | getCommerceCasesRequest |
| GET | `CC` | getCommerceCaseRequest |
| PATCH | `CC` | updateCommerceCaseRequest |
| POST | `CC/checkouts` | createCheckoutRequest |
| GET | `/checkouts` | getCheckoutsRequest |
| GET | `CO` | getCheckoutRequest |
| PATCH | `CO` | updateCheckoutRequest |
| DELETE | `CO` | removeCheckoutRequest |
| POST | `CO/complete-order` | completeCheckoutRequest |
| POST | `CO/order` | createOrder |
| POST | `CO/deliver` | deliverOrder |
| POST | `CO/return` | returnOrder |
| POST | `CO/cancel` | cancelOrder |
| POST | `CO/payment-executions` | createPayment |
| POST | `PE/capture` | capturePayment |
| POST | `PE/cancel` | cancelPayment |
| POST | `PE/refund` | refundPayment |
| POST | `PE/complete` | completePayment |
| POST | `PE/pause` | pausePayment |
| POST | `PE/refresh` | refreshPayment |
| POST | `PE/events/:eventId/fund-splits` | createFundSplit |
| POST | `CO/payment-information` | createPaymentInformation |
| GET | `CO/payment-information/:paymentInformationId` | getPaymentInformation |
| POST | `CO/payment-information/:paymentInformationId/refund` | refundPaymentInformation |
| POST | `CO/pay-by-link` | createPayByLink |
| POST | `/payment-intents` | createPaymentIntent |
| GET | `/payment-intents/:paymentIntentId` | getPaymentIntent |
| PATCH | `/payment-intents/:paymentIntentId` | patchPaymentIntent |

Successful calls return the SDK response JSON with status 200. Void operations
(commerce-case/checkout updates and checkout removal) return 204 without a body.
PAYONE errors retain their HTTP status and JSON body. Connection failures return
502. Invalid JSON, unknown routes and unsupported methods return 400, 404 and 405.

## Request and response logs

The server writes structured JSON logs to stdout for each incoming HTTP request
and outgoing response, including headers, JSON bodies, method, URL, response
status and duration in milliseconds. Both entries share a `requestId`, which is
also returned in the `X-Request-ID` response header. Supply `X-Request-ID` to use
your own correlation ID. Aborted responses are logged as `response-aborted`.

Sensitive fields (including authorization, cookies, API keys, secrets, tokens,
card data and IBANs) are masked recursively in logs. Sensitive query parameters
are masked too. Bodies exceeding 16 KiB and non-JSON bodies are omitted from logs.
Masking affects logs only; HTTP request and response data is preserved.

## Verify

From the repository root:

```sh
npm run build
npm --prefix example-app run typecheck
npm test -- --run example-app/tests
npx biome check example-app
```

The integration tests use a local mock PAYONE server and need no API credentials.
