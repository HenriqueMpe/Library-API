
import { useAuth } from "../contexts/AuthContext";
import AuthForm from "../components/AuthForm";

const Register = () => {
  const { register } = useAuth();

  const handleRegister = async (data: { 
    name: string; 
    email: string; 
    password: string;
    accessCode: string;
  }) => {
    await register(data.name, data.email, data.password, data.accessCode);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 auth-container">
      <div className="w-full max-w-md">
        <AuthForm type="register" onSubmit={handleRegister} />
      </div>
    </div>
  );
};

export default Register;
