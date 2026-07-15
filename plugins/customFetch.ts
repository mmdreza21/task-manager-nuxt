export default defineNuxtPlugin({
  // Use the 'Authorization' cookie
  parallel: true,
  setup(nuxtApp) {
    const token = useCookie("Authorization");

    const config = useRuntimeConfig();

    // Create a custom fetch instance
    const customFetch = $fetch.create({
      // baseURL: "https://api.cycfx.com/api",
      baseURL: `${config.public.BASEURL}/api`,
      onRequest({ options }) {
        // Set authorization header if the token is available
        if (token.value) {
          options.headers = {
            ...options.headers,
            //@ts-ignore
            Authorization: `${token.value}` || "mamad",
          };
        } else {
          options.headers = {
            ...options.headers,
            //@ts-ignore
            mmd: "sad", // Default header if no token is present
          };
        }
      },

      onResponse({ response }) {
        // You can manipulate the response if needed
        // Example: response._data = new myBusinessResponse(response._data)
      },

      onResponseError({ response }) {
        // Handle response errors
        throw new Error(response._data.message as string);
      },
    });

    // Expose customFetch to the app
    return {
      provide: {
        customFetch,
      },
    };
  },
});
