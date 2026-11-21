"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Users,
  ShieldCheck,
  UserCheck,
  Trash2,
  LoaderCircle,
  AlertCircle,
  RefreshCw,
  Search,
} from "lucide-react";

import { DashboardPageHeader } from "@/app/components/dashboard/DashboardPageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { apiFetch } from "@/lib/api";

interface UserItem {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "owner" | "admin";
  image?: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Role Change Modal state
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [newRole, setNewRole] = useState<"customer" | "owner" | "admin">("customer");
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);

  // Delete User state
  const [userToDelete, setUserToDelete] = useState<UserItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const result = await apiFetch<{ success: boolean; users: UserItem[] }>(
        "/api/admin/users",
      );

      setUsers(result.users || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load registered users.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleOpenRoleModal = (user: UserItem) => {
    setSelectedUser(user);
    setNewRole(user.role);
  };

  const handleConfirmRoleChange = async () => {
    if (!selectedUser) return;

    try {
      setIsUpdatingRole(true);
      await apiFetch(`/api/admin/users/${selectedUser._id}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role: newRole }),
      });

      toast.success(`Role updated to ${newRole} for ${selectedUser.name}!`);
      setSelectedUser(null);
      await fetchUsers();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update role.");
    } finally {
      setIsUpdatingRole(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      setIsDeleting(true);
      await apiFetch(`/api/admin/users/${userToDelete._id}`, {
        method: "DELETE",
      });

      toast.success("User deleted successfully.");
      setUserToDelete(null);
      await fetchUsers();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete user.");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const s = searchTerm.toLowerCase();
    return u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s) || u.role.toLowerCase().includes(s);
  });

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Admin Dashboard"
        description="Oversee all registered accounts, assign administrative permissions, and manage user roles."
      />

      <Card className="overflow-hidden border-border bg-card shadow-sm">
        {/* Top Control Bar */}
        <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">Registered Users</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Total {users.length} accounts currently on RentZone.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search name, email, role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-full rounded-xl border border-input bg-background pl-9 pr-4 text-xs text-foreground outline-none focus:border-[#A6532E] sm:w-60"
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={fetchUsers}
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
            <p className="text-sm text-muted-foreground">Loading users...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
              <AlertCircle className="size-6" />
            </div>
            <h3 className="font-bold text-foreground">Could not load users</h3>
            <p className="mt-1 text-sm text-muted-foreground">{error}</p>
            <Button onClick={fetchUsers} className="mt-4 rounded-xl">
              Retry
            </Button>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-muted-foreground">No users found matching your search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3.5">User Information</th>
                  <th className="px-5 py-3.5">Email</th>
                  <th className="px-5 py-3.5">Role</th>
                  <th className="px-5 py-3.5">Registration Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="transition-colors hover:bg-muted/30">
                    {/* Name & Avatar */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#B56D43] to-[#914321] text-xs font-bold text-[#F3DFC2]">
                          {(user.name || "U").charAt(0).toUpperCase()}
                        </div>
                        <span className="font-bold text-foreground">{user.name || "User"}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-5 py-4 text-xs text-muted-foreground">
                      {user.email}
                    </td>

                    {/* Role */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-bold capitalize ${
                          user.role === "admin"
                            ? "border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400"
                            : user.role === "owner"
                              ? "border-[#A6532E]/30 bg-[#A6532E]/10 text-[#A6532E]"
                              : "border-border bg-muted text-muted-foreground"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Registration Date */}
                    <td className="px-5 py-4 text-xs text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenRoleModal(user)}
                          className="gap-1.5 rounded-xl border-border text-xs"
                        >
                          <UserCheck className="size-3.5" />
                          Change Role
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setUserToDelete(user)}
                          className="size-8 rounded-xl border-border p-0 text-red-500 hover:bg-red-500/10 hover:text-red-600"
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

      {/* Role Change Modal */}
      <Dialog open={selectedUser !== null} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Change User Role</DialogTitle>
            <DialogDescription>
              Assign a new system role for <span className="font-semibold text-foreground">{selectedUser?.name}</span>.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-3">
            {(["customer", "owner", "admin"] as const).map((r) => (
              <label
                key={r}
                className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-all ${
                  newRole === r
                    ? "border-[#A6532E] bg-[#A6532E]/10 font-bold text-[#A6532E]"
                    : "border-border bg-background text-foreground hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="role"
                    value={r}
                    checked={newRole === r}
                    onChange={() => setNewRole(r)}
                    className="accent-[#A6532E]"
                  />
                  <div>
                    <p className="text-sm capitalize">{r}</p>
                    <p className="text-xs font-normal text-muted-foreground">
                      {r === "admin"
                        ? "Full platform control and equipment moderation"
                        : r === "owner"
                          ? "Can list equipment and accept rental bookings"
                          : "Can browse, favorite, and book equipment"}
                    </p>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <DialogFooter className="mt-5 flex gap-2">
            <Button variant="outline" onClick={() => setSelectedUser(null)} className="rounded-xl">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmRoleChange}
              disabled={isUpdatingRole}
              className="gap-2 rounded-xl border border-[var(--rz-heading)] bg-[image:var(--rz-btn-gradient)] font-bold text-[#F3DFC2]"
            >
              {isUpdatingRole ? <LoaderCircle className="size-4 animate-spin" /> : "Save Role"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Modal */}
      <Dialog open={userToDelete !== null} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Delete User Account?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <span className="font-semibold text-foreground">{userToDelete?.name}</span>? This action is permanent and cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-5 flex gap-2">
            <Button variant="outline" onClick={() => setUserToDelete(null)} className="rounded-xl">
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={isDeleting}
              onClick={handleDeleteUser}
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
