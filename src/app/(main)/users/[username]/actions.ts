"use server";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/server-auth";
import streamServerClient from "@/lib/stream";
import { getUserDataSelect } from "@/lib/types";
import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "@/lib/validation";

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
