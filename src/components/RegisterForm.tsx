import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { RegisterData } from '../types';
import { Eye, EyeOff, User, ArrowLeft } from 'lucide-react';

interface RegisterFormProps {
  onRegister: (data: RegisterData) => void;
  onSwitchToLogin: () => void;
  isLoading?: boolean;
}

export function RegisterForm({ onRegister, onSwitchToLogin, isLoading = false }: RegisterFormProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<RegisterData>();

  const password = watch('password');

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setValue('cpf', formatted);
  };

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCEP(e.target.value);
    setValue('address.cep', formatted);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setValue('phone', formatted);
  };

  const onSubmit = (data: RegisterData) => {
    onRegister(data);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <User className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl">Criar Conta</CardTitle>
              <CardDescription>
                Preencha seus dados para criar uma nova conta
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Dados Pessoais */}
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Dados Pessoais</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Digite seu nome completo"
                    {...register('name', { 
                      required: 'Nome é obrigatório',
                      minLength: { value: 2, message: 'Nome deve ter pelo menos 2 caracteres' }
                    })}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    {...register('email', { 
                      required: 'E-mail é obrigatório',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'E-mail inválido'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    type="text"
                    placeholder="000.000.000-00"
                    maxLength={14}
                    {...register('cpf', { 
                      required: 'CPF é obrigatório',
                      pattern: {
                        value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                        message: 'CPF inválido'
                      }
                    })}
                    onChange={handleCPFChange}
                  />
                  {errors.cpf && (
                    <p className="text-sm text-destructive">{errors.cpf.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    type="text"
                    placeholder="(11) 99999-9999"
                    maxLength={15}
                    {...register('phone', { 
                      required: 'Telefone é obrigatório',
                      pattern: {
                        value: /^\(\d{2}\) \d{4,5}-\d{4}$/,
                        message: 'Telefone inválido'
                      }
                    })}
                    onChange={handlePhoneChange}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="birthDate">Data de Nascimento</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    {...register('birthDate', { 
                      required: 'Data de nascimento é obrigatória'
                    })}
                  />
                  {errors.birthDate && (
                    <p className="text-sm text-destructive">{errors.birthDate.message}</p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Endereço */}
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Endereço</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="street">Rua</Label>
                  <Input
                    id="street"
                    type="text"
                    placeholder="Digite o nome da rua"
                    {...register('address.street', { 
                      required: 'Rua é obrigatória'
                    })}
                  />
                  {errors.address?.street && (
                    <p className="text-sm text-destructive">{errors.address.street.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    type="text"
                    placeholder="00000-000"
                    maxLength={9}
                    {...register('address.cep', { 
                      required: 'CEP é obrigatório',
                      pattern: {
                        value: /^\d{5}-\d{3}$/,
                        message: 'CEP inválido'
                      }
                    })}
                    onChange={handleCEPChange}
                  />
                  {errors.address?.cep && (
                    <p className="text-sm text-destructive">{errors.address.cep.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input
                    id="neighborhood"
                    type="text"
                    placeholder="Digite o bairro"
                    {...register('address.neighborhood', { 
                      required: 'Bairro é obrigatório'
                    })}
                  />
                  {errors.address?.neighborhood && (
                    <p className="text-sm text-destructive">{errors.address.neighborhood.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Digite a cidade"
                    {...register('address.city', { 
                      required: 'Cidade é obrigatória'
                    })}
                  />
                  {errors.address?.city && (
                    <p className="text-sm text-destructive">{errors.address.city.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    type="text"
                    placeholder="SP"
                    maxLength={2}
                    {...register('address.state', { 
                      required: 'Estado é obrigatório',
                      minLength: { value: 2, message: 'Estado deve ter 2 caracteres' },
                      maxLength: { value: 2, message: 'Estado deve ter 2 caracteres' }
                    })}
                  />
                  {errors.address?.state && (
                    <p className="text-sm text-destructive">{errors.address.state.message}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="complement">Complemento (opcional)</Label>
                  <Input
                    id="complement"
                    type="text"
                    placeholder="Apto, casa, etc."
                    {...register('address.complement')}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Senha */}
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Senha</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      {...register('password', { 
                        required: 'Senha é obrigatória',
                        minLength: { value: 8, message: 'Senha deve ter pelo menos 8 caracteres' }
                      })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirme sua senha"
                      {...register('confirmPassword', { 
                        required: 'Confirmação de senha é obrigatória',
                        validate: (value) => value === password || 'As senhas não coincidem'
                      })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Criando conta...' : 'Criar Conta'}
              </Button>
              
              <div className="text-center">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onSwitchToLogin}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Já tenho uma conta
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}