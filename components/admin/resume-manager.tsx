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
import { useFormValidation } from "./use-form-validation";
import { useListEditor } from "./use-list-editor";
import { useUnsavedChangesGuard } from "./use-unsaved-changes-guard";

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
  const v = useFormValidation(resumeSchema, list.values);
  useUnsavedChangesGuard(v.isDirty);

  return (
    <ListEditorPage
      eyebrow="محتوا"
      title="رزومه"
      description="تحصیلات و تجربه‌ها در ستون خودشان و به همین ترتیب نمایش داده می‌شوند."
      onSave={() =>
        v.submit(async () => notifyResult(await saveResumeAction(list.values)))
      }
      saving={v.pending}
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
            {...v.field(`${index}.category`)}
          />
          <LocalizedField
            id={`${row.uid}-organization`}
            label="محل یا سازمان"
            value={row.organization}
            onChange={(organization) => list.update(row.uid, { organization })}
            {...v.localized(`${index}.organization`)}
          />
          <LocalizedField
            id={`${row.uid}-title`}
            label="عنوان"
            value={row.title}
            onChange={(title) => list.update(row.uid, { title })}
            {...v.localized(`${index}.title`)}
          />
          <LocalizedField
            id={`${row.uid}-period`}
            label="بازه زمانی"
            value={row.period}
            onChange={(period) => list.update(row.uid, { period })}
            {...v.localized(`${index}.period`)}
          />
          <LocalizedField
            id={`${row.uid}-content`}
            label="توضیحات"
            value={row.content}
            onChange={(content) => list.update(row.uid, { content })}
            multiline
            {...v.localized(`${index}.content`)}
          />
        </ListItemCard>
      ))}
    </ListEditorPage>
  );
}
