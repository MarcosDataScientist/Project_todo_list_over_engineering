export const TOKEN_KEY = "todo_access_token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

// export function apiBase(): string {
//   return import.meta.env.VITE_API_BASE_URL || "";
// }

export function apiBase(): string {
  return "";
}

export function authHeaders(json = true): HeadersInit {
  const headers: Record<string, string> = {};
  if (json) {
    headers["Content-Type"] = "application/json";
  }
  const t = getToken();
  if (t) {
    headers["Authorization"] = `Bearer ${t}`;
  }
  return headers;
}
