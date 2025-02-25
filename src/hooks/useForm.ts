"use client";

import { useState } from "react";

export function useForm<T>(initialState: T) {
  const [form, setForm] = useState(initialState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return { form, handleChange, setForm };
}