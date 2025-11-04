import React from "react";
import { User, RegisterData, LoginData } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // Verificar se há usuário logado no localStorage ao inicializar
  React.useEffect(() => {
    const savedUser = localStorage.getItem("parkcontrol_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem("parkcontrol_user");
      }
    }
  }, []);

  const login = async (data: LoginData) => {
    setIsLoading(true);

    try {
      // Simular chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Verificar credenciais (mock)
      const savedUsers = JSON.parse(
        localStorage.getItem("parkcontrol_users") || "[]"
      );
      const existingUser = savedUsers.find((u: User) => u.email === data.email);

      if (!existingUser) {
        throw new Error("Usuário não encontrado");
      }

      // Em um cenário real, verificaria a senha hasheada
      const savedPassword = localStorage.getItem(
        `parkcontrol_password_${existingUser.id}`
      );
      if (savedPassword !== data.password) {
        throw new Error("Senha incorreta");
      }

      setUser(existingUser);
      localStorage.setItem("parkcontrol_user", JSON.stringify(existingUser));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);

    try {
      // Simular chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Verificar se email já existe
      const savedUsers = JSON.parse(
        localStorage.getItem("parkcontrol_users") || "[]"
      );
      const emailExists = savedUsers.some((u: User) => u.email === data.email);

      if (emailExists) {
        throw new Error("E-mail já está em uso");
      }

      // Verificar se CPF já existe
      const cpfExists = savedUsers.some((u: User) => u.cpf === data.cpf);

      if (cpfExists) {
        throw new Error("CPF já está cadastrado");
      }

      // Criar novo usuário
      const newUser: User = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        phone: data.phone,
        birthDate: data.birthDate,
        address: data.address,
        createdAt: new Date().toISOString(),
      };

      // Salvar usuário
      const updatedUsers = [...savedUsers, newUser];
      localStorage.setItem("parkcontrol_users", JSON.stringify(updatedUsers));
      localStorage.setItem(`parkcontrol_password_${newUser.id}`, data.password);

      setUser(newUser);
      localStorage.setItem("parkcontrol_user", JSON.stringify(newUser));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("parkcontrol_user");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
