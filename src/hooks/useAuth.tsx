import React from "react";
import cookies from "js-cookie";
import { registerUser } from "@/services/user/register";
import { authenticate } from "@/services/auth/authenticate";

import { User, RegisterData, AuthenticateLoginData } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: AuthenticateLoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLogged, setIsLogged] = React.useState(false);

  React.useEffect(() => {
    const token = cookies.get("token");

    if (token) {
      setIsLogged(true);
    }
  }, []);

  const login = async (data: AuthenticateLoginData) => {
    setIsLoading(true);

    try {
      await authenticate(data);
    } catch (error) {
      throw error;
    } finally {
      // const logedUser: User = {
      //   email: data.email,
      //   document: "0",
      //   userAddressRequest: {
      //     city: "0",
      //     state: "0",
      //     neighborhood: "0",
      //     zipCode: "0",
      //     street: "0",
      //     number: "0",
      //     complement: "0",
      //   },
      //   phone: "0".replace(/\D/g, ""),
      //   userName: data.email,
      //   password: data.senha,
      //   dateOfBirth: "0",
      //   userType: "Admin",
      // };

      // setUser(logedUser);
      setIsLoading(false);
      setIsLogged(true);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);

    try {
      const requiredFields: (keyof RegisterData)[] = [
        "name",
        "email",
        "password",
        "cpf",
        "phone",
        "birthDate",
        "confirmPassword",
        "address",
      ];

      const todosPreenchidos = requiredFields.every((key) => {
        const value = data[key];
        return typeof value === "string" && value.trim().length > 0;
      });

      if (todosPreenchidos) {
        throw new Error("Por favor, preencha todos os campos.");
      }

      const newUser: User = {
        email: data.email,
        document: data.cpf,
        userAddressRequest: {
          city: data.address.city,
          state: data.address.state,
          neighborhood: data.address.neighborhood,
          zipCode: data.address.cep,
          street: data.address.street,
          number: "0",
          complement: data.address.complement,
        },
        phone: data.phone.replace(/\D/g, ""),
        userName: data.name,
        password: data.password,
        dateOfBirth: data.birthDate,
        userType: "Admin",
      };

      await registerUser(newUser);
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
    isAuthenticated: isLogged,
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
