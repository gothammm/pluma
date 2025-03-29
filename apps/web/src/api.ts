import {
  useQuery,
  useMutation,
  type UseMutationOptions,
} from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

interface UseApiOptions<T> {
  queryKey: string[];
  url: string;
  options?: RequestInit; // Allows passing fetch options like method, body, headers
  select?: (data: any) => T; // Optional: allows transforming the data
  enabled?: boolean; // Optional: allows disabling the query
}

export const fetchData =
  <T>(url: string, options: RequestInit = {}) =>
  async (): Promise<T> => {
    const res = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        ...options.headers, // Merge any passed headers with default headers
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorBody = await res.json(); // Or res.text(), depending on your API
      throw new Error(errorBody.message || `HTTP error! Status: ${res.status}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
    return res.json();
  };

export function useApi<T = any>({
  queryKey,
  url,
  options = {},
  select,
  enabled = true,
}: UseApiOptions<T>) {
  return useQuery({
    queryKey,
    queryFn: fetchData(url, options),
    select,
    enabled,
  });
}

interface UseApiMutationOptions<TData = unknown, TVariables = unknown> {
  url: string;
  method?: string;
  options?: Omit<RequestInit, "body" | "method">;
  mutationOptions?: Omit<
    UseMutationOptions<TData, Error, TVariables>,
    "mutationFn"
  >;
}

export const mutateData =
  <TData, TVariables>(
    url: string,
    method = "POST",
    options: RequestInit = {},
  ) =>
  async (variables: TVariables): Promise<TData> => {
    const { params, ...body } = variables as TVariables & {
      params?: Record<string, string>;
    };
    const urlWithParams = Object.keys(params || {}).reduce((acc, key) => {
      if (params == null) {
        return acc;
      }
      return acc.replace(`:${key}`, params[key]);
    }, url);
    const res = await fetch(`${API_BASE_URL}${urlWithParams}`, {
      ...options,
      method,
      body: JSON.stringify(body),
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(errorBody.message || `HTTP error! Status: ${res.status}`);
    }
    if (res.status === 204) {
      return {} as TData;
    }

    return res.json();
  };

export function useApiMutation<TData = unknown, TVariables = unknown>({
  url,
  method = "POST",
  options = {},
  mutationOptions = {},
}: UseApiMutationOptions<TData, TVariables> & { params?: TVariables }) {
  return useMutation({
    mutationFn: mutateData<TData, TVariables>(url, method, options),
    ...mutationOptions,
  });
}
