"use client";

import AuthForm, { FormDataProps } from "@/components/auth/AuthForm";
import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
  const handleSubmit = async (formData: FormDataProps) => {
    const { data, error } = await authClient.signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      callbackURL: "/",
    });

    console.log("DATA:", data);
    console.log("ERROR:", error);

    console.log("sign up response", data, error);
  };

  return <AuthForm mode="signup" onSubmit={handleSubmit} />;
};

export default SignUpPage;
