import type { Metadata } from "next";
import SearchResults from "@/app/(main)/search/SearchResult";

interface Props {
  params: { tag: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const title = `#${params.tag}`;
  return {
    title,
    description: `Posts tagged with #${params.tag}`,
  };
}

export default function TagPage({ params }: Props) {
  const { tag } = params;
  return (
    <div className="space-y-6">
      <header className="p-4">
        <h1 className="text-2xl font-bold">#{tag}</h1>
      </header>
      {/* SearchResults is a client component that will query `/api/search?q=${tag}` */}
      <SearchResults query={tag} />
    </div>
  );
}
