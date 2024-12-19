export function calculateAttendanceStatus(
  currentTime: Date,
  clockInTime?: Date
): 'present' | 'late' | 'early-leave' {
  const workStartHour = 9; // 9:00 AM
  const workEndHour = 17; // 5:00 PM

  if (!clockInTime) {
    // For clock-in
    return currentTime.getHours() >= workStartHour + 1 ? 'late' : 'present';
  } else {
    // For clock-out
    return currentTime.getHours() < workEndHour ? 'early-leave' : 'present';
  }
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString([], {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}