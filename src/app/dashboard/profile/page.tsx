"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  Camera,
  ShieldCheck,
  Save,
  LoaderCircle,
} from "lucide-react";

import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { DashboardPageHeader } from "@/app/components/dashboard/DashboardPageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UserProfile {
  name: string;
  email: string;
  image?: string;
  phone?: string;
  address?: string;
  role?: string;
}

export default function DashboardProfilePage() {
  const { data: session } = useSession();

  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    image: "",
    phone: "",
    address: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch current user's profile
  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await apiFetch<{ success: boolean; profile: UserProfile }>(
        "/api/customer/profile",
      );

      if (res?.profile) {
        setProfile(res.profile);
      } else if (session?.user) {
        setProfile({
          name: session.user.name || "",
          email: session.user.email || "",
          image: session.user.image || "",
          phone: "",
          address: "",
        });
      }
    } catch {
      if (session?.user) {
        setProfile({
          name: session.user.name || "",
          email: session.user.email || "",
          image: session.user.image || "",
          phone: "",
          address: "",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSaving(true);
      await apiFetch("/api/customer/profile", {
        method: "PUT",
        body: JSON.stringify(profile),
      });

      toast.success("Profile information updated successfully!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <DashboardPageHeader
        eyebrow="Account Settings"
        description="View and update your personal contact details, delivery address, and profile photo."
      />

      <Card className="overflow-hidden border-border bg-card p-6 shadow-sm sm:p-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <LoaderCircle className="size-8 animate-spin text-[#A6532E]" />
            <p className="text-sm text-muted-foreground">Loading your profile...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Avatar Header */}
            <div className="flex flex-col items-center gap-4 border-b border-border pb-6 sm:flex-row sm:items-center">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl border-2 border-border bg-muted">
                {profile.image ? (
                  <img src={profile.image} alt={profile.name} className="size-full object-cover" />
                ) : (
                  <div className="flex size-full items-center justify-center bg-gradient-to-br from-[#B56D43] to-[#914321] text-2xl font-bold text-[#F3DFC2]">
                    {(profile.name || "U").charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-lg font-bold text-foreground">{profile.name || "User"}</h3>
                <p className="text-xs text-muted-foreground">{profile.email}</p>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(166,83,46,0.25)] bg-[rgba(166,83,46,0.08)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--rz-heading)]">
                  <ShieldCheck className="size-3" />
                  {profile.role || (session?.user as { role?: string } | undefined)?.role || "Customer"} Account
                </span>
              </div>
            </div>

            {/* Profile Fields */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Full Name *
                </label>
                <div className="relative">
                  <UserRound className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm text-foreground outline-none focus:border-[#A6532E]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    disabled
                    value={profile.email}
                    className="h-11 w-full rounded-xl border border-input bg-muted/50 pl-10 pr-4 text-sm text-muted-foreground outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Profile Image URL
                </label>
                <div className="relative">
                  <Camera className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="url"
                    placeholder="https://example.com/avatar.jpg"
                    value={profile.image || ""}
                    onChange={(e) => setProfile({ ...profile, image: e.target.value })}
                    className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm text-foreground outline-none focus:border-[#A6532E]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="tel"
                    placeholder="+880 1700-000000"
                    value={profile.phone || ""}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm text-foreground outline-none focus:border-[#A6532E]"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Delivery / Residential Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
                <textarea
                  rows={3}
                  placeholder="Street address, city, district..."
                  value={profile.address || ""}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background p-3 pl-10 text-sm text-foreground outline-none focus:border-[#A6532E]"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isSaving}
                className="gap-2 rounded-xl border border-[var(--rz-heading)] bg-[image:var(--rz-btn-gradient)] px-6 font-bold text-[#F3DFC2] shadow-sm hover:bg-[image:var(--rz-btn-gradient-hover)]"
              >
                {isSaving ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    Update Profile
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
