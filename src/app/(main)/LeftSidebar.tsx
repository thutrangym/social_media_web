import {
  Home,
  Hash,
  Mail,
  Bookmark,
  List,
  User,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo.jpg";
import Link from "next/link";
import UserButton from "@/components/UserButton";
import { validateRequest } from "@/lib/server-auth";
import prisma from "@/lib/prisma";
import NotificationsButton from "./NotificationsButton";

export default async function LeftSidebar({}) {
  const { user } = await validateRequest();

  if (!user) return null;

  const unreadNotificationCount = await prisma.notification.count({
    where: {
      recipientId: user.id,
      read: false,
    },
  });

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

          <Link
            href="/explore"
            className="flex items-center space-x-3 text-lg font-medium hover:bg-gray-200 px-4 py-2 rounded-full w-fit"
          >
            <Hash className="h-6 w-6" />
            <span className="hidden md:inline">Explore</span>
          </Link>

          <NotificationsButton
            initialState={{ unreadCount: unreadNotificationCount }}
          />

          <Link
            href="/messages"
            className="flex items-center space-x-3 text-lg font-medium hover:bg-gray-200 px-4 py-2 rounded-full w-fit"
          >
            <Mail className="h-6 w-6" />
            <span className="hidden md:inline">Messages</span>
          </Link>

          <Link
            href="/bookmarks"
            className="flex items-center space-x-3 text-lg font-medium hover:bg-gray-200 px-4 py-2 rounded-full w-fit"
          >
            <Bookmark className="h-6 w-6" />
            <span className="hidden md:inline">Bookmarks</span>
          </Link>

          <Link
            href="/lists"
            className="flex items-center space-x-3 text-lg font-medium hover:bg-gray-200 px-4 py-2 rounded-full w-fit"
          >
            <List className="h-6 w-6" />
            <span className="hidden md:inline">Lists</span>
          </Link>

          <Link
            href={`/users/${user?.username}`}
            className="flex items-center space-x-3 text-lg font-medium hover:bg-gray-200 px-4 py-2 rounded-full w-fit"
          >
            <User className="h-6 w-6" />
            <span className="hidden md:inline">Profile</span>
          </Link>

          <Link
            href="/more"
            className="flex items-center space-x-3 text-lg font-medium hover:bg-gray-200 px-4 py-2 rounded-full w-fit"
          >
            <MoreHorizontal className="h-6 w-6" />
            <span className="hidden md:inline">More</span>
          </Link>
        </nav>

        {/* Post Button */}
        <button className="mt-6 w-full bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600">
          Post
        </button>
      </div>

      {/* User Profile Section */}
      <UserButton />
    </aside>
  );
}
