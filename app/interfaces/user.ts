export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

export interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}
