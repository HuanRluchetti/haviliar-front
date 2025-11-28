export interface ParkingLot {
  id: string;
  name: string;
  address: string;
  status: "connected" | "disconnected" | "warning";
  totalGates: number;
  connectedGates: number;
  lastUpdate: string;
}

export interface Gate {
  id: string;
  name: string;
  status: "connected" | "disconnected" | "maintenance";
  isOpen: boolean;
  lastActivity: string;
  batteryLevel?: number;
}

export type ConnectionStatus =
  | "connected"
  | "disconnected"
  | "warning"
  | "maintenance";

// User related interfaces
export interface User {
  email: string;
  document: string;
  userAddressRequest: {
    city: string;
    state: string;
    neighborhood: string;
    zipCode: string;
    street: string;
    number: string;
    complement?: string;
  };
  phone: string;
  userName: string;
  password: string;
  dateOfBirth: string; // formato yyyy-MM-dd
  userType: "Admin" | "User" | string; // ou ajustar conforme enum real
}

export interface RegisterData {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
  address: {
    street: string;
    cep: string;
    city: string;
    state: string;
    neighborhood: string;
    complement?: string;
  };
}

export type AuthenticateLoginData = {
  email: string;
  senha: string;
};
