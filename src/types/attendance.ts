export type AttendanceStatus = 'present' | 'late' | 'early-leave';

export interface AttendanceRecord {
  id: string;
  userId: string;
  date: string;
  clockIn: string;
  clockOut: string | null;
  status: AttendanceStatus;
}

export interface AttendanceState {
  records: AttendanceRecord[];
  currentSession: AttendanceRecord | null;
  isLoading: boolean;
  error: string | null;
}