import RightSidebar from "./RightSidebar";
import LeftSidebar from "./LeftSidebar";
import PostEditor from "@/components/posts/editor/PostEditor";
import prisma from "@/lib/prisma";
import Post from "@/components/posts/Post";
import { postDataInclude } from "@/lib/types";
import TrendsSidebar from "@/components/TrendsSidebar";
import ForYouFeed from "./ForYouFeed";

export default function Home() {
  

  return (
    <main className="flex w-full min-w-0 gap-5">
      {/* Vùng chính */}
      <div className="flex-1 max-w-2xl mx-auto px-4">
        <div className="w-full min-w-0 space-y-5">

          <PostEditor />
          <ForYouFeed />
        </div>
      </div>

      {/* Sidebar phải */}
      
      
    </main>
  );
}

