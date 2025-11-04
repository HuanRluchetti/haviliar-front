import React, { useState, useEffect } from 'react';
import { ParkingLotList } from './ParkingLotList';
import { ParkingLotDetail } from './ParkingLotDetail';
import { Button } from './ui/button';
import { mockParkingLots, mockGates } from '../data/mockData';
import { ParkingLot, Gate } from '../types';
import { Car, Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function Dashboard() {
  const { user, logout } = useAuth();
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>(mockParkingLots);
  const [gates, setGates] = useState<Record<string, Gate[]>>(mockGates);
  const [selectedParkingLotId, setSelectedParkingLotId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const selectedParkingLot = selectedParkingLotId 
    ? parkingLots.find(lot => lot.id === selectedParkingLotId)
    : null;
  
  const selectedGates = selectedParkingLotId 
    ? gates[selectedParkingLotId] || []
    : [];

  const handleSelectParkingLot = (id: string) => {
    setSelectedParkingLotId(id);
    setIsMobileMenuOpen(false);
  };

  const handleBack = () => {
    setSelectedParkingLotId(null);
  };

  const handleToggleGate = (gateId: string) => {
    if (!selectedParkingLotId) return;

    setGates(prevGates => ({
      ...prevGates,
      [selectedParkingLotId]: prevGates[selectedParkingLotId].map(gate =>
        gate.id === gateId 
          ? { ...gate, isOpen: !gate.isOpen, lastActivity: new Date().toISOString() }
          : gate
      )
    }));
  };

  const handleRefresh = () => {
    // Simulate refresh by updating last update time
    if (selectedParkingLotId) {
      setParkingLots(prevLots =>
        prevLots.map(lot =>
          lot.id === selectedParkingLotId
            ? { ...lot, lastUpdate: new Date().toISOString() }
            : lot
        )
      );
    }
  };

  const handleLogout = () => {
    logout();
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setParkingLots(prevLots =>
        prevLots.map(lot => ({
          ...lot,
          lastUpdate: new Date().toISOString()
        }))
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                  <Car className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">ParkControl</h1>
                  <p className="text-sm text-muted-foreground">Sistema de Controle de Cancelas</p>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>

              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="gap-2">
                    <LogOut className="h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-4">
              {selectedParkingLot && (
                <div className="text-right">
                  <p className="font-medium">{selectedParkingLot.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedGates.filter(g => g.status === 'connected').length}/{selectedGates.length} cancelas conectadas
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t">
              {selectedParkingLot && (
                <div className="mb-4">
                  <p className="font-medium">{selectedParkingLot.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedGates.filter(g => g.status === 'connected').length}/{selectedGates.length} cancelas conectadas
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {selectedParkingLot ? (
          <ParkingLotDetail
            parkingLot={selectedParkingLot}
            gates={selectedGates}
            onBack={handleBack}
            onToggleGate={handleToggleGate}
            onRefresh={handleRefresh}
          />
        ) : (
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-semibold">Estacionamentos</h2>
              <p className="text-muted-foreground mt-1">
                Gerencie e monitore todos os seus estacionamentos em tempo real
              </p>
            </div>
            
            <ParkingLotList
              parkingLots={parkingLots}
              onSelectParkingLot={handleSelectParkingLot}
            />
          </div>
        )}
      </main>
    </div>
  );
}