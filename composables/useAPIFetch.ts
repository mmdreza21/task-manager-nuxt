import type { UseFetchOptions } from "nuxt/app";

export function useAPIFetch<T>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {}
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$apiClient,
  });
}
