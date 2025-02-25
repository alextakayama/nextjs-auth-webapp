import { AuthCard } from "@/components/auth/AuthCard";
import { AuthLoginForm } from "@/components/auth/AuthLoginForm";
import Image from "next/image";
import { login } from "@/app/actions/auth";
import Link from "next/link";
import type { Metadata } from "next";
import profilePic from "../../public/alex_takayama.jpg";

export const metadata: Metadata = {
  title: "Login | Alex Takayama",
};

export default function Login() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-4">
          <Image
            alt="Alex Takayama"
            className="w-20 h-20 rounded-full"
            src={profilePic}
          />
        </div>

        <AuthCard>
          <h2 className="text-2xl font-semibold text-center mb-8">Welcome back</h2>
          <AuthLoginForm action={login} />
          <p className="text-center mt-6 text-sm text-gray-600">
            Don't have an account?
            <Link 
              className="ml-1 text-primary hover:underline focus:outline-none" 
              href="/sign-up"
            >
              Sign Up
            </Link>
          </p>
        </AuthCard>
      </div>
    </div>    
  );
}
