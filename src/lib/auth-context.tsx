"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { apiFetch, setToken, clearToken } from "./api";

interface User {
  id: number;
  username: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("slime_token") : null;
    if (!token) {
      setLoading(false);
      return;
    }
    apiFetch<{ authenticated: boolean; user: User | null }>("/api/slime")
      .then((d) => {
        if (d.authenticated) setUser(d.user);
      })
      .catch(() => clearToken())
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const data = await apiFetch<{ id: number; username: string; token: string }>(
      "/api/auth/login",
      { method: "POST", body: JSON.stringify({ username, password }) }
    );
    setToken(data.token);
    setUser({ id: data.id, username: data.username });
  }, []);

  const register = useCallback(async (username: string, password: string) => {
    const data = await apiFetch<{ id: number; username: string; token: string }>(
      "/api/auth/register",
      { method: "POST", body: JSON.stringify({ username, password }) }
    );
    setToken(data.token);
    setUser({ id: data.id, username: data.username });
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
