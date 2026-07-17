export type ApiCallCommon = {
  id: string;
  slug?: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
};

export interface FetchApi<T> {
  error: any;
  pending: Ref<boolean>;
  data: Ref<T | null>;
  refresh: any;
}
