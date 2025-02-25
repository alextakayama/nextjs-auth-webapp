"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export const AuthCard = ({ children, className }: AuthCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "w-full max-w-md p-8 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg border border-gray-100",
        className
      )}
    >
      {children}
    </motion.div>
  );
};