
"use client";

import AuthForm, { type FormDataProps } from "@/components/auth/AuthForm";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const SignInPage = () => {
  const handleSignIn = async (formData: FormDataProps) => {
    try {
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        rememberMe: true,
        callbackURL: "/",
      });

      if (error) {
        console.error("Sign in failed:", error);

        toast.error("Sign In Failed", {
          description:
            error.message || "Incorrect email or password. Please try again.",
        });

        return;
      }

      if (data) {
        toast.success("Welcome Back!", {
          description: "You have successfully signed in to RentZone.",
        });
      } else {
        toast.error("Sign In Failed", {
          description: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Sign in error:", error);

      toast.error("Sign In Failed", {
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return <AuthForm mode="signin" onSubmit={handleSignIn} />;
};

export default SignInPage;
