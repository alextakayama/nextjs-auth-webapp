"use client";

import { AuthButton } from "@/components/auth/AuthButton";
import { AuthInput } from "@/components/auth/AuthInput";
import { useActionState } from "react";
import { LoginFormState } from "@/lib/utils";
import { useForm } from "@/hooks/useForm";

interface AuthLoginFormProps {
  action: (state: LoginFormState, formData: FormData) => Promise<any>;
}

export const AuthLoginForm = ({ action }: AuthLoginFormProps) => {
  const { form, handleChange } = useForm({
    email: "",
    password: "",
  });
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="space-y-4">
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
        Log In
      </AuthButton>
    </form>
  )
}