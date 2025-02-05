'use client';

import { FaGoogle } from 'react-icons/fa';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input'; // From shadcn
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

// Define Zod schema for validation
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must not exceed 20 characters'),
});

// TypeScript types from Zod schema
type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle state
  const [error, setError] = useState<string | null>(null); // Error state
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema), // Use Zod for validation
  });

  const onSubmit = async (data: LoginFormValues) => {
    // Check for the hardcoded credentials
    if (data.email === 'hassanniazi918@gmail.com' && data.password === '123456') {
      router.push('/'); // Redirect to '/home' if credentials match
      return;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        console.log('Logged in successfully');
        router.push('/'); // Redirect on success
      } else {
        const response = await res.json();
        setError(response.error || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
        {/* Toggle Buttons */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${
              isLogin
                ? 'bg-gray-900 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 border border-gray-300'
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${
              !isLogin
                ? 'bg-gray-900 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 border border-gray-300'
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? (
          // Login Form
          <div>
            <h1 className="text-xl font-bold text-gray-800 text-center mb-3">Welcome Back!</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  {...register('email')}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  {...register('password')}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              </div>

              {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

              <Button type="submit" className="w-full py-2 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700 transition-all">
                Log In
              </Button>
            </form>
            <div className="flex justify-between mt-4 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-700">Forgot Password?</a>
              <a href="#" className="hover:text-gray-700">Create an Account</a>
            </div>
          </div>
        ) : (
          // Sign up Form
          <div>
            <h1 className="text-xl font-bold text-gray-800 text-center mb-3">Create Your Account</h1>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full py-2 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700 transition-all"
              >
                Sign Up
              </Button>
            </form>
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center justify-between my-6">
          <span className="border-b w-1/4 border-gray-200"></span>
          <p className="text-sm text-gray-500">OR</p>
          <span className="border-b w-1/4 border-gray-200"></span>
        </div>

        {/* Google Button */}
        <button
          className="w-full py-2 flex items-center justify-center border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 transition-all"
        >
          <FaGoogle className="text-gray-600 mr-3" size={20} />
          <span className="text-sm text-gray-700">
            {isLogin ? 'Log in with Google' : 'Sign up with Google'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;