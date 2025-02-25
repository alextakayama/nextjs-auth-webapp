"use client";

import { AuthButton } from "@/components/auth/AuthButton";
import { AuthInput } from "@/components/auth/AuthInput";
import { useActionState } from "react";
import { useForm } from "@/hooks/useForm";
import { useState } from "react";
import { SignupFormState } from "@/lib/utils";

interface AuthSignupFormProps {
  action: (state: SignupFormState, formData: FormData) => Promise<any>;
}

export const AuthSignupForm = ({ action }: AuthSignupFormProps) => {
  const { form, handleChange, setForm } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <AuthInput
        label="Name"
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={state?.errors?.name}
        required
      />
      <AuthInput
        label="Email"
        type="text"
        name="email"
        value={form.email}
        onChange={handleChange}
        error={state?.errors?.email}
        required
      />
      <AuthInput
        label="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        error={state?.errors?.password}
        required
      />
      <AuthButton loading={pending} type="submit">
        Sign Up
      </AuthButton>
    </form>
  )
}