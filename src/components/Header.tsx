import React from 'react';
import { Clock, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-indigo-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="w-8 h-8" />
          <h1 className="text-2xl font-bold">TimeTrack Pro</h1>
        </div>
        <div className="flex items-center space-x-6">
          <span className="text-sm">
            Welcome, {user?.name} ({user?.employeeId})
          </span>
          <button
            onClick={logout}
            className="flex items-center space-x-1 hover:text-indigo-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}