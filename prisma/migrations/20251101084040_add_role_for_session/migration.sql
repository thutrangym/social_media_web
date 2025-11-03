-- AlterTable
ALTER TABLE "public"."sessions" ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'USER';
