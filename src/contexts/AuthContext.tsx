import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService, LoginCredentials, SignupCredentials } from "@/services";
import { Permission } from "@/types/rbac";

interface User {
  id: string;
  email: string;
  name?: string;
  permissions: Permission[]; // Array of "feature:action" strings from backend
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  userEmail: string | null;
  userName: string | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already authenticated
    const isAuth = authService.isAuthenticated();
    const currentUser = authService.getCurrentUser();
    
    if (isAuth && currentUser) {
      const userData: User = {
        id: currentUser.id,
        email: currentUser.email,
        name: currentUser.name,
        permissions: currentUser.permissions || []
      };
      
      setIsAuthenticated(true);
      setUser(userData);
      setUserEmail(currentUser.email);
      setUserName(currentUser.name || null);
    }
  }, []);

  const login = async (email: string, password: string, rememberMe?: boolean): Promise<boolean> => {
    try {
      const credentials: LoginCredentials = { email, password, rememberMe };
      const response = await authService.login(credentials);
      
      const userData: User = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        permissions: response.user.permissions || []
      };
      
      setIsAuthenticated(true);
      setUser(userData);
      setUserEmail(response.user.email);
      setUserName(response.user.name || null);
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const signup = async (email: string, password: string): Promise<boolean> => {
    try {
      const credentials: SignupCredentials = { email, password };
      const response = await authService.signup(credentials);
      
      const userData: User = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        permissions: response.user.permissions || []
      };
      
      setIsAuthenticated(true);
      setUser(userData);
      setUserEmail(response.user.email);
      setUserName(response.user.name || null);
      
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setUser(null);
      setUserEmail(null);
      setUserName(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, userEmail, userName, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
