import { ParkingLotCard } from "./ParkingLotCard";
import { ParkingLot } from "../types";

interface ParkingLotListProps {
  parkingLots: ParkingLot[];
  onSelectParkingLot: (id: string) => void;
}

export function ParkingLotList({ parkingLots, onSelectParkingLot }: ParkingLotListProps) {
  const connectedLots = parkingLots.filter(lot => lot.status === 'connected');
  const warningLots = parkingLots.filter(lot => lot.status === 'warning');
  const disconnectedLots = parkingLots.filter(lot => lot.status === 'disconnected');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-center">
            <div className="text-2xl font-semibold text-green-700">{connectedLots.length}</div>
            <div className="text-sm text-green-600">Conectados</div>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="text-center">
            <div className="text-2xl font-semibold text-yellow-700">{warningLots.length}</div>
            <div className="text-sm text-yellow-600">Com problemas</div>
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="text-center">
            <div className="text-2xl font-semibold text-red-700">{disconnectedLots.length}</div>
            <div className="text-sm text-red-600">Desconectados</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {parkingLots.map((parkingLot) => (
          <ParkingLotCard
            key={parkingLot.id}
            parkingLot={parkingLot}
            onSelect={onSelectParkingLot}
          />
        ))}
      </div>
    </div>
  );
}