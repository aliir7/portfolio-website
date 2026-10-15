"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import {
  createBlogTagAction,
  deleteBlogTagAction,
  updateBlogTagAction,
} from "@/lib/actions/blog.actions";
import { notifyResult } from "@/lib/utils/notify";
import { blogTagSchema } from "@/lib/validations/blog.validations";
import type { BlogTag } from "@/types";
import { RiAddLine, RiDeleteBinLine, RiSaveLine } from "@remixicon/react";
import { useState } from "react";
import TextField from "./text-field";
import { useFormValidation } from "./use-form-validation";

export type TagWithCount = BlogTag & { postCount: number };

type Props = {
  /** Present when editing an existing tag; absent for the "new tag" row. */
  tag?: TagWithCount;
  onSaved: (tag: BlogTag) => void;
  onDeleted?: () => void;
};

/** One tag row: edit name/slug, save, delete. With no `tag` it creates a new one. */
export default function TagEditor({ tag, onSaved, onDeleted }: Props) {
  const [draft, setDraft] = useState({
    name: tag?.name ?? "",
    slug: tag?.slug ?? "",
  });
  const [deleting, setDeleting] = useState(false);
  const v = useFormValidation(blogTagSchema, draft);

  const save = () =>
    v.submit(async () => {
      const result = tag
        ? await updateBlogTagAction(tag.id, draft)
        : await createBlogTagAction(draft);
      if (!notifyResult(result) || !result.success || !result.data) return;
      onSaved(result.data);
      if (!tag) {
        setDraft({ name: "", slug: "" });
        v.reset();
      }
    });

  const remove = async () => {
    if (!tag) return;
    const used = tag.postCount
      ? ` این تگ روی ${tag.postCount} پست استفاده شده و از آن‌ها برداشته می‌شود.`
      : "";
    if (!window.confirm(`تگ «${tag.name}» حذف شود؟${used}`)) return;
    setDeleting(true);
    try {
      if (notifyResult(await deleteBlogTagAction(tag.id))) onDeleted?.();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card className="glass-panel border-0">
      <CardContent className="grid items-start gap-4 sm:grid-cols-[1fr_1fr_auto]">
        <TextField
          id={`${tag?.id ?? "new"}-name`}
          label="نام"
          dir="auto"
          value={draft.name}
          onChange={(name) => setDraft({ ...draft, name })}
          {...v.field("name")}
        />
        <TextField
          id={`${tag?.id ?? "new"}-slug`}
          label="Slug"
          value={draft.slug}
          onChange={(slug) => setDraft({ ...draft, slug })}
          {...v.field("slug")}
        />
        <div className="flex items-end gap-2 sm:pt-6">
          <Button onClick={save} disabled={v.pending}>
            {v.pending ? <Spinner /> : tag ? <RiSaveLine /> : <RiAddLine />}{" "}
            {tag ? "ذخیره" : "افزودن"}
          </Button>
          {tag && (
            <Button
              variant="ghost"
              size="icon"
              aria-label={`حذف ${tag.name}`}
              onClick={remove}
              disabled={deleting}
            >
              {deleting ? <Spinner /> : <RiDeleteBinLine />}
            </Button>
          )}
        </div>
        {tag && (
          <p className="text-muted-foreground text-xs sm:col-span-3">
            {tag.postCount} پست
          </p>
        )}
      </CardContent>
    </Card>
  );
}
