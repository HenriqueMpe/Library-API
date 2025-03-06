
import { useAuth } from "../contexts/AuthContext";
import AuthForm from "../components/AuthForm";

const Login = () => {
  const { login } = useAuth();

  const handleLogin = async (data: { email: string; password: string }) => {
    await login(data.email, data.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 auth-container">
      <div className="w-full max-w-md">
        <AuthForm type="login" onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
