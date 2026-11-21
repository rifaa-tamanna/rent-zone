import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface ApiFetchOptions extends RequestInit {
  requireAuth?: boolean;
}

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const { requireAuth = false, headers: customHeaders, ...restOptions } = options;

  const headers = new Headers(customHeaders);

  try {
    const { data } = await authClient.token();
    if (data?.token) {
      headers.set("Authorization", `Bearer ${data.token}`);
    } else if (requireAuth) {
      throw new Error("Please sign in to continue.");
    }
  } catch (err) {
    if (requireAuth) {
      throw err instanceof Error ? err : new Error("Please sign in to continue.");
    }
  }

  if (
    restOptions.body &&
    !(restOptions.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  const cleanBase = (API_URL || "").replace(/\/+$/, "");
  const cleanPath = path.replace(/^\/+/, "");

  const response = await fetch(`${cleanBase}/${cleanPath}`, {
    ...restOptions,
    headers,
    cache: "no-store",
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message || "Something went wrong.");
  }

  return result as T;
}
