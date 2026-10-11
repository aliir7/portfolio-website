import BlogPostForm from "@/components/admin/blog-post-form";
import { getBlogTagsQuery } from "@/query/blogs.query";

export default async function AdminNewBlogPostPage() {
  return <BlogPostForm tags={await getBlogTagsQuery()} />;
}
