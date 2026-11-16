export interface AppConfig {
  apiKey: string;
  apiSecret: string;
  apiHost: string;
  merchantId: string;
  host: string;
  port: number;
  corsOrigin: string;
  uiDefaults: { commerceCaseId?: string; checkoutId?: string };
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const { API_KEY: apiKey, API_SECRET: apiSecret, MERCHANT_ID: merchantId } = env;
  if (!apiKey || !apiSecret || !merchantId) {
    throw new Error('Please provide API_KEY, API_SECRET, and MERCHANT_ID as environment variables');
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(merchantId)) {
    throw new Error('MERCHANT_ID must contain only letters, numbers, underscores and hyphens');
  }
  const port = Number(env.PORT ?? 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535');
  }
  return {
    apiKey,
    apiSecret,
    merchantId,
    apiHost: env.API_HOST ?? 'https://api.preprod.commerce.payone.com',
    host: env.HOST ?? '0.0.0.0',
    port,
    corsOrigin: env.CORS_ORIGIN ?? '*',
    uiDefaults: { commerceCaseId: env.COMMERCE_CASE_ID, checkoutId: env.CHECKOUT_ID },
  };
}
