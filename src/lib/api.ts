import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  if (!API_URL) {
    throw new Error("Backend API URL is missing");
  }

  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("Please sign in to continue.");
  }

  const headers = new Headers(options.headers);

  headers.set("Authorization", `Bearer ${data.token}`);

  if (
    options.body &&
    !(options.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(
    `${API_URL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`,
    {
      ...options,
      headers,
      cache: "no-store",
    },
  );

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message || "Something went wrong.");
  }

  return result as T;
}
