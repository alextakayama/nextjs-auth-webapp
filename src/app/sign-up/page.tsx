import { AuthCard } from "@/components/auth/AuthCard";
import { AuthSignupForm } from "@/components/auth/AuthSignupForm";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import profilePic from "../../../public/alex_takayama.jpg";
import { signup } from "@/app/actions/auth";

export const metadata: Metadata = {
  title: "Sign Up | Alex Takayama",
};

export default function Signup() {
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
          <h2 className="text-2xl font-semibold text-center mb-8">Create an account</h2>
          <AuthSignupForm action={signup} />
          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?
            <Link 
              className="ml-1 text-primary hover:underline focus:outline-none" 
              href="/"
            >
              Log In
            </Link>
          </p>
        </AuthCard>
      </div>
    </div>    
  );
}
