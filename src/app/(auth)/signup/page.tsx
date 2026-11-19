"use client";

import AuthForm, { FormDataProps } from "@/components/auth/AuthForm";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();

  const handleSubmit = async (formData: FormDataProps) => {
    const { data, error } = await authClient.signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      callbackURL: "/",
    });

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
