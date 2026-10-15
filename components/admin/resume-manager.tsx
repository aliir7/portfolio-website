"use client";

import { resumeCategories } from "@/db/schema/values";
import { saveResumeAction } from "@/lib/actions/admin/content.actions";
import { emptyLocalized } from "@/lib/localize";
import { notifyResult } from "@/lib/utils/notify";
import { resumeSchema } from "@/lib/validations/content.validations";
import type { ResumeItemInput } from "@/types";
import { ListEditorPage, ListItemCard } from "./list-editor";
import LocalizedField from "./localized-field";
import SelectField from "./select-field";
import { useListEditor } from "./use-list-editor";

const categoryLabels: Record<ResumeItemInput["category"], string> = {
  education: "تحصیلات",
  experience: "تجربه کاری",
};

const emptyItem: ResumeItemInput = {
  category: "experience",
  organization: emptyLocalized(),
  title: emptyLocalized(),
  period: emptyLocalized(),
  content: emptyLocalized(),
};

export default function ResumeManager({
  initial,
}: {
  initial: ResumeItemInput[];
}) {
  const list = useListEditor(initial);

  return (
    <ListEditorPage
      eyebrow="محتوا"
      title="رزومه"
      description="تحصیلات و تجربه‌ها در ستون خودشان و به همین ترتیب نمایش داده می‌شوند."
      onSave={async () => notifyResult(await saveResumeAction(list.values))}
      saveDisabled={!resumeSchema.safeParse(list.values).success}
      addLabel="افزودن مورد"
      onAdd={() => list.add(emptyItem)}
      isEmpty={!list.rows.length}
    >
      {list.rows.map((row, index) => (
        <ListItemCard
          key={row.uid}
          title="مورد"
          index={index}
          count={list.rows.length}
          onMove={(offset) => list.move(row.uid, offset)}
          onRemove={() => list.remove(row.uid)}
        >
          <SelectField
            id={`${row.uid}-category`}
            label="دسته‌بندی"
            value={row.category}
            options={resumeCategories.map((value) => ({
              value,
              label: categoryLabels[value],
            }))}
            onChange={(category) => list.update(row.uid, { category })}
          />
          <LocalizedField
            id={`${row.uid}-organization`}
            label="محل یا سازمان"
            value={row.organization}
            onChange={(organization) => list.update(row.uid, { organization })}
          />
          <LocalizedField
            id={`${row.uid}-title`}
            label="عنوان"
            value={row.title}
            onChange={(title) => list.update(row.uid, { title })}
          />
          <LocalizedField
            id={`${row.uid}-period`}
            label="بازه زمانی"
            value={row.period}
            onChange={(period) => list.update(row.uid, { period })}
          />
          <LocalizedField
            id={`${row.uid}-content`}
            label="توضیحات"
            value={row.content}
            onChange={(content) => list.update(row.uid, { content })}
            multiline
          />
        </ListItemCard>
      ))}
    </ListEditorPage>
  );
}
