"use client";

import { useRef, useState } from "react";
import { RiDeleteBinLine, RiUploadLine } from "@remixicon/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createCloudinarySignature } from "@/lib/actions/cloudinary.actions";
import { notifyResult } from "@/lib/utils/notify";
import TextField from "./text-field";

const MAX_BYTES = 10 * 1024 * 1024;

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (url: string) => void;
  /** One of `uploadFolders`. */
  folder: string;
};

/** An image URL field with direct signed upload to Cloudinary (the URL can still be pasted by hand). */
export default function ImageUploadField({ id, label, value, onChange, folder }: Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File) => {
    if (!file.type.startsWith("image/") || file.size > MAX_BYTES) {
      toast.error("فقط فایل تصویر تا ۱۰ مگابایت مجاز است.");
      return;
    }

    setUploading(true);
    try {
      const signed = await createCloudinarySignature(folder);
      if (!signed.success || !signed.data) {
        notifyResult(signed);
        return;
      }

      const { cloudName, apiKey, timestamp, signature, folder: signedFolder } = signed.data;
      const body = new FormData();
      body.append("file", file);
      body.append("api_key", apiKey);
      body.append("timestamp", String(timestamp));
      body.append("signature", signature);
      body.append("folder", signedFolder);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body });
      if (!response.ok) throw new Error(`Cloudinary responded with ${response.status}`);

      const { secure_url } = (await response.json()) as { secure_url: string };
      onChange(secure_url);
    } catch {
      toast.error("آپلود تصویر ناموفق بود.");
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  return (
    <div className="grid gap-2">
      <TextField id={id} label={label} value={value} placeholder="https://res.cloudinary.com/..." onChange={onChange} />
      <div className="flex items-center gap-2">
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void upload(file);
          }}
        />
        <Button variant="outline" size="sm" disabled={uploading} onClick={() => fileInput.current?.click()}>
          <RiUploadLine /> {uploading ? "در حال آپلود…" : "آپلود تصویر"}
        </Button>
        {value && (
          <Button variant="ghost" size="sm" onClick={() => onChange("")}>
            <RiDeleteBinLine /> حذف
          </Button>
        )}
      </div>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element -- admin preview of an arbitrary URL
        <img src={value} alt="" className="h-32 w-auto max-w-full rounded-xl object-cover" />
      )}
    </div>
  );
}
