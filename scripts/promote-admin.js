#!/usr/bin/env node
// Usage: node scripts/promote-admin.js <username>
// This script promotes an existing user (by username) to ADMIN via Prisma.
// Run from repo root: node ./scripts/promote-admin.js alice

// Use dynamic import to avoid `require()` (ESLint rule: @typescript-eslint/no-require-imports)
(async () => {
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();

  async function main() {
    const username = process.argv[2];
    if (!username) {
      console.error("Usage: node scripts/promote-admin.js <username>");
      process.exit(1);
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      console.error("User not found:", username);
      process.exit(1);
    }

    await prisma.user.update({ where: { id: user.id }, data: { role: "ADMIN" } });
    // Update any existing sessions for this user so their session role reflects the new role immediately
    await prisma.session.updateMany({ where: { userId: user.id }, data: { role: "ADMIN" } });
    console.log(`User ${username} (${user.id}) promoted to ADMIN. Sessions updated.`);
  }

  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
})();
