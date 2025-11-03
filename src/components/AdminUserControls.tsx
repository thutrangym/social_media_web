"use client";

import React from "react";
import { useSession } from "@/app/(main)/SessionProvider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface AdminUserControlsProps {
  targetUserId: string;
}

export default function AdminUserControls({
  targetUserId,
}: AdminUserControlsProps) {
  const { user } = useSession();
  const router = useRouter();

  // Only visible to admins and not for self
  if (!user || user.role !== "ADMIN" || user.id === targetUserId) return null;

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user? This action cannot be undone.",
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch("/api/admin/delete-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: targetUserId }),
      });
      const json = await res.json();
      if (!res.ok) {
        alert(json?.error ?? "Failed to delete user");
        return;
      }
      // after delete, navigate to home
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  }

  return (
    <Button variant="destructive" onClick={handleDelete}>
      Delete user
    </Button>
  );
}
