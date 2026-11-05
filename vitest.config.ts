import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^pcp-server-nodejs-sdk$/,
        replacement: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      },
    ],
  },
  test: {
    coverage: {
      provider: 'v8',
      include: ['src'],
      exclude: [
        'src/models',
        '**/*index.ts',
        // directly taken from vitest defaults
        // see: https://vitest.dev/config/#coverage-exclude
        'test?(s)/**',
        'test?(-*).?(c|m)[jt]s?(x)',
        '**/*{.,-}{test,spec,bench,benchmark}?(-d).?(c|m)[jt]s?(x)',
      ],
      reporter: ['text', 'lcov'],
    },
  },
});
