"use client";

import Link from "next/link";
import { LinkIt, LinkItUrl } from "react-linkify-it";
import UserLinkWithTooltip from "./UserLinkWithTooltip";
import React from "react";

interface LinkifyProps {
  children: React.ReactNode;
}

export default function Linkify({ children }: LinkifyProps) {
  return (
    <LinkifyUsername>
      <LinkifyHashtag>
        <LinkifyUrl>{children}</LinkifyUrl>
      </LinkifyHashtag>
    </LinkifyUsername>
  );
}

// 🔗 URL: hiển thị nổi bật, màu chính theo theme
function LinkifyUrl({ children }: LinkifyProps) {
  return (
    <LinkItUrl className="text-primary font-medium hover:underline dark:text-blue-400">
      {children}
    </LinkItUrl>
  );
}

// 👤 Username: thêm màu chính + hover underline + fix lỗi không return JSX
function LinkifyUsername({ children }: LinkifyProps) {
  return (
    <LinkIt
      regex={/(@[a-zA-Z0-9_-]+)/g}
      component={(match, key) => (
        <UserLinkWithTooltip key={key} username={match.slice(1)}>
          <span className="text-primary font-medium hover:underline dark:text-blue-400">
            {match}
          </span>
        </UserLinkWithTooltip>
      )}
    >
      {children}
    </LinkIt>
  );
}

// 🏷️ Hashtag: liên kết đến trang hashtag, màu thống nhất giao diện
function LinkifyHashtag({ children }: LinkifyProps) {
  return (
    <LinkIt
      regex={/(#[a-zA-Z0-9_]+)/g}
      component={(match, key) => (
        <Link
          key={key}
          href={`/hashtag/${match.slice(1)}`}
          className="text-primary font-medium hover:underline dark:text-blue-400"
        >
          {match}
        </Link>
      )}
    >
      {children}
    </LinkIt>
  );
}
