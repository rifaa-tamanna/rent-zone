"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Heart, Trash2, Eye, LoaderCircle, AlertCircle, RefreshCw } from "lucide-react";

import { DashboardPageHeader } from "@/app/components/dashboard/DashboardPageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";

interface FavoriteItem {
  _id: string;
  equipmentId: string;
  equipmentName: string;
  category: string;
  rentalPrice?: {
    daily?: number | null;
  };
  image?: string;
  location?: string;
  createdAt: string;
  equipment?: {
    _id: string;
    name: string;
    category: string;
    rentalPrice?: { daily?: number | null };
    location?: string;
    image?: string;
  };
}

export default function CustomerFavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState<string | null>(null);

  const fetchFavorites = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const result = await apiFetch<{ success: boolean; favorites: FavoriteItem[] }>(
        "/api/customer/favorites",
      );

      setFavorites(result.favorites || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load favorites.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleRemoveFavorite = async (equipmentId: string) => {
    try {
      setRemovingId(equipmentId);
      await apiFetch(`/api/customer/favorites/${equipmentId}`, {
        method: "DELETE",
      });

      toast.success("Removed from your favorites.");
      setFavorites((prev) => prev.filter((item) => item.equipmentId !== equipmentId));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to remove favorite.");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Customer Dashboard"
        description="Manage your bookmarked equipment items for quick reservation and rate monitoring."
      />

      <Card className="overflow-hidden border-border bg-card shadow-sm">
        {/* Title Bar */}
        <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">Favorites List</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Equipment items you have saved to rent later.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={fetchFavorites}
            disabled={isLoading}
            className="gap-1.5 rounded-xl border-border"
          >
            <RefreshCw className={`size-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <LoaderCircle className="size-8 animate-spin text-[#A6532E]" />
            <p className="text-sm text-muted-foreground">Loading favorites...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
              <AlertCircle className="size-6" />
            </div>
            <h3 className="font-bold text-foreground">Could not load favorites</h3>
            <p className="mt-1 text-sm text-muted-foreground">{error}</p>
            <Button onClick={fetchFavorites} className="mt-4 rounded-xl">
              Retry
            </Button>
          </div>
        ) : favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#A6532E]/10 text-[#A6532E]">
              <Heart className="size-7" />
            </div>
            <h3 className="text-base font-bold text-foreground">No favorite equipment saved</h3>
            <p className="mt-1 max-w-sm text-xs text-muted-foreground">
              Click the heart icon on any equipment item to save it here for fast access.
            </p>
            <Link
              href="/equipment"
              className="mt-5 inline-flex items-center justify-center rounded-xl border border-[var(--rz-heading)] bg-[image:var(--rz-btn-gradient)] px-4 py-2 font-bold text-[#F3DFC2]"
            >
              Explore Catalog
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3.5">Equipment</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Location</th>
                  <th className="px-5 py-3.5">Daily Rate</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {favorites.map((item) => {
                  const name = item.equipment?.name || item.equipmentName;
                  const cat = item.equipment?.category || item.category;
                  const loc = item.equipment?.location || item.location || "Bangladesh";
                  const price = item.equipment?.rentalPrice?.daily || item.rentalPrice?.daily || 0;
                  const image = item.equipment?.image || item.image;

                  return (
                    <tr key={item._id} className="transition-colors hover:bg-muted/30">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {image && (
                            <img
                              src={image}
                              alt={name}
                              className="size-11 rounded-xl border border-border object-cover"
                            />
                          )}
                          <span className="font-bold text-foreground">{name}</span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-xs font-semibold text-muted-foreground">
                        {cat}
                      </td>

                      <td className="px-5 py-4 text-xs text-muted-foreground">
                        {loc}
                      </td>

                      <td className="px-5 py-4 font-bold text-[var(--rz-heading)]">
                        ৳{price.toLocaleString("en-BD")}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/equipment/${item.equipmentId}`}
                            className="inline-flex h-7 items-center justify-center gap-1.5 rounded-xl border border-border px-2.5 text-[0.8rem] font-medium text-foreground hover:bg-muted"
                          >
                            <Eye className="size-3.5" />
                            View Details
                          </Link>

                          <Button
                            size="sm"
                            variant="outline"
                            disabled={removingId === item.equipmentId}
                            onClick={() => handleRemoveFavorite(item.equipmentId)}
                            className="size-8 rounded-xl border-border p-0 text-red-500 hover:bg-red-500/10 hover:text-red-600"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
