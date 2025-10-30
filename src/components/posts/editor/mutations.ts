import { useToast } from "@/components/ui/use-toast";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { submitPost } from "./action";
import { PostsPage } from "@/lib/types";
import { useSession } from "@/app/(main)/SessionProvider";

export function useSubmitPostMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { user } = useSession();

  const mutation = useMutation({
    mutationFn: submitPost,
    onSuccess: async (newPost) => {
      const queryFilter = {
        queryKey: ["post-feed"],
        predicate(query) {
          return (
            query.queryKey.includes("for-you") ||
            (query.queryKey.includes("user-posts") &&
              query.queryKey.includes(user.id))
          );
        },
      } satisfies QueryFilters;

      await queryClient.cancelQueries(queryFilter);
      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          // If there is no cached data for the feed yet, create a first page
          if (!oldData) {
            return {
              pageParams: [null],
              pages: [
                {
                  posts: [newPost],
                  nextCursor: null,
                },
              ],
            };
          }

          const firstPage = oldData.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }

          return oldData;
        },
      );

      // Ensure any feed queries are refetched so UI stays consistent
      queryClient.invalidateQueries({ queryKey: ["post-feed"] });

      toast({
        description: "Post created",
      });
    },
    onError() {
      toast({
        variant: "destructive",
        description: "Failed to post. Please try again.",
      });
    },
  });
  return mutation;
}
