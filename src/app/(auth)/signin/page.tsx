"use client";

import AuthForm, { FormDataProps } from "@/components/auth/AuthForm";
import { authClient } from "@/lib/auth-client";

const SignInPage = () => {
  const handleSignIn = async (formData: FormDataProps) => {
    const { data, error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
      rememberMe: true,
      callbackURL: "/",
    });

    console.log('data', data, error)
  };

  return <AuthForm mode="signin" onSubmit={handleSignIn} />;
};

export default SignInPage;
