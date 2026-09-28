"use server";

import { getTranslations } from "next-intl/server";
import { db } from "@/db";
import { requireAdmin } from "@/lib/auth-guard";
import { cloudinary } from "@/lib/cloudinary";
import { cloudinaryUploadSchema } from "@/lib/validations";
import { withAction } from "@/lib/utils";
import type { ActionResult } from "@/types";

export async function createCloudinarySignature(
  folder: string,
): Promise<ActionResult<{
  timestamp: number;
  signature: string;
  apiKey: string;
  cloudName: string;
  folder: string;
}>> {
  await requireAdmin();
  const t = await getTranslations();
  const parsed = cloudinaryUploadSchema.safeParse({ folder });

  if (!parsed.success) {
    return {
      success: false,
      error: { type: "zod", issues: parsed.error.issues },
      message: t("actions.cloudinary.invalidFolder"),
    };
  }

  return withAction(async () => {
    const timestamp = Math.floor(Date.now() / 1000);
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!apiSecret) throw new Error("CLOUDINARY_API_SECRET is not configured.");

    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder: parsed.data.folder },
      apiSecret,
    );

    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!apiKey || !cloudName) {
      throw new Error("Cloudinary public configuration is not configured.");
    }

    return {
      timestamp,
      signature,
      apiKey,
      cloudName,
      folder: parsed.data.folder,
    };
  });
}
