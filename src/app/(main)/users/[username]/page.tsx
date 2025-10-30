import { validateRequest } from "@/lib/server-auth";
import { cache } from "react";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FollowerInfo, getUserDataSelect, UserData } from "@/lib/types";

import UserAvatar from "@/components/UserAvatar";
import { formatDate } from "date-fns";
import { formatNumber } from "@/lib/utils";
import FollowerCount from "@/components/FollowerCount";
import FollowButton from "@/components/FollowButton";
import UserPosts from "./UserPosts";
import Linkify from "@/components/Linkify";
import EditProfileButton from "./EditProfileButton";

interface PageProps {
  params: { username: string };
}

// Sử dụng cache để tránh gọi lại query giống nhau nhiều lần trong một request
const getUser = cache(async (username: string, loggedInUserId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    // getUserDataSelect giúp chọn các trường cần thiết một cách nhất quán
    select: getUserDataSelect(loggedInUserId),
  });

  if (!user) notFound();

  return user;
});

export async function generateMetadata({
  params: { username },
}: PageProps): Promise<Metadata> {
  const { user: loggedInUser } = await validateRequest();

  // Cần đăng nhập để xem metadata vì getUser yêu cầu loggedInUserId
  if (!loggedInUser) return {};

  const user = await getUser(username, loggedInUser.id);

  return {
    title: `${user.displayName} (@${user.username})`,
  };
}

export default async function Page({ params: { username } }: PageProps) {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) {
    return (
      <p className="text-destructive">
        You&apos;re not authorized to view this page.
      </p>
    );
  }

  const user = await getUser(username, loggedInUser.id);

  return (
    <main className="flex w-full min-w-0 flex-col gap-5">
      <UserProfile user={user} loggedInUserId={loggedInUser.id} />
      <div className="rounded-2xl bg-card p-5 shadow-sm">
        <h2 className="text-center text-2xl font-bold">
          {user.displayName}&apos;s posts
        </h2>
      </div>
      <UserPosts userId={user.id} />
    </main>
  );
}

interface UserProfileProps {
  user: UserData;
  loggedInUserId: string;
}

// Đây là một Server Component, giúp render HTML tĩnh và tối ưu performance
async function UserProfile({ user, loggedInUserId }: UserProfileProps) {
  const followerInfo: FollowerInfo = {
    followers: user._count.followers,
    isFollowedByUser: user.followers.some(
      ({ follower }) => follower.id === loggedInUserId,
    ),
  };

  return (
    <div className="h-fit w-full space-y-4 rounded-2xl bg-card p-5 shadow-sm">
      {/* Phần header: avatar + thông tin + nút */}
      <div className="flex flex-wrap items-center gap-4">
        <UserAvatar
          avatarUrl={user.avatarUrl}
          size={100}
          className="flex-shrink-0 rounded-full"
        />
        <div className="flex w-full min-w-0 flex-wrap gap-3 sm:flex-nowrap">
          <div className="me-auto space-y-3">
            <div>
              <h1 className="break-words text-3xl font-bold">
                {user.displayName}
              </h1>
              <div className="text-muted-foreground">@{user.username}</div>
            </div>
            <div>Member since {formatDate(user.createdAt, "MMM d, yyyy")}</div>
            <div className="flex flex-wrap items-center gap-3">
              <span>
                Posts:{" "}
                <span className="font-semibold">
                  {formatNumber(user._count.posts)}
                </span>
              </span>
              <FollowerCount userId={user.id} initialState={followerInfo} />
            </div>
          </div>

          {user.id === loggedInUserId ? (
            <EditProfileButton user={user} />
          ) : (
            <FollowButton userId={user.id} initialState={followerInfo} />
          )}
        </div>
      </div>

      {/* Phần bio nằm dưới */}
      {user.bio && (
        <Linkify>
          <div className="overflow-hidden whitespace-pre-line break-words">
            {user.bio}
          </div>
        </Linkify>
      )}
    </div>
  );
}
