"use server";

import prisma from "@/lib/prisma";
import { validateRequest, assertAdmin } from "@/lib/server-auth";
import streamServerClient from "@/lib/stream";
import { getUserDataSelect } from "@/lib/types";
import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "@/lib/validation";

export async function deleteUserByAdmin(userIdToDelete: string) {
  const adminUser = await assertAdmin();
  if (adminUser.id === userIdToDelete) {
    throw new Error("Admin users cannot delete their own accounts.");
  }

  try {
    await prisma.authKey.deleteMany({
      where: { userId: userIdToDelete },
    });
    await prisma.session.deleteMany({
      where: { userId: userIdToDelete },
    });
    await prisma.user.delete({
      where: { id: userIdToDelete },
    });
    console.log(
      `User ${userIdToDelete} deleted by Admin ${adminUser.username}.`,
    );

    return {
      success: true,
      message: `Delete user's UserID: ${userIdToDelete}.`,
    };
  } catch (error) {
    console.error(`Error deleting user ${userIdToDelete}:`, error);
    throw new Error("Failed to delete user.");
  }
}

export async function updateUserProfile(values: UpdateUserProfileValues) {
  const validatedValues = updateUserProfileSchema.parse(values);

  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const updatedUser = await prisma.$transaction(async (tx) => {
    const updatedUser = await tx.user.update({
      where: { id: user.id },
      data: validatedValues,
      select: getUserDataSelect(user.id),
    });
    await streamServerClient.partialUpdateUser({
      id: user.id,
      set: {
        name: validatedValues.displayName,
      },
    });
    return updatedUser;
  });

  return updatedUser;
}
