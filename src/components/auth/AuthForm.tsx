"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import {
  ArrowRight,
  ArrowUpRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Camera,
  UserRound,
  Sparkles,
  ShieldCheck,
  Package,
  Zap,
  CircleX,
  CircleCheck,
  BriefcaseBusiness,
} from "lucide-react";

export type UserRole = "customer" | "owner";

export type FormDataProps = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  image?: string;
};

export type AuthFormProps = {
  mode: "signup" | "signin";
  onSubmit: (formData: FormDataProps) => void | Promise<void>;
};

type FormFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  icon: ReactNode;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  rightElement?: ReactNode;
};

const inputClass =
  "h-[50px] w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-[#813D21] focus:ring-4 focus:ring-[#813D21]/10";

function FormField({
  label,
  name,
  type = "text",
  placeholder,
  icon,
  required = true,
  value,
  onChange,
  rightElement,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-semibold text-foreground">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange ? (event) => onChange(event.target.value) : undefined}
          className={`${inputClass} ${rightElement ? "pr-12" : ""}`}
        />

        {rightElement && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}

const roles = [
  {
    value: "customer" as const,
    label: "Customer",
    description: "Rent equipment",
    icon: UserRound,
  },
  {
    value: "owner" as const,
    label: "Owner",
    description: "List equipment",
    icon: BriefcaseBusiness,
  },
];

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const isSignUp = mode === "signup";

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");

  const passwordRules = [
    { label: "At least 6 characters", valid: password.length >= 6 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One lowercase letter", valid: /[a-z]/.test(password) },
  ];

  const allPasswordRulesValid = passwordRules.every((rule) => rule.valid);

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Google authentication service not responding.",
      );
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const values: FormDataProps = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
      role: selectedRole,
      image: String(formData.get("image") || "").trim(),
    };

    await onSubmit(values);
  };

  const primaryButton =
    "group flex h-[50px] w-full items-center justify-center gap-3 rounded-[10px] border border-[var(--rz-heading)] bg-[image:var(--rz-btn-gradient)] px-5 text-sm font-bold text-[#F3DFC2] shadow-[0_4px_10px_rgba(166,83,46,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[image:var(--rz-btn-gradient-hover)] hover:shadow-[0_7px_18px_rgba(166,83,46,0.25)]";

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-[var(--rz-heading)]">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-[var(--rz-heading)]">
            {isSignUp ? "Sign Up" : "Sign In"}
          </span>
        </div>

        <div className="grid overflow-hidden rounded-[26px] border border-border bg-card shadow-[0_20px_60px_rgba(60,40,25,0.09)] lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left Branding Panel */}
          <section className="relative flex flex-col justify-between overflow-hidden bg-[#2b211b] p-7 text-white sm:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full bg-[#A6532E]/20 blur-3xl" />

            <div className="relative z-10">
              <Link href="/" className="inline-flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#B56D43] to-[#914321] text-[#F3DFC2] shadow-lg">
                  <Package size={24} />
                </span>

                <span>
                  <span className="block text-2xl font-extrabold">RentZone</span>
                  <span className="text-[9px] font-bold tracking-[2px] text-[#c6a68d]">
                    RENT SMART. WORK BETTER.
                  </span>
                </span>
              </Link>
            </div>

            <div className="relative z-10 my-12">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#c58a63]/30 bg-[#a6532e]/20 px-4 py-2 text-[11px] font-bold tracking-wider text-[#edbd91]">
                <Sparkles size={14} />
                {isSignUp ? "WELCOME TO RENTZONE" : "WELCOME BACK"}
              </span>

              <h1 className="max-w-lg text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                {isSignUp ? "Find What You Need." : "Your Next Project"}
                <span className="mt-1 block text-[#e49a58]">
                  {isSignUp ? "Rent With Ease." : "Starts Here."}
                </span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/65">
                {isSignUp
                  ? "Create your account and discover quality equipment for every project. Simple booking, flexible rentals, and a smarter way to work."
                  : "Sign in to manage your rentals, explore equipment, and continue where you left off."}
              </p>

              <div className="mt-8 space-y-3">
                {[
                  {
                    icon: <Zap size={19} />,
                    title: "Quick & Easy Booking",
                    description: "Find and reserve equipment in a few steps",
                  },
                  {
                    icon: <Package size={19} />,
                    title: "Quality Equipment",
                    description: "Explore equipment for different needs",
                  },
                  {
                    icon: <ShieldCheck size={19} />,
                    title: "Reliable Experience",
                    description: "Manage your rentals with confidence",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ed7b36] to-[#b84c25] shadow-lg">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold">{item.title}</h3>
                      <p className="mt-1 text-xs text-white/55">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
              {[
                { value: "Easy", label: "BOOKING" },
                { value: "Quality", label: "EQUIPMENT" },
                { value: "Secure", label: "RENTALS" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-white/[0.05] px-2 py-4 text-center"
                >
                  <p className="text-lg font-extrabold text-[#e49a58]">{item.value}</p>
                  <p className="mt-1 text-[9px] font-semibold tracking-wider text-white/50">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Right Form Panel */}
          <section
            className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-10"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--rz-copper, #A6532E) 7%, var(--background)), var(--card) 55%, color-mix(in srgb, var(--rz-copper, #A6532E) 5%, var(--background)))",
            }}
          >
            <div className="mx-auto w-full max-w-[410px]">
              <div className="mb-7">
                <div
                  className="mb-4 flex size-12 items-center justify-center rounded-xl border text-[var(--rz-heading)]"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--rz-copper, #A6532E) 12%, var(--card))",
                    borderColor:
                      "color-mix(in srgb, var(--rz-copper, #A6532E) 25%, var(--border))",
                  }}
                >
                  <UserRound size={24} />
                </div>

                <h2 className="text-2xl font-extrabold tracking-tight text-[var(--rz-heading)] sm:text-3xl">
                  {isSignUp ? "Create Account" : "Welcome Back"}
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {isSignUp
                    ? "Create your account to get started with RentZone."
                    : "Sign in to access your RentZone account."}
                </p>
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-border bg-card text-sm font-semibold text-foreground transition-all duration-300 hover:border-[var(--rz-heading)] hover:bg-[var(--rz-heading)]/5"
              >
                <span className="text-lg font-extrabold text-[#4285F4]">G</span>
                Continue with Google
              </button>

              {/* Role Selection */}
              {isSignUp && (
                <div className="mt-5">
                  <p className="mb-3 text-xs font-semibold text-muted-foreground">
                    SELECT YOUR ACCOUNT TYPE
                  </p>

                  <div className="grid grid-cols-3 gap-2">
                    {roles.map((role) => {
                      const Icon = role.icon;
                      const isSelected = selectedRole === role.value;

                      return (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() => setSelectedRole(role.value)}
                          aria-pressed={isSelected}
                          className={`flex min-w-0 flex-col items-center justify-center gap-2 rounded-xl border px-2 py-3 text-center transition-all ${
                            isSelected
                              ? "border-[#A6532E] bg-[#A6532E]/10 text-[var(--rz-heading)] ring-2 ring-[#A6532E]/10"
                              : "border-border bg-card text-muted-foreground hover:border-[#A6532E]/50"
                          }`}
                        >
                          <Icon size={19} />
                          <span className="text-xs font-bold">{role.label}</span>
                          <span className="text-[9px] leading-tight opacity-70">
                            {role.description}
                          </span>
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      title="Admin accounts are created by the system administrator"
                      className="flex min-w-0 cursor-not-allowed flex-col items-center justify-center gap-2 rounded-xl border border-border bg-muted/50 px-2 py-3 text-center text-muted-foreground/60 opacity-70"
                    >
                      <ShieldCheck size={19} />
                      <span className="text-xs font-bold">Admin</span>
                      <span className="text-[9px] leading-tight">Restricted</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-[10px] font-semibold tracking-wider text-muted-foreground">
                  OR CONTINUE WITH EMAIL
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <>
                    <FormField
                      label="Full Name"
                      name="name"
                      placeholder="Enter your full name"
                      icon={<UserRound size={17} />}
                    />

                    <FormField
                      label="Photo URL"
                      name="image"
                      type="url"
                      placeholder="https://example.com/photo.jpg"
                      icon={<Camera size={17} />}
                      required={false}
                    />
                  </>
                )}

                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  icon={<Mail size={17} />}
                />

                <FormField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  icon={<LockKeyhole size={17} />}
                  value={password}
                  onChange={setPassword}
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                      className="text-muted-foreground transition-colors hover:text-[var(--rz-heading)]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />

                {isSignUp && (
                  <div className="space-y-2 rounded-xl border border-border bg-card/80 p-3">
                    <p className="text-xs font-semibold text-muted-foreground">
                      Password requirements
                    </p>

                    {passwordRules.map((rule) => (
                      <div key={rule.label} className="flex items-center gap-2 text-xs">
                        {rule.valid ? (
                          <CircleCheck size={15} className="shrink-0 text-[#813D21]" />
                        ) : (
                          <CircleX size={15} className="shrink-0 text-red-500" />
                        )}

                        <span
                          className={
                            rule.valid
                              ? "font-medium text-[#813D21]"
                              : "text-muted-foreground"
                          }
                        >
                          {rule.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {!isSignUp && (
                  <div className="flex justify-end">
                    <Link
                      href="/forgot-password"
                      className="text-sm font-semibold text-[var(--rz-heading)] transition-colors hover:text-[var(--rz-heading-hover)] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSignUp && !allPasswordRulesValid}
                  className={`${primaryButton} disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0`}
                >
                  {isSignUp ? "Create Account" : "Sign In"}
                  <span className="flex size-8 items-center justify-center rounded-full bg-[#38251d] transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight size={17} />
                  </span>
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <Link
                  href={isSignUp ? "/signin" : "/signup"}
                  className="font-semibold text-[var(--rz-heading)] transition-colors hover:text-[var(--rz-heading-hover)] hover:underline"
                >
                  {isSignUp ? "Sign In" : "Create Account"}
                  <ArrowUpRight className="ml-0.5 inline size-3.5" />
                </Link>
              </p>
            </div>
          </section>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} RentZone. All rights reserved.
        </p>
      </div>
    </main>
  );
}
