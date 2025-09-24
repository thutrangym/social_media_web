import { Home, Hash, Bookmark, List, User, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo.jpg";
import Link from "next/link";
import UserButton from "@/components/UserButton";
import { validateRequest } from "@/lib/server-auth";
import prisma from "@/lib/prisma";
import NotificationsButton from "./NotificationsButton";
import streamServerClient from "@/lib/stream";
import MessagesButton from "./MessagesButton";

export default async function LeftSidebar({}) {
  const { user } = await validateRequest();

  if (!user) return null;

  let unreadMessagesCount = 0;
  const unreadNotificationsCount = await prisma.notification.count({
    where: {
      recipientId: user.id,
      read: false,
    },
  });
  try {
    unreadMessagesCount = (await streamServerClient.getUnreadCount(user.id))
      .total_unread_count;
  } catch (e) {
    unreadMessagesCount = 0;
    // Optionally log or handle user creation here
  }

  return (
    <aside className="p-4 flex flex-col justify-between h-full">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="mb-6">
          <Image src={logo} alt="Logo" width={40} height={40} />
        </div>

        {/* Menu Items */}
        <nav className="space-y-2">
          <Link
            href="/"
            className="flex items-center space-x-3 text-lg font-medium hover:bg-gray-200 px-4 py-2 rounded-full w-fit"
          >
            <Home className="h-6 w-6" />
            <span className="hidden md:inline">Home</span>
          </Link>

          <NotificationsButton
            initialState={{ unreadCount: unreadNotificationsCount }}
          />

          <MessagesButton initialState={{ unreadCount: unreadMessagesCount }} />

          <Link
            href="/bookmarks"
            className="flex items-center space-x-3 text-lg font-medium hover:bg-gray-200 px-4 py-2 rounded-full w-fit"
          >
            <Bookmark className="h-6 w-6" />
            <span className="hidden md:inline">Bookmarks</span>
          </Link>

          <Link
            href={`/users/${user?.username}`}
            className="flex items-center space-x-3 text-lg font-medium hover:bg-gray-200 px-4 py-2 rounded-full w-fit"
          >
            <User className="h-6 w-6" />
            <span className="hidden md:inline">Profile</span>
          </Link>
        </nav>
      </div>

      {/* User Profile Section */}
      <UserButton />
    </aside>
  );
}
