"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Package,
  RefreshCw,
  Search,
  MapPin,
  Boxes,
  Eye,
  Pencil,
  Trash2,
  LoaderCircle,
  AlertCircle,
  Info,
} from "lucide-react";

import { DashboardPageHeader } from "@/app/components/dashboard/DashboardPageHeader";
import { Card } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { apiFetch } from "@/lib/api";
import type { Equipment } from "@/types/equipment";

type EquipmentResponse = {
  success: boolean;
  message: string;
  equipment: Equipment[];
};

type DeleteResponse = {
  success: boolean;
  message: string;
};

const statusStyles: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  approved: "bg-green-500/10 text-green-600 border-green-500/20",
  rejected: "bg-red-500/10 text-red-600 border-red-500/20",
};

export default function DashboardOwnerMyEquipmentPage() {
  const router = useRouter();

  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Dialog states
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null,
  );

  const [viewEquipment, setViewEquipment] = useState<Equipment | null>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch owner's equipment
  const fetchEquipment = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const result = await apiFetch<EquipmentResponse>("/api/owner/equipment");

      setEquipment(result.equipment || []);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load your equipment.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

  // Open delete confirmation dialog
  const handleDeleteClick = (item: Equipment) => {
    setSelectedEquipment(item);
  };

  // Delete equipment
  const handleDeleteEquipment = async () => {
    if (!selectedEquipment) return;

    const equipmentId = selectedEquipment._id;

    try {
      setDeletingId(equipmentId);

      const result = await apiFetch<DeleteResponse>(
        `/api/owner/equipment/${equipmentId}`,
        {
          method: "DELETE",
        },
      );

      toast.success(result.message || "Equipment deleted successfully!");

      setSelectedEquipment(null);

      await fetchEquipment();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete equipment.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Filter equipment
  const filteredEquipment = equipment.filter((item) => {
    const search = searchTerm.toLowerCase();

    return (
      item.name.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search)
    );
  });

  // Get rental price information
  const getRentalPrices = (item: Equipment) => {
    return item.rentalTypes
      .map((type: string) => {
        const price = item.rentalPrice[type];

        if (price === null || price === undefined) return null;

        return (
          <span key={type} className="block capitalize">
            ${price} / {type}
          </span>
        );
      })
      .filter(Boolean);
  };

  // Get rental terms
  const getRentalTerms = (terms?: string[] | string) => {
    if (!terms) return [];

    return Array.isArray(terms) ? terms : [terms];
  };

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Owner Dashboard"
        description="Manage and monitor all the equipment you have listed for rent."
      />

      {/* Page Overview */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="flex items-center gap-4 border-border bg-card p-5 shadow-sm">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#A6532E]/10 text-[#A6532E]">
            <Package className="size-6" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Total Equipment</p>
            <h3 className="mt-1 text-2xl font-bold text-foreground">
              {equipment.length}
            </h3>
          </div>
        </Card>

        <Card className="flex items-center gap-4 border-border bg-card p-5 shadow-sm">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
            <Boxes className="size-6" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Pending Approval</p>
            <h3 className="mt-1 text-2xl font-bold text-foreground">
              {equipment.filter((item) => item.status === "pending").length}
            </h3>
          </div>
        </Card>
      </div>

      {/* Equipment Table */}
      <Card className="overflow-hidden border-border bg-card shadow-sm">
        <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">My Equipment</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              View and manage your listed equipment.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search equipment..."
                className="w-full rounded-xl border border-input bg-background py-2.5 pl-9 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-[#A6532E] focus:ring-2 focus:ring-[#A6532E]/20 sm:w-56"
              />
            </div>

            <button
              type="button"
              onClick={fetchEquipment}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-[#A6532E] hover:bg-[#A6532E]/5 disabled:opacity-50"
            >
              <RefreshCw
                className={`size-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <LoaderCircle className="size-8 animate-spin text-[#A6532E]" />
            <p className="text-sm text-muted-foreground">
              Loading your equipment...
            </p>
          </div>
        ) : error ? (
          /* Error State */
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
              <AlertCircle className="size-6" />
            </div>

            <h3 className="font-bold text-foreground">
              Unable to load equipment
            </h3>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchEquipment}
              className="mt-5 rounded-xl bg-gradient-to-r from-[#A6532E] to-[#844225] px-5 py-2.5 text-sm font-bold text-[#F3DFC2] transition-all hover:-translate-y-0.5"
            >
              Try Again
            </button>
          </div>
        ) : filteredEquipment.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-[#A6532E]/10 text-[#A6532E]">
              <Package className="size-8" />
            </div>

            <h3 className="text-lg font-bold text-foreground">
              {searchTerm ? "No equipment found" : "No equipment added yet"}
            </h3>

            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              {searchTerm
                ? "Try searching with a different equipment name or category."
                : "Your listed equipment will appear here after you add them."}
            </p>
          </div>
        ) : (
          /* Equipment Table */
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Equipment
                  </th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Category
                  </th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Rental Price
                  </th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Quantity
                  </th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredEquipment.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-border last:border-0 transition-colors hover:bg-muted/30"
                  >
                    {/* Equipment Name */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="size-12 shrink-0 rounded-xl border border-border bg-muted object-cover"
                        />

                        <div className="min-w-0">
                          <p className="max-w-[180px] truncate text-sm font-bold text-foreground">
                            {item.name}
                          </p>

                          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="size-3" />
                            <span className="max-w-[150px] truncate">
                              {item.location}
                            </span>
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-muted px-3 py-1.5 text-xs font-semibold text-foreground">
                        {item.category}
                      </span>
                    </td>

                    {/* Rental Price */}
                    <td className="px-5 py-4">
                      <div className="space-y-1 text-xs font-semibold text-foreground">
                        {getRentalPrices(item)}
                      </div>
                    </td>

                    {/* Available Quantity */}
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-foreground">
                        {item.availableQuantity}
                      </span>
                      <span className="ml-1 text-xs text-muted-foreground">
                        units
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold capitalize ${
                          statusStyles[item.status] ||
                          "border-border bg-muted text-muted-foreground"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setViewEquipment(item)}
                          title="View Equipment Details"
                          className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-[#A6532E]/30 hover:bg-[#A6532E]/10 hover:text-[#A6532E]"
                        >
                          <Eye className="size-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            router.push(`/dashboard/owner/edit/${item._id}`)
                          }
                          title="Update Equipment"
                          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-[#A6532E]/10 hover:text-[#A6532E]"
                        >
                          <Pencil className="size-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteClick(item)}
                          disabled={deletingId !== null}
                          title="Delete Equipment"
                          className="flex size-9 items-center justify-center rounded-lg border border-border text-red-500 transition-colors hover:border-red-500/30 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-t border-border px-5 py-4">
              <p className="text-xs text-muted-foreground">
                Showing{" "}
                <span className="font-bold text-foreground">
                  {filteredEquipment.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-foreground">
                  {equipment.length}
                </span>{" "}
                equipment items
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* Equipment Details Dialog */}
      <Dialog
        open={viewEquipment !== null}
        onOpenChange={(open) => {
          if (!open) setViewEquipment(null);
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Equipment Details
            </DialogTitle>

            <DialogDescription>
              Complete information about your listed equipment.
            </DialogDescription>
          </DialogHeader>

          {viewEquipment && (
            <div className="space-y-6">
              {/* Equipment Image */}
              <div className="overflow-hidden rounded-xl border border-border bg-muted">
                <img
                  src={viewEquipment.image}
                  alt={viewEquipment.name}
                  className="h-56 w-full object-cover"
                />
              </div>

              {/* Additional Images */}
              {viewEquipment.images && viewEquipment.images.length > 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {viewEquipment.images
                    .filter((image: string) => image !== viewEquipment.image)
                    .map((image: string, index: number) => (
                      <img
                        key={`${image}-${index}`}
                        src={image}
                        alt={`${viewEquipment.name} ${index + 2}`}
                        className="h-24 w-full rounded-lg border border-border object-cover"
                      />
                    ))}
                </div>
              )}

              {/* Name and Status */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {viewEquipment.name}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {viewEquipment.category}
                  </p>
                </div>

                <span
                  className={`rounded-full border px-3 py-1.5 text-xs font-bold capitalize ${
                    statusStyles[viewEquipment.status] ||
                    "border-border bg-muted text-muted-foreground"
                  }`}
                >
                  {viewEquipment.status}
                </span>
              </div>

              {/* Description */}
              <div>
                <h4 className="mb-2 text-sm font-bold text-foreground">
                  Description
                </h4>

                <p className="whitespace-pre-line text-sm leading-6 text-muted-foreground">
                  {viewEquipment.description || "No description provided."}
                </p>
              </div>

              {/* Basic Information */}
              <div>
                <h4 className="mb-3 text-sm font-bold text-foreground">
                  Basic Information
                </h4>

                <div className="grid gap-4 rounded-xl border border-border p-4 sm:grid-cols-2">
                  {[
                    ["Brand", viewEquipment.brand],
                    ["Model", viewEquipment.model],
                    ["Location", viewEquipment.location],
                    ["Condition", viewEquipment.condition],
                    [
                      "Available Quantity",
                      `${viewEquipment.availableQuantity} units`,
                    ],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-xs text-muted-foreground">{label}</p>

                      <p className="mt-1 text-sm font-semibold text-foreground">
                        {value || "Not provided"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rental Prices */}
              <div>
                <h4 className="mb-3 text-sm font-bold text-foreground">
                  Rental Pricing
                </h4>

                <div className="grid gap-3 sm:grid-cols-3">
                  {(["daily", "weekly", "monthly"] as const).map((type) => (
                    <div
                      key={type}
                      className="rounded-xl border border-border bg-muted/30 p-4"
                    >
                      <p className="text-xs capitalize text-muted-foreground">
                        {type}
                      </p>

                      <p className="mt-2 text-lg font-bold text-[#A6532E]">
                        {viewEquipment.rentalPrice?.[type] !== null &&
                        viewEquipment.rentalPrice?.[type] !== undefined
                          ? `$${viewEquipment.rentalPrice[type]}`
                          : "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rental Types */}
              <div>
                <h4 className="mb-3 text-sm font-bold text-foreground">
                  Rental Types
                </h4>

                <div className="flex flex-wrap gap-2">
                  {(viewEquipment.rentalTypes?.length ?? 0) > 0 ? (
                    viewEquipment.rentalTypes.map((type: string) => (
                      <span
                        key={type}
                        className="rounded-lg bg-[#A6532E]/10 px-3 py-1.5 text-xs font-semibold capitalize text-[#A6532E]"
                      >
                        {type}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No rental types available.
                    </p>
                  )}
                </div>
              </div>

              {/* Rental Terms */}
              <div>
                <h4 className="mb-3 text-sm font-bold text-foreground">
                  Rental Terms
                </h4>

                {getRentalTerms(viewEquipment.rentalTerms).length > 0 ? (
                  <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                    {getRentalTerms(viewEquipment.rentalTerms).map(
                      (term, index) => (
                        <li key={index}>{term}</li>
                      ),
                    )}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No rental terms provided.
                  </p>
                )}
              </div>

              {/* Created Date */}
              <div className="flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                <Info className="size-4" />
                Added on:{" "}
                {viewEquipment.createdAt
                  ? new Date(viewEquipment.createdAt).toLocaleDateString()
                  : "Not available"}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={selectedEquipment !== null}
        onOpenChange={(open) => {
          if (!open && deletingId === null) {
            setSelectedEquipment(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
              <Trash2 className="size-6" />
            </div>

            <DialogTitle className="text-lg font-bold">
              Delete Equipment?
            </DialogTitle>

            <DialogDescription className="leading-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {selectedEquipment?.name}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4 flex-col-reverse gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => setSelectedEquipment(null)}
              disabled={deletingId !== null}
              className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleDeleteEquipment}
              disabled={deletingId !== null}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {deletingId !== null ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="size-4" />
                  Confirm Delete
                </>
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
