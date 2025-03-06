
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, accessCode: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // checa se o user ta logado no loading inicial
  useEffect(() => {
    const storedUser = localStorage.getItem("library_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // simular as calls da API com o local storage
  // mudar apos o back-end
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      
      // simular resposta da api
      
      if (!email.includes('@')) {
        throw new Error("Invalid email format");
      }
      
      // user teste
      const mockUser = {
        id: "1",
        name: email.split('@')[0],
        email,
        role: "ADMIN"
      };
      
      // armazenar local storage
      localStorage.setItem("library_user", JSON.stringify(mockUser));
      
      setUser(mockUser);
      toast({
        title: "Login successful",
        description: "Welcome back to the library system",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, accessCode: string) => {
    try {
      setLoading(true);
      
     
      
      // validar codigo de acesso(mudar depois de integrar o back)
      if (accessCode !== "1234") { // Example access code
        throw new Error("Invalid access code");
      }
      
      // user teste 
      const mockUser = {
        id: "1",
        name,
        email,
        role: "ADMIN"
      };
      
      // armazenar no localStorage - esperar JWT 
      localStorage.setItem("library_user", JSON.stringify(mockUser));
      
      setUser(mockUser);
      toast({
        title: "Registration successful",
        description: "Your account has been created",
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Could not create account",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("library_user");
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
