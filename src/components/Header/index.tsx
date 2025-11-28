import { Car } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-white border-b border-border sticky top-0 z-40">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                                <Car className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold">Haviliar</h1>
                                <p className="text-sm text-muted-foreground">Sistema de Controle de Cancelas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;