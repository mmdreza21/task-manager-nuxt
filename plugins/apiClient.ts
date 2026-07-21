// plugins/$apiClient.ts
import type { $Fetch } from 'ofetch';

export default defineNuxtPlugin({
  parallel: true,
  setup(nuxtApp) {
    const token = useCookie("Authorization");
    const config = useRuntimeConfig();

    // Create a custom fetch instance
    const apiClient = $fetch.create({
      baseURL: `${config.public.BASEURL}/api`,
      onRequest({ options }) {
        // Set authorization header if the token is available
        const headers: Record<string, string> = {
          //@ts-ignore
          ...options.headers as Record<string, string>,
        };

        if (token.value) {
          headers.Authorization = token.value;
        }
        //@ts-ignore

        options.headers = headers;
      },

      onResponse({ response }) {
        // You can manipulate the response if needed
        // Example: response._data = new myBusinessResponse(response._data)
      },

      onResponseError({ response }) {
        // Handle response errors
        const message = (response._data as any)?.message || 'An error occurred';
        throw new Error(message);
      },
    });

    // Expose $apiClient to the app
    return {
      provide: {
        apiClient, // Provide as apiClient, not $apiClient
      },
    };
  },
});