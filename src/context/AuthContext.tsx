import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { AuthState, LoginCredentials, RegisterData, User } from '../types/auth';
import { authReducer } from '../reducers/authReducer';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: 'AUTH_START' });
      // In a real app, this would be an API call
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: 'John Doe',
        department: 'Engineering',
        role: 'employee',
        employeeId: 'EMP001',
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch({ type: 'AUTH_SUCCESS', payload: mockUser });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: 'Invalid credentials' });
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {
      dispatch({ type: 'AUTH_START' });
      // In a real app, this would be an API call
      const mockUser: User = {
        id: '1',
        email: data.email,
        name: data.name,
        department: data.department,
        role: 'employee',
        employeeId: data.employeeId,
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch({ type: 'AUTH_SUCCESS', payload: mockUser });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: 'Registration failed' });
    }
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};