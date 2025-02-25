"use server";

import { createSession, deleteSession } from "@/lib/session";
import { LoginFormSchema, LoginFormState } from "@/lib/utils";
import { SignupFormSchema, SignupFormState } from "@/lib/utils";
import { redirect } from "next/navigation";
import { z } from "zod";

async function handleAuth<T>(
  formData: FormData,
  schema: z.ZodSchema<T>,
  endpoint: string,
  redirectRoute: string,
) {
  const parsed = schema.safeParse({
    ...Object.fromEntries(formData.entries()),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const url = `${process.env.AUTH_API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    const data = await response.json();

    if (!response.ok) {
      return { errors: { password: data.message } };
    }

    console.log(data);

    if (redirectRoute === "/home") { // login action
      await createSession(data.accessToken, data.refreshToken);
    }
  } catch (err) {
    return { errors: { password: "Connection error. Try again later." } };
  }

  redirect(redirectRoute);
}

export async function login(state: LoginFormState, formData: FormData) {
  return handleAuth(formData, LoginFormSchema, "/authentication/login", "/home");
}

export async function signup(state: SignupFormState, formData: FormData) {
  return handleAuth(formData, SignupFormSchema, "/authentication/signup", "/");
}

export async function logout() {
  deleteSession();
  redirect("/");
}