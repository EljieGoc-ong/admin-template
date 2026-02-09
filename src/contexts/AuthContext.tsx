import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      const { email } = JSON.parse(stored);
      setIsAuthenticated(true);
      setUserEmail(email);
    }
  }, []);

  const login = (email: string, _password: string) => {
    localStorage.setItem("auth", JSON.stringify({ email }));
    setIsAuthenticated(true);
    setUserEmail(email);
    return true;
  };

  const signup = (email: string, _password: string) => {
    localStorage.setItem("auth", JSON.stringify({ email }));
    setIsAuthenticated(true);
    setUserEmail(email);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
