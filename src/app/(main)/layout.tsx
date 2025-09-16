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
      <SessionProvider value={{ ...session, user: session.user!, session: session.session! }}>
        <div className="flex h-screen overflow-hidden">
          {/* Left Sidebar */}
          <aside className="hidden md:flex w-64 border-r overflow-y-auto">
            <LeftSidebar />
          </aside>
          {/* Main Feed */}
          <div className="flex-1 max-w-2xl border-x overflow-y-auto">
            {children}
          </div>
          {/* Right Sidebar */}
          <RightSidebar />
        </div>
      </SessionProvider>
    );
}

