export default defineEventHandler(async (event) => {
  // const { $apiClient } = useNuxtApp();
  try {
    return sendRedirect(event, "/", 301);
  } catch (error) {
    throw createError({
      statusCode: 500,
      cause: "dono",
    });
  }
});
