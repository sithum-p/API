import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useLocalUsers } from "@/store/useLocalUsers";
import { GoogleLogin } from '@react-oauth/google';
import AuthLayout from "./AuthLayout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const { users, fetchUsers } = useLocalUsers();
  
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }
      
      // Store JWT token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      console.log('Login successful:', data);
      navigate("/");
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
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
      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
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
            <Input
              id="password"
              type="password"
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
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="outline"
            size="large"
            text="signin_with"
            shape="rectangular"
          />
        </div>
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