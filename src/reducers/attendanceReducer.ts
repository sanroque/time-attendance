import { AttendanceState, AttendanceRecord } from '../types/attendance';

type AttendanceAction =
  | { type: 'ATTENDANCE_ACTION_START' }
  | { type: 'CLOCK_IN_SUCCESS'; payload: AttendanceRecord }
  | { type: 'CLOCK_OUT_SUCCESS'; payload: AttendanceRecord }
  | { type: 'FETCH_HISTORY_SUCCESS'; payload: AttendanceRecord[] }
  | { type: 'ATTENDANCE_ACTION_FAILURE'; payload: string };

export function attendanceReducer(
  state: AttendanceState,
  action: AttendanceAction
): AttendanceState {
  switch (action.type) {
    case 'ATTENDANCE_ACTION_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'CLOCK_IN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        currentSession: action.payload,
        records: [action.payload, ...state.records],
        error: null,
      };
    case 'CLOCK_OUT_SUCCESS':
      return {
        ...state,
        isLoading: false,
        currentSession: null,
        records: state.records.map(record =>
          record.id === action.payload.id ? action.payload : record
        ),
        error: null,
      };
    case 'FETCH_HISTORY_SUCCESS':
      return {
        ...state,
        isLoading: false,
        records: action.payload,
        error: null,
      };
    case 'ATTENDANCE_ACTION_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}