import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { AttendanceState, AttendanceRecord } from '../types/attendance';
import { attendanceReducer } from '../reducers/attendanceReducer';
import { useAuth } from './AuthContext';
import { generateId } from '../utils/ids';
import { calculateAttendanceStatus } from '../utils/attendance';

interface AttendanceContextType extends AttendanceState {
  clockIn: () => Promise<void>;
  clockOut: () => Promise<void>;
  fetchAttendanceHistory: () => Promise<void>;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

const initialState: AttendanceState = {
  records: [],
  currentSession: null,
  isLoading: false,
  error: null,
};

export function AttendanceProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(attendanceReducer, initialState);
  const { user } = useAuth();

  const clockIn = useCallback(async () => {
    if (!user) return;

    try {
      dispatch({ type: 'ATTENDANCE_ACTION_START' });
      
      const now = new Date();
      const record: AttendanceRecord = {
        id: generateId(),
        userId: user.id,
        date: now.toISOString().split('T')[0],
        clockIn: now.toLocaleTimeString(),
        clockOut: null,
        status: calculateAttendanceStatus(now),
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({ type: 'CLOCK_IN_SUCCESS', payload: record });
    } catch (error) {
      dispatch({ type: 'ATTENDANCE_ACTION_FAILURE', payload: 'Failed to clock in' });
    }
  }, [user]);

  const clockOut = useCallback(async () => {
    if (!user || !state.currentSession) return;

    try {
      dispatch({ type: 'ATTENDANCE_ACTION_START' });
      
      const now = new Date();
      const updatedRecord: AttendanceRecord = {
        ...state.currentSession,
        clockOut: now.toLocaleTimeString(),
        status: calculateAttendanceStatus(now, new Date(state.currentSession.clockIn)),
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({ type: 'CLOCK_OUT_SUCCESS', payload: updatedRecord });
    } catch (error) {
      dispatch({ type: 'ATTENDANCE_ACTION_FAILURE', payload: 'Failed to clock out' });
    }
  }, [user, state.currentSession]);

  const fetchAttendanceHistory = useCallback(async () => {
    if (!user) return;

    try {
      dispatch({ type: 'ATTENDANCE_ACTION_START' });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data
      const mockRecords: AttendanceRecord[] = [
        {
          id: '1',
          userId: user.id,
          date: '2024-03-15',
          clockIn: '09:00:00',
          clockOut: '17:00:00',
          status: 'present',
        },
        // Add more mock records as needed
      ];
      
      dispatch({ type: 'FETCH_HISTORY_SUCCESS', payload: mockRecords });
    } catch (error) {
      dispatch({ type: 'ATTENDANCE_ACTION_FAILURE', payload: 'Failed to fetch attendance history' });
    }
  }, [user]);

  return (
    <AttendanceContext.Provider value={{
      ...state,
      clockIn,
      clockOut,
      fetchAttendanceHistory,
    }}>
      {children}
    </AttendanceContext.Provider>
  );
}

export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (context === undefined) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
};