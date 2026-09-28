import { z } from "zod";
export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(320),
  message: z.string().trim().min(10).max(5000),
});
