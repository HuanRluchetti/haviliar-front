"use client";

import { toast } from "sonner";
import React, { useState } from "react";
import { Toaster } from "../components/ui/sonner";
import { LoginForm } from "../components/LoginForm";
import { Dashboard } from "../components/Dashboard";
import { AuthProvider, useAuth } from "../hooks/useAuth";
import { RegisterForm } from "../components/RegisterForm";
import { AuthenticateLoginData, RegisterData } from "../types";

function AuthenticatedApp() {
  const { isAuthenticated, login, register, isLoading } = useAuth();
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const handleLogin = async (data: AuthenticateLoginData) => {
    try {
      await login(data);
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao fazer login"
      );
    }
  };

  const handleRegister = async (data: RegisterData) => {
    try {
      await register(data);
      toast.success("Conta criada com sucesso!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao criar conta"
      );
    }
  };

  const handleSwitchToLogin = () => {
    setAuthMode("login");
  };

  const handleSwitchToRegister = () => {
    setAuthMode("register");
  };

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <>
      {authMode === "login" ? (
        <LoginForm
          onLogin={handleLogin}
          onSwitchToRegister={handleSwitchToRegister}
          isLoading={isLoading}
        />
      ) : (
        <RegisterForm
          onRegister={handleRegister}
          onSwitchToLogin={handleSwitchToLogin}
          isLoading={isLoading}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AuthenticatedApp />
      <Toaster />
    </AuthProvider>
  );
}
