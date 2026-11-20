
"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { DashboardPageHeader } from "@/app/components/dashboard/DashboardPageHeader";
import { apiFetch } from "@/lib/api";
import { EquipmentForm } from "@/app/dashboard/EquipmentForm";

type Equipment = {
  _id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  rentalTypes: string[];
  rentalPrice: Record<string, number | null>;
  availableQuantity: number;
  condition: string;
  brand: string;
  model: string;
  image: string;
  images?: string[];
  rentalTerms?: string[] | string;
};

type EquipmentResponse = {
  success: boolean;
  message: string;
  equipment: Equipment[];
};

export default function DashboardOwnerEditEquipmentPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEquipment = useCallback(async () => {
    try {
      setIsLoading(true);

      const result = await apiFetch<EquipmentResponse>(
        "/api/owner/equipment",
      );

      const foundEquipment = result.equipment.find(
        (item) => item._id === params.id,
      );

      if (!foundEquipment) {
        toast.error("Equipment not found.");
        router.push("/dashboard/owner/my-equipment");
        return;
      }

      setEquipment(foundEquipment);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load equipment.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [params.id, router]);

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Owner Dashboard"
        description="Update your equipment information and rental details."
      />

      {isLoading ? (
        <div className="flex min-h-60 items-center justify-center">
          <LoaderCircle className="size-8 animate-spin text-[#A6532E]" />
        </div>
      ) : equipment ? (
        <EquipmentForm
          mode="edit"
          initialEquipment={equipment}
          onSuccess={() =>
            router.push("/dashboard/owner/my-equipment")
          }
        />
      ) : (
        <div className="rounded-xl border border-border p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Equipment could not be loaded.
          </p>

          <button
            type="button"
            onClick={fetchEquipment}
            className="mt-4 text-sm font-semibold text-[#A6532E]"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
