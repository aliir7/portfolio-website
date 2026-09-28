export type BlogStatus = "draft" | "published";

export type BlogTag = {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
};

export type BlogPost = {
  id: string;
  authorId: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  status: BlogStatus;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  ogImage: string | null;
  noIndex: boolean;
  readingTimeMinutes: number | null;
};

export type BlogPostWithTags = BlogPost & {
  tags: BlogTag[];
};

export type BlogPostInput = {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  status: BlogStatus;
  publishedAt?: Date | null;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
  readingTimeMinutes?: number;
  tagIds?: string[];
};
