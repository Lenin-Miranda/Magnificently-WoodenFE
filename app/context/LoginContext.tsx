"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  loginRequest,
  registerRequest,
  logoutRequest,
  getUserRequest,
} from "../lib/authApi";
import { UserContextType } from "../interfaces/user";

const LoginContext = createContext<UserContextType | undefined>(undefined);

export function LoginProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserContextType["user"]>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar si hay sesión activa al cargar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getUserRequest();
        setUser(userData);
      } catch (error) {
        console.error("No active session:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await loginRequest(email, password);

      // Obtener el usuario inmediatamente después del login
      const userInfo = await getUserRequest();
      setUser(userInfo);
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      setUser(null);
    } catch (error) {
      console.error("Error en logout:", error);
      setUser(null);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const userData = await registerRequest(name, email, password);
      setUser(userData);
    } catch (error) {
      console.error("Error en registro:", error);
      throw error;
    }
  };

  return (
    <LoginContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </LoginContext.Provider>
  );
}

export function useLogin() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
}
