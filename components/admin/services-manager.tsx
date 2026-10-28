"use client";

import { saveServicesAction } from "@/lib/actions/admin/content.actions";
import { emptyLocalized } from "@/lib/localize";
import { notifyResult } from "@/lib/utils/notify";
import { servicesSchema } from "@/lib/validations/content.validations";
import type { ServiceInput } from "@/types";
import { ListEditorPage, ListItemCard } from "./list-editor";
import LocalizedField from "./localized-field";
import { useFormValidation } from "./use-form-validation";
import { useUnsavedChangesGuard } from "./use-unsaved-changes-guard";
import { useListEditor } from "./use-list-editor";

const emptyService: ServiceInput = {
  title: emptyLocalized(),
  subtitle: emptyLocalized(),
  description: emptyLocalized(),
};

export default function ServicesManager({
  initial,
}: {
  initial: ServiceInput[];
}) {
  const list = useListEditor(initial);
  const v = useFormValidation(servicesSchema, list.values);
  useUnsavedChangesGuard(v.isDirty);

  return (
    <ListEditorPage
      eyebrow="محتوا"
      title="خدمات"
      description="ترتیب کارت‌ها همان ترتیب نمایش در سایت است."
      onSave={() =>
        v.submit(async () =>
          notifyResult(await saveServicesAction(list.values)),
        )
      }
      saving={v.pending}
      addLabel="افزودن خدمت"
      onAdd={() => list.add(emptyService)}
      isEmpty={!list.rows.length}
    >
      {list.rows.map((row, index) => (
        <ListItemCard
          key={row.uid}
          title="خدمت"
          index={index}
          count={list.rows.length}
          onMove={(offset) => list.move(row.uid, offset)}
          onRemove={() => list.remove(row.uid)}
        >
          <LocalizedField
            id={`${row.uid}-title`}
            label="عنوان"
            value={row.title}
            onChange={(title) => list.update(row.uid, { title })}
            {...v.localized(`${index}.title`)}
          />
          <LocalizedField
            id={`${row.uid}-subtitle`}
            label="زیرعنوان"
            value={row.subtitle}
            onChange={(subtitle) => list.update(row.uid, { subtitle })}
            {...v.localized(`${index}.subtitle`)}
          />
          <LocalizedField
            id={`${row.uid}-description`}
            label="توضیحات"
            value={row.description}
            onChange={(description) => list.update(row.uid, { description })}
            multiline
            {...v.localized(`${index}.description`)}
          />
        </ListItemCard>
      ))}
    </ListEditorPage>
  );
}
