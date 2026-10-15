"use client";

import BlogContent from "@/components/Blog/BlogContent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { publishStatuses } from "@/db/schema/values";
import {
  createBlogPostAction,
  createBlogTagAction,
  updateBlogPostAction,
} from "@/lib/actions/blog.actions";
import { uploadFolders } from "@/lib/constants";
import { notifyResult } from "@/lib/utils/notify";
import {
  blogPostSchema,
  blogTagSchema,
  type BlogPostInput,
} from "@/lib/validations/blog.validations";
import type { BlogPostWithTags, BlogStatus, BlogTag } from "@/types";
import { RiAddLine, RiArrowRightLine, RiSaveLine } from "@remixicon/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SelectField from "./select-field";
import TextField from "./text-field";
import UploadField from "./upload-field";
import { useFormValidation } from "./use-form-validation";

const emptyPost: BlogPostInput = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  status: "draft",
  metaTitle: "",
  metaDescription: "",
  canonicalUrl: "",
  ogImage: "",
  noIndex: false,
  tagIds: [],
};

const toBlogPostInput = (post: BlogPostWithTags): BlogPostInput => ({
  title: post.title,
  slug: post.slug,
  excerpt: post.excerpt ?? "",
  content: post.content,
  coverImage: post.coverImage ?? "",
  status: post.status,
  metaTitle: post.metaTitle ?? "",
  metaDescription: post.metaDescription ?? "",
  canonicalUrl: post.canonicalUrl ?? "",
  ogImage: post.ogImage ?? "",
  noIndex: post.noIndex,
  tagIds: post.tags.map((tag) => tag.id),
});

const statusLabels: Record<BlogStatus, string> = {
  draft: "پیش‌نویس",
  published: "منتشرشده",
};

type Props = { tags: BlogTag[]; post?: BlogPostWithTags };

