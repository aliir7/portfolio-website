"use server";

import { z } from "zod";
import { cloudinary } from "@/lib/cloudinary";

const uploadSchema = z.object({
  folder: z.string().trim().min(1).max(100).regex(/^[a-zA-Z0-9/_-]+$/),
});

export async function createCloudinarySignature(folder: string) {
  const parsed = uploadSchema.safeParse({ folder });
  if (!parsed.success) throw new Error("Invalid Cloudinary folder.");

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request({ timestamp, folder: parsed.data.folder }, process.env.CLOUDINARY_API_SECRET!);

  return {
    timestamp,
    signature,
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
    folder: parsed.data.folder,
  };
}
