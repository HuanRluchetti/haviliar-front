import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { StatusBadge } from "./StatusBadge";
import { GateCard } from "./GateCard";
import { ParkingLot, Gate } from "../types";
import { ArrowLeft, MapPin, Clock, Shield, RefreshCw } from "lucide-react";

interface ParkingLotDetailProps {
  parkingLot: ParkingLot;
  gates: Gate[];
  onBack: () => void;
  onToggleGate: (gateId: string) => void;
  onRefresh: () => void;
}

export function ParkingLotDetail({ 
  parkingLot, 
  gates, 
  onBack, 
  onToggleGate,
  onRefresh 
}: ParkingLotDetailProps) {
  const formatLastUpdate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
  };

  const connectedGates = gates.filter(gate => gate.status === 'connected');
  const disconnectedGates = gates.filter(gate => gate.status === 'disconnected');
  const maintenanceGates = gates.filter(gate => gate.status === 'maintenance');
  const openGates = gates.filter(gate => gate.isOpen);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">{parkingLot.name}</h1>
            <div className="flex items-center text-muted-foreground gap-1 mt-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{parkingLot.address}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <StatusBadge status={parkingLot.status} />
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Resumo do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="text-xl font-semibold text-green-700">{connectedGates.length}</div>
              <div className="text-sm text-green-600">Conectadas</div>
            </div>
            
            <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="text-xl font-semibold text-red-700">{disconnectedGates.length}</div>
              <div className="text-sm text-red-600">Desconectadas</div>
            </div>
            
            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-xl font-semibold text-blue-700">{maintenanceGates.length}</div>
              <div className="text-sm text-blue-600">Manutenção</div>
            </div>
            
            <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-xl font-semibold text-yellow-700">{openGates.length}</div>
              <div className="text-sm text-yellow-600">Abertas</div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Última atualização: {formatLastUpdate(parkingLot.lastUpdate)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gates Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Cancelas ({gates.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gates.map((gate) => (
            <GateCard
              key={gate.id}
              gate={gate}
              onToggle={onToggleGate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}