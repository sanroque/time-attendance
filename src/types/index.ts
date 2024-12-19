export interface AttendanceRecord {
  id: string;
  userId: string;
  clockIn: Date;
  clockOut: Date | null;
  status: 'present' | 'late' | 'early-leave';
}

export interface User {
  id: string;
  name: string;
  role: 'employee' | 'admin';
  department: string;
}