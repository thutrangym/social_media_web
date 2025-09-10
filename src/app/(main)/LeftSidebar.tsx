import {
  Home,
  Hash,
  Bell,
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

const menu = [
  { icon: <Home />, label: "Home" },
  { icon: <Hash />, label: "Explore" },
  { icon: <Bell />, label: "Notifications" },
  { icon: <Mail />, label: "Messages" },
  { icon: <Bookmark />, label: "Bookmarks" },
  { icon: <List />, label: "Lists" },
  { icon: <User />, label: "Profile" },
  { icon: <MoreHorizontal />, label: "More" },
];

export default function LeftSidebar() {
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
          {menu.map((item, i) => (
            <Link
              key={i}
              href={`/${item.label.toLowerCase()}`}
              className="flex items-center space-x-3 text-lg font-medium hover:bg-gray-200 px-4 py-2 rounded-full w-fit"
            >
              <div className="h-6 w-6">{item.icon}</div>
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          ))}
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

