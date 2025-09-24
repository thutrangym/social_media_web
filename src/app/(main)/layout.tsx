import { validateRequest } from "@/lib/server-auth";

import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  if (!session.user) {
    // Redirect to login page if user is not authenticated
    redirect("/login");
  }

  // At this point, session.user is guaranteed to be non-null
  return (
    <SessionProvider
      value={{ ...session, user: session.user!, session: session.session! }}
    >
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {/* Left Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto">
          <LeftSidebar />
        </aside>

        {/* Main Feed */}
        <main className="flex-1 max-w-2xl border-x border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-4 space-y-4">{children}</div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:flex w-80 border-l border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
          <RightSidebar />
        </aside>
      </div>
    </SessionProvider>
  );
}
