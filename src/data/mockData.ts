import { ParkingLot, Gate, CenterResponse } from "../types";
import { getCenter } from "@/services/centers/getCenter";

export const mockParkingLots: ParkingLot[] = [
  {
    id: "1",
    name: "Shopping Center Norte",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    status: "connected",
    totalGates: 6,
    connectedGates: 6,
    lastUpdate: "2025-01-18 14:30:00",
  },
  {
    id: "2",
    name: "Edifício Comercial Alpha",
    address: "Rua Augusta, 500 - São Paulo, SP",
    status: "warning",
    totalGates: 4,
    connectedGates: 3,
    lastUpdate: "2025-01-18 14:25:00",
  },
  {
    id: "3",
    name: "Condomínio Residencial Beta",
    address: "Rua das Flores, 200 - São Paulo, SP",
    status: "disconnected",
    totalGates: 8,
    connectedGates: 0,
    lastUpdate: "2025-01-18 12:15:00",
  },
  {
    id: "4",
    name: "Hospital São Lucas",
    address: "Av. Brasil, 1500 - São Paulo, SP",
    status: "connected",
    totalGates: 3,
    connectedGates: 3,
    lastUpdate: "2025-01-18 14:35:00",
  },
];

export async function fetchParkingLots(): Promise<ParkingLot[]> {
  try {
    const response = (await getCenter()) as CenterResponse;
    const centersList = response?.items || [];

    return centersList.map((center, index) => {
      const mockInfo = mockParkingLots[index];
      const address = mockInfo ? mockInfo.address : "Endereço não cadastrado";

      return {
        id: String(center.operationCenterId),
        name: center.name,
        address: address,
        status: center.isActive ? "connected" : "disconnected",
        totalGates: 1,
        connectedGates: 1,
        lastUpdate: new Date().toISOString().replace("T", " ").substring(0, 19),
      };
    });
  } catch {
    return mockParkingLots;
  }
}

export const parkingList: ParkingLot[] = await fetchParkingLots();

export const mockGates: Record<string, Gate[]> = {
  "1": [
    {
      id: "g1-1",
      name: "Cancela Entrada Principal",
      status: "connected",
      isOpen: false,
      lastActivity: "2025-01-18 14:30:00",
      batteryLevel: 85,
    },
    {
      id: "g1-2",
      name: "Cancela Saída Principal",
      status: "connected",
      isOpen: false,
      lastActivity: "2025-01-18 14:28:00",
      batteryLevel: 90,
    },
    {
      id: "g1-3",
      name: "Cancela Entrada VIP",
      status: "connected",
      isOpen: true,
      lastActivity: "2025-01-18 14:25:00",
      batteryLevel: 78,
    },
    {
      id: "g1-4",
      name: "Cancela Saída VIP",
      status: "connected",
      isOpen: false,
      lastActivity: "2025-01-18 14:20:00",
      batteryLevel: 92,
    },
    {
      id: "g1-5",
      name: "Cancela Emergência",
      status: "connected",
      isOpen: false,
      lastActivity: "2025-01-18 13:45:00",
      batteryLevel: 88,
    },
    {
      id: "g1-6",
      name: "Cancela Funcionários",
      status: "connected",
      isOpen: false,
      lastActivity: "2025-01-18 14:30:00",
      batteryLevel: 75,
    },
  ],
  "2": [
    {
      id: "g2-1",
      name: "Cancela Entrada",
      status: "connected",
      isOpen: false,
      lastActivity: "2025-01-18 14:25:00",
      batteryLevel: 95,
    },
    {
      id: "g2-2",
      name: "Cancela Saída",
      status: "connected",
      isOpen: false,
      lastActivity: "2025-01-18 14:22:00",
      batteryLevel: 87,
    },
    {
      id: "g2-3",
      name: "Cancela Garagem",
      status: "disconnected",
      isOpen: false,
      lastActivity: "2025-01-18 12:30:00",
      batteryLevel: 15,
    },
    {
      id: "g2-4",
      name: "Cancela Visitantes",
      status: "connected",
      isOpen: false,
      lastActivity: "2025-01-18 14:10:00",
      batteryLevel: 82,
    },
  ],
  "3": [
    {
      id: "g3-1",
      name: "Cancela Entrada A",
      status: "disconnected",
      isOpen: false,
      lastActivity: "2025-01-18 10:15:00",
      batteryLevel: 0,
    },
    {
      id: "g3-2",
      name: "Cancela Entrada B",
      status: "disconnected",
      isOpen: false,
      lastActivity: "2025-01-18 10:15:00",
      batteryLevel: 0,
    },
    {
      id: "g3-3",
      name: "Cancela Saída A",
      status: "disconnected",
      isOpen: false,
      lastActivity: "2025-01-18 10:15:00",
      batteryLevel: 0,
    },
    {
      id: "g3-4",
      name: "Cancela Saída B",
      status: "disconnected",
      isOpen: false,
      lastActivity: "2025-01-18 10:15:00",
      batteryLevel: 0,
    },
    {
      id: "g3-5",
      name: "Cancela Garagem 1",
      status: "disconnected",
      isOpen: false,
      lastActivity: "2025-01-18 10:15:00",
      batteryLevel: 0,
    },
    {
      id: "g3-6",
      name: "Cancela Garagem 2",
      status: "disconnected",
      isOpen: false,
      lastActivity: "2025-01-18 10:15:00",
      batteryLevel: 0,
    },
    {
      id: "g3-7",
      name: "Cancela Visitantes",
      status: "disconnected",
      isOpen: false,
      lastActivity: "2025-01-18 10:15:00",
      batteryLevel: 0,
    },
    {
      id: "g3-8",
      name: "Cancela Emergência",
      status: "disconnected",
      isOpen: false,
      lastActivity: "2025-01-18 10:15:00",
      batteryLevel: 0,
    },
  ],
  "4": [
    {
      id: "g4-1",
      name: "Cancela Entrada Ambulância",
      status: "connected",
      isOpen: false,
      lastActivity: "2025-01-18 14:35:00",
      batteryLevel: 98,
    },
    {
      id: "g4-2",
      name: "Cancela Entrada Geral",
      status: "connected",
      isOpen: false,
      lastActivity: "2025-01-18 14:33:00",
      batteryLevel: 94,
    },
    {
      id: "g4-3",
      name: "Cancela Saída",
      status: "maintenance",
      isOpen: false,
      lastActivity: "2025-01-18 14:00:00",
      batteryLevel: 88,
    },
  ],
};
