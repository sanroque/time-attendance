import React, { useState, useEffect } from 'react';
import { Timer, LogIn, LogOut } from 'lucide-react';
import { useAttendance } from '../context/AttendanceContext';
import { formatTime, formatDate } from '../utils/attendance';
import { Button } from './ui/Button';

export function ClockInOut() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { currentSession, isLoading, clockIn, clockOut } = useAttendance();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
      <div className="flex items-center justify-center mb-6">
        <Timer className="w-12 h-12 text-indigo-600" />
      </div>
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          {formatTime(currentTime)}
        </h2>
        <p className="text-gray-600">
          {formatDate(currentTime)}
        </p>
      </div>

      {currentSession && (
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-600">Clocked in at:</p>
          <p className="font-semibold">{currentSession.clockIn}</p>
        </div>
      )}

      <div className="flex justify-center">
        {!currentSession ? (
          <Button
            onClick={clockIn}
            isLoading={isLoading}
            className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Clock In
          </Button>
        ) : (
          <Button
            onClick={clockOut}
            isLoading={isLoading}
            className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-700"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Clock Out
          </Button>
        )}
      </div>
    </div>
  );
}