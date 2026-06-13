"use server";
import prisma from '@/lib/prisma';

import { revalidatePath } from "next/cache";



export async function updateAiSettings(formData: FormData) {
  const aiEnabled = formData.get("aiEnabled") === "on";
  const aiTemperature = parseFloat(formData.get("aiTemperature") as string);
  const aiPromptContext = formData.get("aiPromptContext") as string;

  await prisma.siteSettings.upsert({
    where: { id: "global" },
    update: {
      aiEnabled,
      aiTemperature,
      aiPromptContext
    },
    create: {
      id: "global",
      aiEnabled,
      aiTemperature,
      aiPromptContext
    }
  });

  revalidatePath("/admin/ai");
  revalidatePath("/");
}

export async function updateGeneralSettings(formData: FormData) {
  const storeName = formData.get("storeName") as string;
  const supportEmail = formData.get("supportEmail") as string;

  await prisma.siteSettings.upsert({
    where: { id: "global" },
    update: {
      storeName,
      supportEmail
    },
    create: {
      id: "global",
      storeName,
      supportEmail
    }
  });

  revalidatePath("/admin/settings");
}
