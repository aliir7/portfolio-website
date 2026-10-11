"use client";

import { socialPlatforms } from "@/db/schema/values";
import { saveSocialLinksAction } from "@/lib/actions/admin/content.actions";
import { socialIcons } from "@/lib/constants";
import { notifyResult } from "@/lib/utils/notify";
import { socialLinksSchema } from "@/lib/validations/content";
import type { SocialLinkInput } from "@/types";
import { ListEditorPage, ListItemCard } from "./list-editor";
import SelectField from "./select-field";
import TextField from "./text-field";
import { useListEditor } from "./use-list-editor";

export default function SocialLinksManager({ initial }: { initial: SocialLinkInput[] }) {
  const list = useListEditor(initial);
  // Each platform may appear once (also enforced by a unique column).
  const freePlatform = socialPlatforms.find((platform) => !list.values.some((link) => link.platform === platform));

  return (
    <ListEditorPage
      eyebrow="محتوا"
      title="شبکه‌های اجتماعی"
      description="لینک‌های نمایش‌داده‌شده در معرفی و منوی موبایل سایت."
      onSave={async () => notifyResult(await saveSocialLinksAction(list.values))}
      saveDisabled={!socialLinksSchema.safeParse(list.values).success}
      addLabel="افزودن لینک"
      onAdd={() => freePlatform && list.add({ platform: freePlatform, href: "" })}
      addDisabled={!freePlatform}
      isEmpty={!list.rows.length}
    >
      {list.rows.map((row, index) => (
        <ListItemCard key={row.uid} title="لینک" index={index} count={list.rows.length} onMove={(offset) => list.move(row.uid, offset)} onRemove={() => list.remove(row.uid)}>
          <SelectField
            id={`${row.uid}-platform`}
            label="پلتفرم"
            value={row.platform}
            options={socialPlatforms.map((value) => ({
              value,
              label: socialIcons[value].label,
              disabled: value !== row.platform && list.values.some((link) => link.platform === value),
            }))}
            onChange={(platform) => list.update(row.uid, { platform })}
          />
          <TextField id={`${row.uid}-href`} label="آدرس" value={row.href} placeholder="https://..." onChange={(href) => list.update(row.uid, { href })} />
        </ListItemCard>
      ))}
    </ListEditorPage>
  );
}
