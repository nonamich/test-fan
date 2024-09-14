import { QueryClient } from '@tanstack/react-query';

import { client } from '@/api/services.gen';

client.setConfig({
  baseURL: process.env.REACT_APP_API_ORIGIN,
});

export const queryClient = new QueryClient();
