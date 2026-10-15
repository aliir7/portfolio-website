import "server-only";

import { v2 as cloudinary } from "cloudinary";
import { after } from "next/server";
import { env } from "@/lib/env";
import { logger } from "@/lib/utils/logger";

// Delivery URLs of files uploaded from the admin panel, e.g.
// https://res.cloudinary.com/<cloud>/image/upload/v123/portfolio/blog/cover.jpg
const ASSET_URL = /^https:\/\/res\.cloudinary\.com\/([^/]+)\/(image|raw|video)\/upload\/(?:v\d+\/)?(.+)$/;

type Asset = { resourceType: string; publicId: string };

/** Only files from our own cloud count; local paths ("/resume.pdf") and other hosts return null. */
function parseAsset(url: string): Asset | null {
  const match = ASSET_URL.exec(url);
  if (!match || match[1] !== env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) return null;

  const [, , resourceType, path] = match;
  // Images and videos are addressed without their extension; raw files keep it.
  const publicId = resourceType === "raw" ? path : path.replace(/\.[^./]+$/, "");
  return { resourceType, publicId: decodeURIComponent(publicId) };
}

async function destroy({ resourceType, publicId }: Asset) {
  const cloudName = env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return;

  // Signed REST call: no SDK configuration needed (same approach as upload signatures).
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request({ public_id: publicId, timestamp }, apiSecret);
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/destroy`, {
    method: "POST",
    body: new URLSearchParams({ public_id: publicId, timestamp: String(timestamp), api_key: apiKey, signature }),
  });
  if (!response.ok) throw new Error(`Cloudinary destroy failed with ${response.status}`);
}

type MaybeUrl = string | null | undefined;

/**
 * Deletes uploaded files that were referenced before a change but not after it (a replaced image,
 * or everything of a deleted record). Runs after the response is sent, and a failure is only logged.
 * Comparison is per record, so a URL pasted into two different records would be deleted with the first.
 */
export function scheduleAssetCleanup(previous: MaybeUrl[], next: MaybeUrl[] = []) {
  const keep = new Set(next.filter(Boolean));
  const assets = [...new Set(previous)]
    .filter((url): url is string => !!url && !keep.has(url))
    .map(parseAsset)
    .filter((asset): asset is Asset => asset !== null);
  if (!assets.length) return;

  after(async () => {
    for (const asset of assets) {
      try {
        await destroy(asset);
      } catch (error) {
        logger.error({ action: "cloudinary.cleanup", err: error, asset }, "Cloudinary cleanup failed");
      }
    }
  });
}
