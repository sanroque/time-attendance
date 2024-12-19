export interface User {
  id: string;
  email: string;
  name: string;
  department: string;
  role: 'employee' | 'admin';
  employeeId: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  department: string;
  employeeId: string;
}