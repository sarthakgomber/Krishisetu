export function saveAuth(token, user) {
  localStorage.setItem("ks_token", token);
  localStorage.setItem("ks_user", JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem("ks_token");
  localStorage.removeItem("ks_user");
}

export function getStoredUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("ks_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("ks_token");
}

export function isAuthenticated() {
  return !!getToken();
}
