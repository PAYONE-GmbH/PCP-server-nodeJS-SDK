import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src'],
      exclude: ['src/models', '**/*index.ts', 'src/testutils'],
      reporter: ['text', 'lcov'],
    },
  },
});
