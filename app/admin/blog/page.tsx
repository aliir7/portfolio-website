import BlogManager from "@/components/admin/blog-manager";
import { getAdminBlogPostsQuery } from "@/query/blog.query";

export default async function AdminBlogPage() {
  return <BlogManager initialPosts={await getAdminBlogPostsQuery()} />;
}
