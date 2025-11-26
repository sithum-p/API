import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/store/useAuth";
import { ROUTES } from "@/constants/routes.constant";
import AuthLayout from "./AuthLayout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      await login(email, password);
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (error: any) {
      setError(error.message || "Login failed. Please try again.");
    }
  };
  
  const handleGoogleSuccess = (credentialResponse: any) => {
    console.log('Google login success:', credentialResponse);
    // Decode the JWT token to get user info
    const token = credentialResponse.credential;
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Google user info:', payload);
    
    // Navigate to dashboard on successful Google login
    navigate("/");
  };
  
  const handleGoogleError = () => {
    console.log('Google login failed');
    setError('Google login failed. Please try again.');
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 space-y-6 w-full max-w-md mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}