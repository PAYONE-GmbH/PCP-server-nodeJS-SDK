# Configuring the SDK HTTP client

The Express app constructs its clients in `src/sdk.ts`. Customize the shared
`CommunicatorConfiguration` in `src/server.ts`, or configure an individual client
in `src/sdk.ts` using `setFetchOptions`. These recipes use ESM imports, like the app.

## Shared headers and client-specific overrides

```ts
import { CommerceCaseApiClient, CommunicatorConfiguration } from 'pcp-server-nodejs-sdk';

const configuration = new CommunicatorConfiguration(apiKey, apiSecret, apiHost, {
  headers: {
    'User-Agent': 'MyExample/1.0',
    'X-Environment': 'preprod',
  },
});

const client = new CommerceCaseApiClient(configuration);
client.setFetchOptions({
  headers: { 'X-Client-Version': '1.0' },
});
```

`apiKey`, `apiSecret`, and `apiHost` above are values returned by `loadConfig()`.
Client-specific options override the corresponding shared settings; headers are
merged by the SDK.

## Per-request timeout

An `AbortSignal` expires once and stays aborted. Create a fresh signal immediately
before each request instead of storing one in the app's shared configuration.
Use a request-scoped SDK client so concurrent Express requests cannot overwrite
each other's options:

```ts
const client = new CommerceCaseApiClient(configuration);
client.setFetchOptions({ signal: AbortSignal.timeout(30_000) });
const commerceCase = await client.getCommerceCaseRequest(merchantId, commerceCaseId);
```

## HTTPS proxy

Install `https-proxy-agent` in `example-app` if you need proxy support:

```sh
npm --prefix example-app install https-proxy-agent
```

```ts
import { HttpsProxyAgent } from 'https-proxy-agent';
import { CommunicatorConfiguration } from 'pcp-server-nodejs-sdk';

const agent = new HttpsProxyAgent(proxyUrl);
const configuration = new CommunicatorConfiguration(apiKey, apiSecret, apiHost, { agent });
```

Set `proxyUrl` from your environment. Reuse the agent across clients; destroy it
when the server shuts down.

## TLS and connection pooling

```ts
import { Agent } from 'node:https';
import { CommunicatorConfiguration } from 'pcp-server-nodejs-sdk';

const agent = new Agent({
  keepAlive: true,
  maxSockets: 50,
  rejectUnauthorized: true,
  // ca: customCertificateAuthority,
});
const configuration = new CommunicatorConfiguration(apiKey, apiSecret, apiHost, { agent });
```

The SDK uses `node-fetch`, whose `agent` option accepts Node HTTPS agents. Use
`ca`, `cert`, and `key` options if your environment requires custom certificates.
Destroy a custom agent during shutdown.

## Request correlation and logging

The Express `requestLogger` middleware logs sanitized request/response data and
returns `X-Request-ID` to the caller. The authentication router forwards a supplied
ID through the SDK's per-request argument:

```ts
await clients.authentication.getAuthenticationTokens(merchantId, request.get('X-Request-ID'));
```

Keep request-specific correlation IDs out of shared client headers: a shared value
would be reused across unrelated requests. See `src/middleware/request-logger.ts`
for the example's logging and masking implementation.
