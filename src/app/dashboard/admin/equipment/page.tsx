"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Package,
  CheckCircle2,
  XCircle,
  Pencil,
  Trash2,
  LoaderCircle,
  AlertCircle,
  RefreshCw,
  Search,
  Filter,
  Eye,
} from "lucide-react";

import { DashboardPageHeader } from "@/app/components/dashboard/DashboardPageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { apiFetch } from "@/lib/api";
import type { EquipmentItem } from "@/types/equipment";

const statusStyles: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  approved: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  rejected: "bg-red-500/10 text-red-600 border-red-500/20",
};

export default function AdminEquipmentPage() {
  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [itemToDelete, setItemToDelete] = useState<EquipmentItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchEquipment = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const query = statusFilter !== "all" ? `?status=${statusFilter}` : "";
      const result = await apiFetch<{ success: boolean; equipment: EquipmentItem[] }>(
        `/api/admin/equipment${query}`,
      );

      setEquipment(result.equipment || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load equipment list.");
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

  const handleUpdateStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      await apiFetch(`/api/admin/equipment/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      toast.success(`Equipment marked as ${status}!`);
      await fetchEquipment();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update equipment status.");
    }
  };

  const handleDeleteItem = async () => {
    if (!itemToDelete) return;

    try {
      setIsDeleting(true);
      await apiFetch(`/api/admin/equipment/${itemToDelete._id}`, {
        method: "DELETE",
      });

      toast.success("Equipment item deleted successfully.");
      setItemToDelete(null);
      await fetchEquipment();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete item.");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredEquipment = equipment.filter((item) => {
    const s = searchTerm.toLowerCase();
    return item.name.toLowerCase().includes(s) || item.category.toLowerCase().includes(s) || item.location.toLowerCase().includes(s);
  });

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Admin Dashboard"
        description="Moderate, approve, reject, or remove equipment listings submitted by owners."
      />

      <Card className="overflow-hidden border-border bg-card shadow-sm">
        {/* Controls Bar */}
        <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-foreground">Equipment Moderation</h2>
            <div className="flex gap-1.5">
              {["all", "pending", "approved", "rejected"].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold capitalize transition-colors ${
                    statusFilter === st
                      ? "bg-[#A6532E] text-white"
                      : "border border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-full rounded-xl border border-input bg-background pl-9 pr-4 text-xs text-foreground outline-none focus:border-[#A6532E] sm:w-56"
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={fetchEquipment}
              disabled={isLoading}
              className="gap-1.5 rounded-xl border-border"
            >
              <RefreshCw className={`size-3.5 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <LoaderCircle className="size-8 animate-spin text-[#A6532E]" />
            <p className="text-sm text-muted-foreground">Loading equipment...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
              <AlertCircle className="size-6" />
            </div>
            <h3 className="font-bold text-foreground">Could not load equipment</h3>
            <p className="mt-1 text-sm text-muted-foreground">{error}</p>
            <Button onClick={fetchEquipment} className="mt-4 rounded-xl">
              Retry
            </Button>
          </div>
        ) : filteredEquipment.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-muted-foreground">No equipment found matching criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3.5">Equipment</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Owner</th>
                  <th className="px-5 py-3.5">Daily Rate</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredEquipment.map((item) => (
                  <tr key={item._id} className="transition-colors hover:bg-muted/30">
                    {/* Equipment Name & Image */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="size-11 rounded-xl border border-border object-cover"
                          />
                        )}
                        <div>
                          <Link
                            href={`/equipment/${item._id}`}
                            className="font-bold text-foreground hover:text-[#A6532E] hover:underline"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs text-muted-foreground">{item.location}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4 text-xs font-semibold text-muted-foreground">
                      {item.category}
                    </td>

                    {/* Owner */}
                    <td className="px-5 py-4">
                      <p className="text-xs font-bold text-foreground">{item.ownerName || "Owner"}</p>
                      <p className="text-[11px] text-muted-foreground">{item.ownerEmail}</p>
                    </td>

                    {/* Daily Rate */}
                    <td className="px-5 py-4 font-bold text-[var(--rz-heading)]">
                      ৳{Number(item.rentalPrice?.daily || 0).toLocaleString("en-BD")}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold capitalize ${
                          statusStyles[item.status] || "border-border bg-muted text-muted-foreground"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {item.status !== "approved" && (
                          <Button
                            size="sm"
                            onClick={() => handleUpdateStatus(item._id, "approved")}
                            className="h-8 gap-1 rounded-lg bg-emerald-600 px-2.5 text-xs font-bold text-white hover:bg-emerald-700"
                          >
                            <CheckCircle2 className="size-3.5" />
                            Approve
                          </Button>
                        )}

                        {item.status !== "rejected" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateStatus(item._id, "rejected")}
                            className="h-8 gap-1 rounded-lg border-amber-500/30 text-xs font-bold text-amber-600 hover:bg-amber-500/10"
                          >
                            <XCircle className="size-3.5" />
                            Reject
                          </Button>
                        )}

                        <Link
                          href={`/equipment/${item._id}`}
                          className="inline-flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted"
                        >
                          <Eye className="size-3.5" />
                        </Link>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setItemToDelete(item)}
                          className="size-8 rounded-lg border-border p-0 text-red-500 hover:bg-red-500/10 hover:text-red-600"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Delete Confirmation Modal */}
      <Dialog open={itemToDelete !== null} onOpenChange={(open) => !open && setItemToDelete(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Delete Equipment?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <span className="font-semibold text-foreground">{itemToDelete?.name}</span>? This will permanently remove it from the platform.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-5 flex gap-2">
            <Button variant="outline" onClick={() => setItemToDelete(null)} className="rounded-xl">
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={isDeleting}
              onClick={handleDeleteItem}
              className="gap-2 rounded-xl"
            >
              {isDeleting ? <LoaderCircle className="size-4 animate-spin" /> : "Confirm Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
