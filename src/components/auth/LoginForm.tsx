import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { AlertCircle } from 'lucide-react';

export function LoginForm() {
  const { login, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}
      
      <Input
        type="email"
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      
      <Input
        type="password"
        name="password"
        label="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      
      <Button type="submit" isLoading={isLoading}>
        Login
      </Button>
    </form>
  );
}