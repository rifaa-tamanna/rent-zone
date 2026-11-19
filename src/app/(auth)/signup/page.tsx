"use client";

import AuthForm, { type FormDataProps } from "@/components/auth/AuthForm";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();

  const handleSubmit = async (formData: FormDataProps) => {
    const signupPayload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      callbackURL: "/",
    };

    const { data, error } = await authClient.signUp.email(
      signupPayload as Parameters<typeof authClient.signUp.email>[0],
    );

    if (error) {
      console.error("Signup failed:", error);
      return;
    }

    if (data) {
      router.push("/");
      router.refresh();
    }
  };

  return <AuthForm mode="signup" onSubmit={handleSubmit} />;
};

export default SignUpPage;
