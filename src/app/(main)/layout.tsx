import { validateRequest } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import "stream-chat-react/dist/css/v2/index.css";

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
      <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
        {/* Container for the 3-column layout, now spanning full width */}
        <div className="flex min-h-screen">
          {/* Left Sidebar: Fixed width, positioned to the left */}
          <aside className="hidden h-screen w-[275px] flex-shrink-0 overflow-y-auto border-r border-gray-200 bg-white py-4 dark:border-gray-700 dark:bg-gray-800 md:sticky md:top-0 md:block">
            <LeftSidebar />
          </aside>

          {/* Main Feed: Grows to fill the remaining space */}
          <main className="w-full flex-grow overflow-y-auto border-x border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            {children}
          </main>

          {/* Right Sidebar: Fixed width, positioned to the right */}
          <aside className="hidden h-screen w-[350px] flex-shrink-0 overflow-y-auto border-l border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 lg:sticky lg:top-0 lg:block">
            <RightSidebar />
          </aside>
        </div>
      </div>
    </SessionProvider>
  );
}
