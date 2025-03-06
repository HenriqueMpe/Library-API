
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (data: any) => Promise<void>;
}

const AuthForm = ({ type, onSubmit }: AuthFormProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    accessCode: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit(formData);
      navigate("/dashboard");
    } catch (error) {
      // Error is handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg overflow-hidden animate-slide-up glass">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          {type === "login" ? "Login" : "Criar Conta"}
        </CardTitle>
        <CardDescription>
          {type === "login" 
            ? "Entre com suas credenciais para acessar o sistema" 
            : "Preencha os dados abaixo para criar uma nova conta"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {type === "register" && (
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                placeholder="Digite seu nome completo"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Digite seu email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Digite sua senha"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          
          {type === "register" && (
            <div className="space-y-2">
              <Label htmlFor="accessCode">Código de Acesso</Label>
              <Input
                id="accessCode"
                name="accessCode"
                placeholder="Digite o código de acesso"
                required
                value={formData.accessCode}
                onChange={handleChange}
              />
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></div>
                <span>Aguarde...</span>
              </div>
            ) : (
              type === "login" ? "Entrar" : "Cadastrar"
            )}
          </Button>
          
          <div className="text-center text-sm">
            {type === "login" ? (
              <p>
                Não tem uma conta?{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-semibold" 
                  onClick={() => navigate("/register")}
                >
                  Cadastre-se
                </Button>
              </p>
            ) : (
              <p>
                Já tem uma conta?{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-semibold" 
                  onClick={() => navigate("/login")}
                >
                  Faça login
                </Button>
              </p>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AuthForm;
