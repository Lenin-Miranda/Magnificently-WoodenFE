export interface User {
  id: number;
  username: string;
  email: string;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  role?: "staff" | "user" | "superuser";
  created_at: string;
  updated_at: string;
}

export interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  refreshUser: () => Promise<void>;
}
