import { z } from "zod";
export const cloudinaryUploadSchema = z.object({
  folder: z.string().trim().min(1).max(100).regex(/^[a-zA-Z0-9/_-]+$/),
});
