"use server";
import { cookies } from "next/headers";
import { lucia } from "@/auth";
import { cache } from "react";
import { Session, User } from "lucia";

export const validateRequest = cache(
  async (): Promise<{ user: User | null; session: Session | null }> => {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return { user: null, session: null };
    }
    try {
      const result = await lucia.validateSession(sessionId);
      try {
        if (result.session && result.session.fresh) {
          const sessionCookie = lucia.createSessionCookie(result.session.id);
          (await cookies()).set(sessionCookie.name, sessionCookie.value, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          });
        }
        if (!result.session) {
          const sessionCookie = lucia.createBlankSessionCookie();
          (await cookies()).set(sessionCookie.name, sessionCookie.value, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          });
        }
      } catch (error) {
        console.error("Error while handling session cookies:", error);
      }
      return result;
    } catch (error) {
      console.error("Error during session validation:", error);
      const sessionCookie = lucia.createBlankSessionCookie();
      (await cookies()).set(sessionCookie.name, sessionCookie.value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return { user: null, session: null };
    }
  }
);
