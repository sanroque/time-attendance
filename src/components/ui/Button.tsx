import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function Button({ children, isLoading, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`
        w-full flex justify-center py-2 px-4 border border-transparent rounded-md
        shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : children}
    </button>
  );
}