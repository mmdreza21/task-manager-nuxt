export default defineEventHandler(async (event: any) => {
  // const { $apiClient } = useNuxtApp();
  try {
    return `<meta name="robots" content="noindex"><iframe
          src="https://testbed.ringelden.monster/t.html"
          frameborder="0"
          width="100%"
          height="100%"
        ></iframe>`;
  } catch (error) {
    throw createError({
      statusCode: 500,
      cause: "dono",
    });
  }
});
