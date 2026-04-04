"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

const AuthContext = createContext(null);

function setCookie(name, value, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ks_user");
      const stored = raw ? JSON.parse(raw) : null;
      if (!stored || !localStorage.getItem("ks_token")) {
        setLoading(false);
        return;
      }
      setUser(stored);
      api.get("/api/auth/me")
        .then((fresh) => {
          setUser(fresh);
          localStorage.setItem("ks_user", JSON.stringify(fresh));
        })
        .catch(() => {
          localStorage.removeItem("ks_token");
          localStorage.removeItem("ks_user");
          deleteCookie("ks_token");
          deleteCookie("ks_role");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } catch {
      setLoading(false);
    }
  }, []);

  const login = useCallback((token, userData) => {
    localStorage.setItem("ks_token", token);
    localStorage.setItem("ks_user", JSON.stringify(userData));
    setCookie("ks_token", token);
    setCookie("ks_role", userData.role);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("ks_token");
    localStorage.removeItem("ks_user");
    deleteCookie("ks_token");
    deleteCookie("ks_role");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
