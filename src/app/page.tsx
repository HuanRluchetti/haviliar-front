"use client";
import React, { useState, useEffect } from 'react';
import { ParkingLotList } from '../components/ParkingLotList';
import { ParkingLotDetail } from '../components/ParkingLotDetail';
import { Button } from '../components/ui/button';
import { mockParkingLots, mockGates } from '../data/mockData';
import { ParkingLot, Gate } from '../types';
import { Car, Menu, X } from 'lucide-react';

export default function App() {
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