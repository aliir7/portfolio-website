import TagsManager from "@/components/admin/tags-manager";
import { getBlogTagsWithCountQuery } from "@/query/blogs.query";

export default async function AdminBlogTagsPage() {
  return <TagsManager initialTags={await getBlogTagsWithCountQuery()} />;
}
