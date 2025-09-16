"use server";
import { cookies } from "next/headers";
import { lucia } from "@/auth";
import { cache } from "react";
import { Session, User } from "lucia";

export const validateRequest = cache(
  async (): Promise<{ user: User | null; session: Session | null }> => {
  const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return { user: null, session: null };
    try {
      const result = await lucia.validateSession(sessionId);
      return result;
    } catch (error) {
      console.error("Error during session validation:", error);
      return { user: null, session: null };
    }
  }
);
