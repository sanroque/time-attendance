import React from 'react';
import { Header } from './components/Header';
import { ClockInOut } from './components/ClockInOut';
import { AttendanceHistory } from './components/AttendanceHistory';
import { AuthPage } from './components/auth/AuthPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AttendanceProvider } from './context/AttendanceContext';

function AppContent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex justify-center items-start">
            <ClockInOut />
          </div>
          <div>
            <AttendanceHistory />
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AttendanceProvider>
        <AppContent />
      </AttendanceProvider>
    </AuthProvider>
  );
}

export default App;