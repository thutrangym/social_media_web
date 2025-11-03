-- CreateTable
CREATE TABLE "public"."auth_keys" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_keys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_keys_key_key" ON "public"."auth_keys"("key");

-- CreateIndex
CREATE INDEX "auth_keys_userId_idx" ON "public"."auth_keys"("userId");

-- AddForeignKey
ALTER TABLE "public"."auth_keys" ADD CONSTRAINT "auth_keys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
