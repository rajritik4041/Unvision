const TOKEN_COOKIE_KEY = "token";
const DEFAULT_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export function setAuthTokenCookie(
  token: string,
  maxAgeSeconds: number = DEFAULT_MAX_AGE_SECONDS
) {
  if (typeof document === "undefined") return;
  const normalizedToken = token?.trim();
  if (!normalizedToken) return;

  document.cookie = `${TOKEN_COOKIE_KEY}=${encodeURIComponent(
    normalizedToken
  )}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
}

export function clearAuthTokenCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${TOKEN_COOKIE_KEY}=; path=/; max-age=0; samesite=lax`;
}
