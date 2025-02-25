"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const AuthButton = ({ children, loading, className, ...props }: AuthButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "w-full py-3 px-4 rounded-lg bg-primary text-white font-medium",
        "transition-all duration-200 transform hover:bg-primary-hover hover:scale-[1.02]",
        "focus:outline-none focus:ring-2 focus:ring-primary/50",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
        className
      )}
      disabled={loading || props.disabled}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
      ) : (
        children
      )}
    </button>
  );
};