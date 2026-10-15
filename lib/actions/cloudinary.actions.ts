"use server";

import { v2 as cloudinary } from "cloudinary";
import { getTranslations } from "next-intl/server";
import { env } from "@/lib/env";
import { requireAdmin } from "@/lib/auth-guard";
import { cloudinaryUploadSchema } from "@/lib/validations";
import { formatZodIssues } from "@/lib/utils/format-error";
import { withAction } from "@/lib/utils/with-action";
import type { ActionResult } from "@/types";

type CloudinarySignature = {
  timestamp: number;
  signature: string;
  apiKey: string;
  cloudName: string;
  folder: string;
};

/**
 * Signs a direct browser-to-Cloudinary upload. Signing is a plain HMAC with the API
 * secret, so no SDK configuration is needed. Missing variables are checked at call time: a missing
 * variable fails this action with a clear message instead of breaking every page that
 * imports it.
 */
export async function createCloudinarySignature(folder: string): Promise<ActionResult<CloudinarySignature>> {
  await requireAdmin();
  const t = await getTranslations();
  const parsed = cloudinaryUploadSchema.safeParse({ folder });

  if (!parsed.success) {
    return {
      success: false,
      error: { type: "zod", issues: formatZodIssues(parsed.error, t) },
      message: t("actions.cloudinary.invalidFolder"),
    };
  }

  return withAction(
    async () => {
      const cloudName = env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const apiKey = env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
      const apiSecret = env.CLOUDINARY_API_SECRET;
      if (!cloudName || !apiKey || !apiSecret) throw new Error(t("actions.cloudinary.configMissing"));

      const timestamp = Math.floor(Date.now() / 1000);
      const signature = cloudinary.utils.api_sign_request({ timestamp, folder: parsed.data.folder }, apiSecret);
      return { timestamp, signature, apiKey, cloudName, folder: parsed.data.folder };
    },
    { name: "cloudinary.createSignature" },
  );
}
