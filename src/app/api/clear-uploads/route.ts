import prisma from "@/lib/prisma";
import { UTApi } from "uploadthing/server";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return Response.json("Unauthorized", { status: 401 });
    }

    const unusedMedia = await prisma.media.findMany({
      where: {
        postId: null,
        ...(process.env.NODE_ENV === "production"
          ? {
              createdAt: {
                lte: new Date(Date.now() - 1000 * 60 * 60 * 24), // > 24h
              },
            }
          : {}),
      },
      select: { id: true, url: true },
    });

    const fileKeys = unusedMedia.map((m) => {
      const parts = m.url.split("/");
      return parts[parts.length - 1];
    });

    if (fileKeys.length > 0) {
      await new UTApi().deleteFiles(fileKeys);
      await prisma.media.deleteMany({
        where: {
          id: { in: unusedMedia.map((m) => m.id) },
        },
      });
    }

    return new Response("Cleanup done");
  } catch (error) {
    console.error(error);
    return Response.json("Error clearing uploads", { status: 500 });
  }
}
