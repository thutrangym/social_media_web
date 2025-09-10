"use server";

import prisma from "@/lib/prisma";
import { loginSchema, LoginValues } from "@/lib/validation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { verify } from "@node-rs/argon2";
import { lucia } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(
  credentials: LoginValues,
): Promise<{ error: string }> {
  try {
    const { username, password } = loginSchema.parse(credentials);
    const existingUser = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (!existingUser || !existingUser.passwordHash) {
      return { error: "Invalid username or password" };
    }

    const validPassword = await verify(existingUser.passwordHash, password, {
      memoryCost: 1956,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validPassword) {
      return { error: "Invalid username or password" };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const setCookie = lucia.createSessionCookie(session.id);
    (await cookies()).set(
      setCookie.name,
      setCookie.value,
      setCookie.attributes,
    );

    return redirect("/");

  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return { error: "Something went wrong. Please try again again." };
  }
}
