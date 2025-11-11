import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useLocalUsers } from "@/store/useLocalUsers";
import AuthLayout from "./AuthLayout";

export default function SignIn() {
  // Match exact user table columns: firstname, lastname, age, gender, email, birthdate, password
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    email: "",
    birthdate: "",
    password: ""
  });
  const navigate = useNavigate();

  const { addUser } = useLocalUsers();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.password || formData.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    
    try {
      // Validate all fields are filled
      if (!formData.firstname || !formData.lastname || !formData.age || !formData.gender || !formData.email || !formData.birthdate || !formData.password) {
        alert('Please fill all fields');
        return;
      }
      
      const userData = {
        firstname: formData.firstname.trim(),
        lastname: formData.lastname.trim(),
        age: parseInt(formData.age),
        gender: formData.gender,
        email: formData.email.trim().toLowerCase(),
        birthdate: formData.birthdate,
        password: formData.password
      };
      
      console.log('Final userData to send:', userData);
      console.log('Password included:', !!userData.password);
      
      // Register user with JWT
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      
      console.log('Registration successful:', data);
      
      // Clear form
      setFormData({
        firstname: "",
        lastname: "",
        age: "",
        gender: "",
        email: "",
        birthdate: "",
        password: ""
      });
      
      alert('User created and saved to database! Check users table.');
      navigate("/login");
    } catch (error) {
      console.error("Failed to create user - Full error:", error);
      console.error("Error message:", error.message);
      console.error("Error response:", error.response?.data);
      alert(`Failed to create user: ${error.message}`);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">Join us today</p>
        </div>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <Label htmlFor="firstname">First Name</Label>
            <Input
              id="firstname"
              value={formData.firstname}
              onChange={(e) => handleChange("firstname", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastname">Last Name</Label>
            <Input
              id="lastname"
              value={formData.lastname}
              onChange={(e) => handleChange("lastname", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              min="1"
              max="120"
              value={formData.age}
              onChange={(e) => handleChange("age", e.target.value)}
              placeholder="Enter your age"
              required
            />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select onValueChange={(value) => handleChange("gender", value)} value={formData.gender}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="birthdate">Birthdate</Label>
            <Input
              id="birthdate"
              type="date"
              value={formData.birthdate}
              onChange={(e) => handleChange("birthdate", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              minLength={6}
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="Enter password (min 6 characters)"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}