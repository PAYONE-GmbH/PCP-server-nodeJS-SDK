import { CommunicatorConfiguration } from 'pcp-server-nodejs-sdk';
import { CommerceCaseApiExample } from './examples/CommerceCaseApiExample';
import { AuthenticationApiExample } from './examples/AuthenticationApiExample';

const run = async () => {
  const apiKey = process.env.API_KEY;
  const apiSecret = process.env.API_SECRET;
  const merchantId = process.env.MERCHANT_ID;
  const commerceCaseId = process.env.COMMERCE_CASE_ID;
  const checkoutId = process.env.CHECKOUT_ID;
  if (!apiKey || !apiSecret || !merchantId || !commerceCaseId || !checkoutId) {
    console.error(
      'Please provide API_KEY, API_SECRET, MERCHANT_ID, COMMERCE_CASE_ID and CHECKOUT_ID as environment variables',
    );
    process.exit(1);
  }

  const communicatorConfiguration = new CommunicatorConfiguration(
    apiKey,
    apiSecret,
    'https://api.preprod.commerce.payone.com',
  );

  const commerceCaseApiClientExample = new CommerceCaseApiExample(communicatorConfiguration);
  const authenticationApiExample = new AuthenticationApiExample(communicatorConfiguration, merchantId);

  // Demo: Retrieve authentication token for the merchant
  await authenticationApiExample.runGetToken();

  // await commerceCaseApiClientExample.runPostOne();
  await commerceCaseApiClientExample.runGetAll();

  // await commerceCaseApiClientExample.runGetOne();

  // await commerceCaseApiClientExample.runUpdateOne();
};

run();
