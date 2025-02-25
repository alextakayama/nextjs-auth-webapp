"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const AuthInput = ({ label, error, className, type = "text", id, ...props }: AuthInputProps) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="relative w-full mb-4">
      <div className="relative">
        <input
          id={inputId}
          {...props}
          type={showPassword ? "text" : type}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "w-full px-4 py-3 rounded-lg border bg-white/50 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
            error ? "border-red-500" : "border-gray-200",
            className
          )}
          placeholder=" "
        />
        <label
          htmlFor={inputId}
          className={cn(
            "absolute left-4 transition-all duration-200 pointer-events-none",
            focused || props.value ? "-top-2 text-xs bg-white px-1" : "top-3",
            error ? "text-red-500" : "text-gray-500"
          )}
        >
          {label}
        </label>
        {isPassword && (
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-1"
        >
          { typeof error == "string" ? error : error.join(". ") }
        </motion.p>
      )}
    </div>
  );
};