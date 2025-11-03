#!/usr/bin/env node
// Usage: node scripts/create-admin.js <username> <email> <password> [displayName]
// This script creates a new admin account directly.
// Example: node ./scripts/create-admin.js admin admin@example.com mypassword123 "Admin User"

// Use dynamic import to avoid `require()` (ESLint rule: @typescript-eslint/no-require-imports)
(async () => {
  const { PrismaClient } = await import("@prisma/client");
  const { hash } = await import("@node-rs/argon2");
  const { generateIdFromEntropySize } = await import("lucia");
  const prisma = new PrismaClient();

  async function main() {
    const username = process.argv[2];
    const email = process.argv[3];
    const password = process.argv[4];
    const displayName = process.argv[5] || username;

    if (!username || !email || !password) {
      console.error("Usage: node scripts/create-admin.js <username> <email> <password> [displayName]");
      console.error("Example: node ./scripts/create-admin.js admin admin@example.com mypassword123");
      process.exit(1);
    }

    // Check if username already exists
    const existingUsername = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (existingUsername) {
      console.error(`Error: Username "${username}" is already taken.`);
      process.exit(1);
    }

    // Check if email already exists
    const existingEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (existingEmail) {
      console.error(`Error: Email "${email}" is already registered.`);
      process.exit(1);
    }

    // Hash the password using the same settings as signup
    const passwordHash = await hash(password, {
      memoryCost: 1956,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    // Generate user ID
    const userId = generateIdFromEntropySize(10);

    try {
      // Create the admin user
      await prisma.user.create({
        data: {
          id: userId,
          username,
          displayName,
          email,
          passwordHash,
          role: "ADMIN",
        },
      });

      // Note: Stream user creation would typically be done via streamServerClient.upsertUser
      // but we'll skip it in this script as it may require additional Stream configuration
      // The admin can be used for login immediately

      console.log(`✅ Admin account created successfully!`);
      console.log(`   Username: ${username}`);
      console.log(`   Email: ${email}`);
      console.log(`   Display Name: ${displayName}`);
      console.log(`   User ID: ${userId}`);
      console.log(`   Role: ADMIN`);
      console.log(`\nYou can now log in with this account at /login`);
    } catch (error) {
      console.error("Error creating admin account:", error);
      process.exit(1);
    }
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

