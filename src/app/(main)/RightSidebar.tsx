import TrendsSidebar from "@/components/TrendsSidebar";

export default function RightSidebar() {
  return (
    <aside className="p-4 space-y-4">
      
      {/* Trending Topics */}
      <TrendsSidebar/>
      {/* Footer Links */}
      <div className="text-xs text-gray-500 flex flex-wrap gap-2">
        <span>Terms of Service</span>
        <span>Privacy Policy</span>
        <span>Cookie Policy</span>
        <span>Accessibility</span>
        <span>Ads info</span>
        <span>More...</span>
        <p className="w-full mt-2">© 2023 SocialMediaConnect, Inc.</p>
      </div>
    </aside>
  );
}

