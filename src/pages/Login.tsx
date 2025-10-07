import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/forms";
import { type LoginFormData } from "../schemas/auth";
import { useLogin } from "../hooks/useAuth";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { mutateAsync: login } = useLogin();

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true);

    try {
      await login(data, { onSuccess: () => navigate("/") });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome</h1>
          <p className="text-muted">Please sign in to your account</p>
        </div>

        <LoginForm onSubmit={handleLogin} loading={loading} />
      </div>
    </div>
  );
};

export default Login;
