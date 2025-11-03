import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { assertAdmin } from "@/lib/server-auth";

export async function POST(req: NextRequest) {
  await assertAdmin();

  const body = await req.json().catch(() => ({}));
  const { userId, username } = body as { userId?: string; username?: string };

  if (!userId && !username) {
    return new Response(
      JSON.stringify({ error: "userId or username required" }),
      { status: 400 },
    );
  }

  try {
    let targetUserId = userId;
    if (!targetUserId && username) {
      const found = await prisma.user.findUnique({ where: { username } });
      if (!found)
        return new Response(JSON.stringify({ error: "User not found" }), {
          status: 404,
        });
      targetUserId = found.id;
    }

    const updated = await prisma.user.update({
      where: { id: targetUserId! },
      data: { role: "ADMIN" },
    });

    // Update any existing sessions for this user so their session role reflects the new user role immediately.
    try {
      await prisma.session.updateMany({
        where: { userId: updated.id },
        data: { role: "ADMIN" },
      });
    } catch (e) {
      console.warn("Failed updating sessions role for promoted user", e);
    }

    return new Response(
      JSON.stringify({
        success: true,
        user: {
          id: updated.id,
          username: updated.username,
          role: updated.role,
        },
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("promote admin error", error);
    const message =
      error instanceof Error ? error.message : "Failed to promote user";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}
