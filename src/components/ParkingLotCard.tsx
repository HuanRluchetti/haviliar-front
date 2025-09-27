import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { StatusBadge } from "./StatusBadge";
import { Button } from "./ui/button";
import { ParkingLot } from "../types";
import { MapPin, Clock, Shield } from "lucide-react";

interface ParkingLotCardProps {
  parkingLot: ParkingLot;
  onSelect: (id: string) => void;
}

export function ParkingLotCard({ parkingLot, onSelect }: ParkingLotCardProps) {
  const formatLastUpdate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
  };

  const getConnectionPercentage = () => {
    return Math.round((parkingLot.connectedGates / parkingLot.totalGates) * 100);
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{parkingLot.name}</CardTitle>
          <StatusBadge status={parkingLot.status} />
        </div>
        <div className="flex items-center text-muted-foreground gap-1">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{parkingLot.address}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Cancelas</span>
            </div>
            <p className="font-medium">
              {parkingLot.connectedGates}/{parkingLot.totalGates} conectadas
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  getConnectionPercentage() === 100 
                    ? 'bg-green-500' 
                    : getConnectionPercentage() > 50 
                    ? 'bg-yellow-500' 
                    : 'bg-red-500'
                }`}
                style={{ width: `${getConnectionPercentage()}%` }}
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Última atualização</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {formatLastUpdate(parkingLot.lastUpdate)}
            </p>
          </div>
        </div>
        
        <Button 
          onClick={() => onSelect(parkingLot.id)}
          className="w-full mt-4"
          variant="outline"
        >
          Ver Detalhes
        </Button>
      </CardContent>
    </Card>
  );
}