import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { UserPlus, LogIn } from 'lucide-react';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create a new account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isLogin ? <LoginForm /> : <RegisterForm />}
          
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              {isLogin ? (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create new account
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign in to existing account
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}