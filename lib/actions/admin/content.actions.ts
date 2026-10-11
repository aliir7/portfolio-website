"use server";

import { replaceRows, withSortOrder } from "@/db/helpers";
import { resumeItems, services, socialLinks } from "@/db/schema";
import { resumeSchema, servicesSchema, socialLinksSchema } from "@/lib/validations";
import { runAdminAction } from "@/lib/utils/admin-action";

// These lists are small and edited as a whole, so each action replaces the full
// list atomically; the array position becomes `sortOrder`.

const messages = { invalid: "actions.common.invalidForm", success: "actions.common.saved" };

export async function saveServicesAction(input: unknown) {
  return runAdminAction({
    name: "services.save",
    schema: servicesSchema,
    input,
    messages,
    run: async (data) => {
      await replaceRows(services, withSortOrder(data));
    },
  });
}

export async function saveResumeAction(input: unknown) {
  return runAdminAction({
    name: "resume.save",
    schema: resumeSchema,
    input,
    messages,
    run: async (data) => {
      await replaceRows(resumeItems, withSortOrder(data));
    },
  });
}

export async function saveSocialLinksAction(input: unknown) {
  return runAdminAction({
    name: "socialLinks.save",
    schema: socialLinksSchema,
    input,
    messages,
    run: async (data) => {
      await replaceRows(socialLinks, withSortOrder(data));
    },
  });
}
