"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { UserContextType } from "../interfaces/user";
const LoginContext = createContext<UserContextType | undefined>(undefined);

export function LoginProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserContextType["user"]>(null);

  // Recuperar usuario del localStorage al cargar
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // TODO: Implementar autenticación real con API
      // Por ahora, simulamos un login exitoso
      const mockUser = {
        id: 1,
        name: "Usuario Demo",
        email: email,
        password: "", // No almacenar password en estado
        role: "user" as const,
      };
      setUser(mockUser);
      // Opcional: guardar en localStorage para persistencia
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // TODO: Implementar registro real con API
      // Por ahora, simulamos un registro exitoso
      const newUser = {
        id: Date.now(), // ID temporal
        name,
        email,
        password: "", // No almacenar password en estado
        role: "user" as const,
      };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (error) {
      console.error("Error en registro:", error);
      throw error;
    }
  };

  return (
    <LoginContext.Provider value={{ user, login, logout, register }}>
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
