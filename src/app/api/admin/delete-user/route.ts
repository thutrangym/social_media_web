import { NextRequest } from "next/server";
import { deleteUserByAdmin } from "@/app/(main)/users/[username]/actions";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { userId } = body as { userId?: string };

  if (!userId) {
    return new Response(JSON.stringify({ error: "userId required" }), {
      status: 400,
    });
  }

  try {
    const result = await deleteUserByAdmin(userId);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error("admin delete user error", err);
    const message =
      err instanceof Error ? err.message : "Failed to delete user";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}
