import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-axios',
  input: 'http://localhost:3000/api/v1/swagger.json',
  plugins: ['@tanstack/react-query'],
  output: {
    lint: 'eslint',
    path: 'src/api',
  },
});
