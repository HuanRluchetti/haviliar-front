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
