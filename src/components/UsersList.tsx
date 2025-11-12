import React, { useState, useEffect } from "react";
import { User } from "../types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";
import { Alert, AlertDescription } from "./ui/alert";
import {
    Users,
    RefreshCcw,
    Search,
    UserCircle2,
    Mail,
    Phone,
    MapPin,
    Calendar,
    AlertCircle,
} from "lucide-react";

export function UsersList() {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>(
        [],
    );
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchUsers = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // ============================================
            // INTEGRAÇÃO COM API REAL
            // ============================================
            // Para conectar com sua API, substitua o código abaixo por:
            //
            // const response = await fetch('https://sua-api.com/api/users', {
            //   method: 'GET',
            //   headers: {
            //     'Content-Type': 'application/json',
            //     'Authorization': `Bearer ${token}` // Se necessário
            //   }
            // });
            //
            // if (!response.ok) {
            //   throw new Error('Erro ao buscar usuários');
            // }
            //
            // const data = await response.json();
            // setUsers(data);
            // setFilteredUsers(data);
            // ============================================

            // Simulando chamada API (REMOVER EM PRODUÇÃO)
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Mock de dados da API
            const mockUsers: User[] = [
                {
                    id: "1",
                    name: "João Silva",
                    email: "joao.silva@email.com",
                    cpf: "123.456.789-00",
                    phone: "(11) 98765-4321",
                    birthDate: "1990-05-15",
                    address: {
                        street: "Rua das Flores, 123",
                        cep: "01234-567",
                        city: "São Paulo",
                        state: "SP",
                        neighborhood: "Centro",
                        complement: "Apto 45",
                    },
                    createdAt: "2024-01-15T10:30:00Z",
                },
                {
                    id: "2",
                    name: "Maria Santos",
                    email: "maria.santos@email.com",
                    cpf: "987.654.321-00",
                    phone: "(11) 91234-5678",
                    birthDate: "1985-08-22",
                    address: {
                        street: "Av. Paulista, 1000",
                        cep: "01310-100",
                        city: "São Paulo",
                        state: "SP",
                        neighborhood: "Bela Vista",
                    },
                    createdAt: "2024-02-10T14:20:00Z",
                },
                {
                    id: "3",
                    name: "Pedro Oliveira",
                    email: "pedro.oliveira@email.com",
                    cpf: "456.789.123-00",
                    phone: "(21) 99876-5432",
                    birthDate: "1992-11-03",
                    address: {
                        street: "Rua do Comércio, 456",
                        cep: "20040-020",
                        city: "Rio de Janeiro",
                        state: "RJ",
                        neighborhood: "Centro",
                    },
                    createdAt: "2024-03-05T09:15:00Z",
                },
                {
                    id: "4",
                    name: "Ana Costa",
                    email: "ana.costa@email.com",
                    cpf: "321.654.987-00",
                    phone: "(11) 97654-3210",
                    birthDate: "1988-03-28",
                    address: {
                        street: "Rua Augusta, 789",
                        cep: "01305-000",
                        city: "São Paulo",
                        state: "SP",
                        neighborhood: "Consolação",
                        complement: "Sala 12",
                    },
                    createdAt: "2024-04-12T16:45:00Z",
                },
                {
                    id: "5",
                    name: "Carlos Ferreira",
                    email: "carlos.ferreira@email.com",
                    cpf: "789.123.456-00",
                    phone: "(31) 98765-1234",
                    birthDate: "1995-07-19",
                    address: {
                        street: "Av. Afonso Pena, 1500",
                        cep: "30130-002",
                        city: "Belo Horizonte",
                        state: "MG",
                        neighborhood: "Centro",
                    },
                    createdAt: "2024-05-20T11:30:00Z",
                },
            ];

            setUsers(mockUsers);
            setFilteredUsers(mockUsers);
            setIsLoading(false);
        } catch (err) {
            setError("Erro ao carregar usuários. Tente novamente.");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        const filtered = users.filter(
            (user) =>
                user.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                user.email
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                user.cpf.includes(searchTerm) ||
                user.phone.includes(searchTerm),
        );
        setFilteredUsers(filtered);
    }, [searchTerm, users]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("pt-BR");
    };

    const getTimeSinceCreation = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(
            diffTime / (1000 * 60 * 60 * 24),
        );

        if (diffDays === 0) return "Hoje";
        if (diffDays === 1) return "Ontem";
        if (diffDays < 7) return `${diffDays} dias atrás`;
        if (diffDays < 30)
            return `${Math.floor(diffDays / 7)} semanas atrás`;
        return `${Math.floor(diffDays / 30)} meses atrás`;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-3xl">Usuários</h2>
                    <p className="text-muted-foreground mt-1">
                        Gerencie todos os usuários cadastrados no sistema
                    </p>
                </div>
                <Button
                    onClick={fetchUsers}
                    disabled={isLoading}
                    className="gap-2 w-full md:w-auto"
                >
                    <RefreshCcw
                        className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                    />
                    Atualizar
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Total de Usuários
                                </p>
                                <p className="text-2xl">{users.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-600 text-white p-3 rounded-lg">
                                <UserCircle2 className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Usuários Ativos
                                </p>
                                <p className="text-2xl">{users.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-600 text-white p-3 rounded-lg">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Novos Este Mês
                                </p>
                                <p className="text-2xl">
                                    {
                                        users.filter((u) => {
                                            const date = new Date(u.createdAt);
                                            const now = new Date();
                                            return (
                                                date.getMonth() === now.getMonth() &&
                                                date.getFullYear() === now.getFullYear()
                                            );
                                        }).length
                                    }
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Buscar por nome, email, CPF ou telefone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                    />
                </div>
            </div>

            {/* Error Alert */}
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Users Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Lista de Usuários</CardTitle>
                    <CardDescription>
                        {filteredUsers.length}{" "}
                        {filteredUsers.length === 1
                            ? "usuário encontrado"
                            : "usuários encontrados"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="space-y-3">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center space-x-4"
                                >
                                    <Skeleton className="h-12 w-12 rounded-full" />
                                    <div className="space-y-2 flex-1">
                                        <Skeleton className="h-4 w-[250px]" />
                                        <Skeleton className="h-4 w-[200px]" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="text-center py-12">
                            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">
                                {searchTerm
                                    ? "Nenhum usuário encontrado com os critérios de busca"
                                    : "Nenhum usuário cadastrado"}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nome</TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            CPF
                                        </TableHead>
                                        <TableHead className="hidden lg:table-cell">
                                            Telefone
                                        </TableHead>
                                        <TableHead className="hidden xl:table-cell">
                                            Endereço
                                        </TableHead>
                                        <TableHead>Cadastro</TableHead>
                                        <TableHead className="text-right">
                                            Status
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-primary/10 text-primary p-2 rounded-full">
                                                        <UserCircle2 className="h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">
                                                            {user.name}
                                                        </p>
                                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                            <Mail className="h-3 w-3" />
                                                            <span>{user.email}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <span className="text-sm">
                                                    {user.cpf}
                                                </span>
                                            </TableCell>
                                            <TableCell className="hidden lg:table-cell">
                                                <div className="flex items-center gap-1 text-sm">
                                                    <Phone className="h-3 w-3 text-muted-foreground" />
                                                    <span>{user.phone}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden xl:table-cell">
                                                <div className="flex items-center gap-1 text-sm">
                                                    <MapPin className="h-3 w-3 text-muted-foreground" />
                                                    <span>
                                                        {user.address.city},{" "}
                                                        {user.address.state}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <p className="text-sm">
                                                        {formatDate(user.createdAt)}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {getTimeSinceCreation(
                                                            user.createdAt,
                                                        )}
                                                    </p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Badge
                                                    variant="outline"
                                                    className="bg-green-50 text-green-700 border-green-200"
                                                >
                                                    Ativo
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}