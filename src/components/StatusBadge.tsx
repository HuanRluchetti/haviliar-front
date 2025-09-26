import { Badge } from "./ui/badge";
import { ConnectionStatus } from "../types";

interface StatusBadgeProps {
  status: ConnectionStatus;
  size?: 'sm' | 'default';
}

export function StatusBadge({ status, size = 'default' }: StatusBadgeProps) {
  const getStatusConfig = (status: ConnectionStatus) => {
    switch (status) {
      case 'connected':
        return {
          variant: 'default' as const,
          className: 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200',
          label: 'Conectado'
        };
      case 'disconnected':
        return {
          variant: 'destructive' as const,
          className: 'bg-red-100 text-red-800 hover:bg-red-100 border-red-200',
          label: 'Desconectado'
        };
      case 'warning':
        return {
          variant: 'secondary' as const,
          className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200',
          label: 'Atenção'
        };
      case 'maintenance':
        return {
          variant: 'secondary' as const,
          className: 'bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200',
          label: 'Manutenção'
        };
      default:
        return {
          variant: 'secondary' as const,
          className: '',
          label: 'Desconhecido'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge 
      variant={config.variant}
      className={`${config.className} ${size === 'sm' ? 'px-2 py-0.5 text-xs' : ''}`}
    >
      {config.label}
    </Badge>
  );
}