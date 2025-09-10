import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Google } from "arctic";
import { Lucia, Session, User } from "lucia";
// import { cookies } from "next/headers"; // Sử dụng trong Server Component
// import { cache } from "react";
import prisma from "./lib/prisma"; // Prisma client của bạn
//import { NextRequest } from 'next/server'; // Import kiểu NextRequest

// Tạo adapter cho Prisma
const adapter = new PrismaAdapter(prisma.session, prisma.user);

// Khởi tạo đối tượng Lucia với các cấu hình session
export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production", // Cookie chỉ dùng trong môi trường production
    },
  },
  getUserAttributes(databaseUserAttributes) {
    return {
      id: databaseUserAttributes.id,
      username: databaseUserAttributes.username,
      displayName: databaseUserAttributes.displayName,
      avatarUrl: databaseUserAttributes.avatarUrl,
      googleId: databaseUserAttributes.googleId,
    };
  },
});

// Mở rộng module "lucia" để giúp định nghĩa các thuộc tính người dùng trong cơ sở dữ liệu
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

// Interface cho thuộc tính người dùng trong cơ sở dữ liệu
interface DatabaseUserAttributes {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  googleId: string | null;
}

// Khởi tạo Google Auth
export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/google`,
);




