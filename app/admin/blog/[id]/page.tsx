import { notFound } from "next/navigation";
import BlogPostForm from "@/components/admin/blog-post-form";
import { getAdminBlogPostByIdQuery, getBlogTagsQuery } from "@/query/blogs.query";

export default async function AdminEditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, tags] = await Promise.all([getAdminBlogPostByIdQuery(id), getBlogTagsQuery()]);
  if (!post) notFound();
  return <BlogPostForm post={post} tags={tags} />;
}
