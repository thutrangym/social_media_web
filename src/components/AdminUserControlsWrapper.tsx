"use client";

import AdminUserControls from "./AdminUserControls";

interface AdminUserControlsWrapperProps {
  targetUserId: string;
}

export default function AdminUserControlsWrapper({
  targetUserId,
}: AdminUserControlsWrapperProps) {
  return <AdminUserControls targetUserId={targetUserId} />;
}