/** Create and edit share this form: `post` present means edit. */
export default function BlogPostForm({ tags, post }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<BlogPostInput>(
    post ? toBlogPostInput(post) : emptyPost,
  );
  const [tagOptions, setTagOptions] = useState(tags);
  const [newTag, setNewTag] = useState({ name: "", slug: "" });
  const [preview, setPreview] = useState(false);
  const v = useFormValidation(blogPostSchema, form);
  const tagValidation = useFormValidation(blogTagSchema, newTag);

  const set = <K extends keyof BlogPostInput>(
    key: K,
    value: BlogPostInput[K],
  ) => setForm((current) => ({ ...current, [key]: value }));

  const toggleTag = (tagId: string, selected: boolean) =>
    set(
      "tagIds",
      selected
        ? [...form.tagIds, tagId]
        : form.tagIds.filter((id) => id !== tagId),
    );

  const addTag = () =>
    tagValidation.submit(async () => {
      const result = await createBlogTagAction(newTag);
      if (!notifyResult(result) || !result.success || !result.data) return;
      const created = result.data;
      setTagOptions((current) => [...current, created]);
      toggleTag(created.id, true);
      setNewTag({ name: "", slug: "" });
      tagValidation.reset();
    });

  const save = () =>
    v.submit(async () => {
      const result = post
        ? await updateBlogPostAction(post.id, form)
        : await createBlogPostAction(form);
      if (notifyResult(result)) router.push("/admin/blog");
    });

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-primary mb-2 text-sm font-medium">بلاگ</p>
          <h2 className="text-3xl font-black">
            {post ? "ویرایش پست" : "پست جدید"}
          </h2>
          <p className="text-muted-foreground mt-2">
            بدنه‌ی پست با Markdown نوشته می‌شود. زمان مطالعه خودکار محاسبه
            می‌شود.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" asChild>
            <Link href="/admin/blog">
              <RiArrowRightLine /> بازگشت
            </Link>
          </Button>
          <Button onClick={save} disabled={v.pending}>
            {v.pending ? <Spinner /> : <RiSaveLine />} ذخیره پست
          </Button>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="glass-panel border-0">
          <CardHeader>
            <CardTitle>محتوا</CardTitle>
            <CardDescription>
              Slug فقط شامل حروف انگلیسی کوچک، عدد و خط تیره باشد.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <TextField
              id="post-title"
              label="عنوان"
              dir="auto"
              value={form.title}
              onChange={(value) => set("title", value)}
              {...v.field("title")}
            />
            <TextField
              id="post-slug"
              label="Slug"
              placeholder="my-first-post"
              value={form.slug}
              onChange={(value) => set("slug", value)}
              {...v.field("slug")}
            />
            <TextField
              id="post-excerpt"
              label="خلاصه"
              dir="auto"
              rows={3}
              value={form.excerpt ?? ""}
              onChange={(value) => set("excerpt", value)}
              {...v.field("excerpt")}
            />
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="post-content">متن (Markdown)</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPreview((current) => !current)}
                >
                  {preview ? "ویرایش" : "پیش‌نمایش"}
                </Button>
              </div>
              {preview ? (
                <div className="bg-background/45 border-border/60 min-h-64 rounded-2xl border p-4">
                  <BlogContent content={form.content} />
                </div>
              ) : (
                <TextField
                  id="post-content"
                  dir="auto"
                  rows={18}
                  value={form.content}
                  onChange={(value) => set("content", value)}
                  {...v.field("content")}
                />
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid content-start gap-6">
          <Card className="glass-panel border-0">
            <CardHeader>
              <CardTitle>انتشار</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5">
              <SelectField
                id="post-status"
                label="وضعیت"
                value={form.status}
                options={publishStatuses.map((value) => ({
                  value,
                  label: statusLabels[value],
                }))}
                onChange={(value) => set("status", value)}
                {...v.field("status")}
              />
              <UploadField
                id="post-cover"
                label="تصویر شاخص"
                folder={uploadFolders.blog}
                value={form.coverImage ?? ""}
                onChange={(value) => set("coverImage", value)}
                {...v.field("coverImage")}
              />
              <div className="grid gap-3">
                <Label>تگ‌ها</Label>
                {tagOptions.length === 0 && (
                  <p className="text-muted-foreground text-sm">
                    هنوز تگی ساخته نشده است.
                  </p>
                )}
                {tagOptions.map((tag) => (
                  <div key={tag.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`tag-${tag.id}`}
                      checked={form.tagIds.includes(tag.id)}
                      onCheckedChange={(checked) =>
                        toggleTag(tag.id, checked === true)
                      }
                    />
                    <Label htmlFor={`tag-${tag.id}`}>{tag.name}</Label>
                  </div>
                ))}
                <div className="border-border/60 grid gap-2 border-t pt-3">
                  <TextField
                    id="new-tag-name"
                    label="نام تگ جدید"
                    dir="auto"
                    value={newTag.name}
                    onChange={(name) =>
                      setNewTag((current) => ({ ...current, name }))
                    }
                    {...tagValidation.field("name")}
                  />
                  <TextField
                    id="new-tag-slug"
                    label="Slug تگ"
                    value={newTag.slug}
                    onChange={(slug) =>
                      setNewTag((current) => ({ ...current, slug }))
                    }
                    {...tagValidation.field("slug")}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addTag}
                    disabled={tagValidation.pending}
                  >
                    {tagValidation.pending ? <Spinner /> : <RiAddLine />} افزودن
                    تگ
                  </Button>
                  <Link
                    href="/admin/blog/tags"
                    className="text-primary text-sm"
                  >
                    مدیریت تگ‌ها (ویرایش و حذف)
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-0">
            <CardHeader>
              <CardTitle>سئو</CardTitle>
              <CardDescription>
                خالی بگذار تا از عنوان و خلاصه استفاده شود.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5">
              <TextField
                id="post-meta-title"
                label="عنوان سئو (حداکثر ۷۰ کاراکتر)"
                dir="auto"
                value={form.metaTitle ?? ""}
                onChange={(value) => set("metaTitle", value)}
                {...v.field("metaTitle")}
              />
              <TextField
                id="post-meta-description"
                label="توضیح سئو (حداکثر ۱۶۰ کاراکتر)"
                dir="auto"
                rows={3}
                value={form.metaDescription ?? ""}
                onChange={(value) => set("metaDescription", value)}
                {...v.field("metaDescription")}
              />
              <TextField
                id="post-canonical"
                label="Canonical URL"
                value={form.canonicalUrl ?? ""}
                onChange={(value) => set("canonicalUrl", value)}
                {...v.field("canonicalUrl")}
              />
              <UploadField
                id="post-og-image"
                label="تصویر OpenGraph"
                folder={uploadFolders.blog}
                value={form.ogImage ?? ""}
                onChange={(value) => set("ogImage", value)}
                {...v.field("ogImage")}
              />
              <div className="flex items-center gap-2">
                <Checkbox
                  id="post-noindex"
                  checked={form.noIndex}
                  onCheckedChange={(checked) =>
                    set("noIndex", checked === true)
                  }
                />
                <Label htmlFor="post-noindex">
                  عدم ایندکس توسط موتورهای جستجو (noindex)
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
