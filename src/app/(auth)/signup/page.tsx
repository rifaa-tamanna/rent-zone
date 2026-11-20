"use client";

import AuthForm, { type FormDataProps } from "@/components/auth/AuthForm";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignUpPage = () => {
  const router = useRouter();

  const handleSubmit = async (formData: FormDataProps) => {
    try {
      const signupPayload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        callbackURL: "/",
      };

      const { data, error } = await authClient.signUp.email(
        signupPayload as Parameters<
          typeof authClient.signUp.email
        >[0],
      );

      if (error) {
        console.error("Signup failed:", error);

        toast.error("Account Creation Failed", {
          description: error.message || "Please try again.",
        });

        return;
      }

      if (data) {
        toast.success(
          formData.role === "customer"
            ? "Customer Account Created Successfully!"
            : "Account Created Successfully!",
        );

        router.push("/");
        router.refresh();
      } else {
        toast.error("Account Creation Failed", {
          description: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);

      toast.error("Account Creation Failed", {
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return <AuthForm mode="signup" onSubmit={handleSubmit} />;
};

export default SignUpPage;
