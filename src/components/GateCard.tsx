import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { StatusBadge } from "./StatusBadge";
import { Button } from "./ui/button";
import { Gate } from "../types";
import { Lock, Unlock, Battery, Clock, Settings } from "lucide-react";

interface GateCardProps {
  gate: Gate;
  onToggle: (gateId: string) => void;
}

export function GateCard({ gate, onToggle }: GateCardProps) {
  const formatLastActivity = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
  };

  const getBatteryColor = (level?: number) => {
    if (!level) return 'text-gray-400';
    if (level > 50) return 'text-green-500';
    if (level > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  const isOperational = gate.status === 'connected';

  return (
    <Card className={`transition-all duration-200 ${
      gate.status === 'connected' 
        ? 'hover:shadow-md' 
        : gate.status === 'disconnected' 
        ? 'opacity-75 bg-gray-50' 
        : 'border-blue-200 bg-blue-50'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">{gate.name}</CardTitle>
          <StatusBadge status={gate.status} size="sm" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {gate.isOpen ? (
                <Unlock className="h-4 w-4 text-red-500" />
              ) : (
                <Lock className="h-4 w-4 text-green-500" />
              )}
              <span className="text-sm">Status</span>
            </div>
            <p className={`text-sm font-medium ${
              gate.isOpen ? 'text-red-600' : 'text-green-600'
            }`}>
              {gate.isOpen ? 'Aberta' : 'Fechada'}
            </p>
          </div>
          
          {gate.batteryLevel !== undefined && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Battery className={`h-4 w-4 ${getBatteryColor(gate.batteryLevel)}`} />
                <span className="text-sm">Bateria</span>
              </div>
              <p className={`text-sm font-medium ${getBatteryColor(gate.batteryLevel)}`}>
                {gate.batteryLevel}%
              </p>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Última atividade</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {formatLastActivity(gate.lastActivity)}
          </p>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button
            onClick={() => onToggle(gate.id)}
            disabled={!isOperational}
            variant={gate.isOpen ? "destructive" : "default"}
            className="flex-1"
            size="sm"
          >
            {gate.isOpen ? (
              <>
                <Lock className="h-4 w-4 mr-2" />
                Fechar
              </>
            ) : (
              <>
                <Unlock className="h-4 w-4 mr-2" />
                Abrir
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            disabled={!isOperational}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        
        {gate.status === 'maintenance' && (
          <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded border border-blue-200">
            Esta cancela está em modo de manutenção
          </div>
        )}
        
        {gate.status === 'disconnected' && (
          <div className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200">
            Sem conexão com a cancela
          </div>
        )}
      </CardContent>
    </Card>
  );
}