import { CommerceCaseApiClient, CommunicatorConfiguration, FetchOptions } from 'pcp-server-nodejs-sdk';

/**
 * Example demonstrating how to customize HTTP client behavior using fetch options.
 * This replaces the need for a custom fetch function with a simpler, more standard approach.
 */
export class CustomHttpClientExample {
  
  /**
   * Example 1: Configure global timeout and custom headers
   */
  static async globalTimeoutAndHeaders() {
    console.log('=== Example 1: Global Timeout and Headers ===');
    
    const globalFetchOptions: FetchOptions = {
      // Set a 30-second timeout for all requests
      timeout: 30000,
      
      // Add custom headers that will be included in all requests
      headers: {
        'User-Agent': 'MyApp/1.0.0',
        'X-Client-Version': '1.0.0',
        'X-Environment': 'production',
      },
    };

    const config = new CommunicatorConfiguration(
      process.env.API_KEY!,
      process.env.API_SECRET!,
      'https://api.preprod.commerce.payone.com',
      globalFetchOptions
    );

    const commerceCaseClient = new CommerceCaseApiClient(config);
    
    console.log('Configuration created with global timeout and headers');
    console.log('All API calls will include the custom headers and 30s timeout');
  }

  /**
   * Example 2: Configure proxy settings
   */
  static async proxyConfiguration() {
    console.log('=== Example 2: Proxy Configuration ===');
    
    const proxyFetchOptions: FetchOptions = {
      // Configure proxy agent for HTTPS requests
      signal: AbortSignal.timeout(45000),
      
      // Add proxy-related headers if needed
      headers: {
        'Proxy-Authorization': 'Basic ' + Buffer.from('username:password').toString('base64'),
      },
    };

    const config = new CommunicatorConfiguration(
      process.env.API_KEY!,
      process.env.API_SECRET!,
      'https://api.preprod.commerce.payone.com',
      proxyFetchOptions
    );

    const commerceCaseClient = new CommerceCaseApiClient(config);
    
    console.log('Configuration created with proxy settings');
    console.log('All requests will go through the configured proxy');
  }

  /**
   * Example 3: Client-specific customization that overrides global settings
   */
  static async clientSpecificCustomization() {
    console.log('=== Example 3: Client-Specific Customization ===');
    
    // Global configuration with default settings
    const globalFetchOptions: FetchOptions = {
      timeout: 30000,
      headers: {
        'X-Global-Header': 'global-value',
        'X-Shared-Header': 'global-shared',
      },
    };

    const config = new CommunicatorConfiguration(
      process.env.API_KEY!,
      process.env.API_SECRET!,
      'https://api.preprod.commerce.payone.com',
      globalFetchOptions
    );

    // Create client with specific customizations
    const commerceCaseClient = new CommerceCaseApiClient(config);
    
    // Override settings for this specific client
    const clientSpecificOptions: FetchOptions = {
      timeout: 60000, // Longer timeout for this client
      headers: {
        'X-Client-Header': 'client-value',
        'X-Shared-Header': 'client-shared', // This will override the global value
      },
    };
    
    commerceCaseClient.setFetchOptions(clientSpecificOptions);
    
    console.log('Client configured with specific options that override global settings');
    console.log('This client will use 60s timeout and client-specific headers');
  }

  /**
   * Example 4: Timeout with AbortController (modern approach)
   */
  static async modernTimeoutConfiguration() {
    console.log('=== Example 4: Modern Timeout with AbortController ===');
    
    const fetchOptions: FetchOptions = {
      // Use AbortSignal.timeout for modern timeout handling
      signal: AbortSignal.timeout(25000), // 25 second timeout
      
      headers: {
        'X-Timeout-Method': 'AbortSignal',
      },
    };

    const config = new CommunicatorConfiguration(
      process.env.API_KEY!,
      process.env.API_SECRET!,
      'https://api.preprod.commerce.payone.com',
      fetchOptions
    );

    const commerceCaseClient = new CommerceCaseApiClient(config);
    
    console.log('Configuration created with modern AbortSignal timeout');
  }

  /**
   * Example 5: Custom SSL/TLS configuration (Node.js specific)
   */
  static async customSSLConfiguration() {
    console.log('=== Example 5: Custom SSL/TLS Configuration ===');
    
    const https = require('https');
    
    const customAgent = new https.Agent({
      // Custom SSL settings
      rejectUnauthorized: true,
      keepAlive: true,
      keepAliveMsecs: 30000,
      maxSockets: 50,
      
      // Custom certificate handling if needed
      // ca: fs.readFileSync('custom-ca.pem'),
      // cert: fs.readFileSync('client-cert.pem'),
      // key: fs.readFileSync('client-key.pem'),
    });

    const sslFetchOptions: FetchOptions = {
      agent: customAgent,
      timeout: 30000,
      
      headers: {
        'X-SSL-Config': 'custom',
      },
    };

    const config = new CommunicatorConfiguration(
      process.env.API_KEY!,
      process.env.API_SECRET!,
      'https://api.preprod.commerce.payone.com',
      sslFetchOptions
    );

    const commerceCaseClient = new CommerceCaseApiClient(config);
    
    console.log('Configuration created with custom SSL/TLS settings');
  }

  /**
   * Example 6: Logging and debugging configuration
   */
  static async loggingConfiguration() {
    console.log('=== Example 6: Logging Configuration ===');
    
    // Note: For actual request/response logging, you would typically use
    // a logging library or middleware. This example shows how to add
    // debugging headers that can help with tracing.
    
    const debugFetchOptions: FetchOptions = {
      timeout: 30000,
      
      headers: {
        'X-Request-ID': `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        'X-Debug-Mode': 'enabled',
        'X-Trace-Level': 'verbose',
      },
    };

    const config = new CommunicatorConfiguration(
      process.env.API_KEY!,
      process.env.API_SECRET!,
      'https://api.preprod.commerce.payone.com',
      debugFetchOptions
    );

    const commerceCaseClient = new CommerceCaseApiClient(config);
    
    console.log('Configuration created with debugging headers');
    console.log('Each request will include trace headers for debugging');
  }

  /**
   * Run all examples
   */
  static async runAllExamples() {
    console.log('Running Custom HTTP Client Examples...\n');
    
    try {
      await this.globalTimeoutAndHeaders();
      console.log('');
      
      await this.proxyConfiguration();
      console.log('');
      
      await this.clientSpecificCustomization();
      console.log('');
      
      await this.modernTimeoutConfiguration();
      console.log('');
      
      await this.customSSLConfiguration();
      console.log('');
      
      await this.loggingConfiguration();
      console.log('');
      
      console.log('All examples completed successfully!');
    } catch (error) {
      console.error('Error running examples:', error);
    }
  }
}

// Run examples if this file is executed directly
if (require.main === module) {
  CustomHttpClientExample.runAllExamples();
}
