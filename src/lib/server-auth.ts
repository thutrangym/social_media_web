"use server";
import { cookies } from "next/headers";
import { lucia, DatabaseUserAttributes } from "@/auth";
import { cache } from "react";
import { Session, User } from "lucia";
import { redirect } from "next/navigation";

export type CustomUser = User & DatabaseUserAttributes;

export type AuthResult =
  | { user: CustomUser; session: Session }
  | { user: null; session: null };

export const validateRequest = cache(async (): Promise<AuthResult> => {
  const sessionId =
    (await cookies()).get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) return { user: null, session: null };

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch {}
  return result as AuthResult;
});

export async function assertAdmin(): Promise<CustomUser> {
  const { user } = await validateRequest();
  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }
  if (user.role !== "ADMIN") {
    throw new Error("403: Forbidden - Admin access required.");
  }
  return user;
}

export async function isSignedIn(): Promise<boolean> {
  const { user } = await validateRequest();
  return !!user;
}
