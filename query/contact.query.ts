import "server-only";

import { desc } from "drizzle-orm";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { withQuery } from "@/lib/utils/with-query";

export function getContactMessagesQuery() {
  return withQuery(
    () => db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)),
    "contact.list",
  );
}
