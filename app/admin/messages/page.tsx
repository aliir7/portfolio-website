import ContactMessagesManager from "@/components/admin/contact-messages-manager";
import { getContactMessagesQuery } from "@/query/contact.query";

export default async function AdminMessagesPage() {
  return <ContactMessagesManager initialMessages={await getContactMessagesQuery()} />;
}
