-- AlterTable
ALTER TABLE "public"."likes" ADD CONSTRAINT "likes_pkey" PRIMARY KEY ("userId", "postId");

-- DropIndex
DROP INDEX "public"."likes_userId_postId_key";
