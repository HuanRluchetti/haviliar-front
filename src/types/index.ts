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
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthDate: string;
  address: {
    street: string;
    cep: string;
    city: string;
    state: string;
    neighborhood: string;
    complement?: string;
  };
  createdAt: string;
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

export interface LoginData {
  email: string;
  password: string;
}
