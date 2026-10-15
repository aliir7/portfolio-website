"use client";

import { useRef, useState } from "react";
import { RiDeleteBinLine, RiUploadLine } from "@remixicon/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createCloudinarySignature } from "@/lib/actions/cloudinary.actions";
import { notifyResult } from "@/lib/utils/notify";
import TextField from "./text-field";

const MAX_BYTES = 10 * 1024 * 1024;

// "auto" lets Cloudinary pick the resource type, which is what PDFs need.
const kinds = {
  image: {
    accept: "image/*",
    resourceType: "image",
    isValid: (file: File) => file.type.startsWith("image/"),
    invalidMessage: "فقط فایل تصویر تا ۱۰ مگابایت مجاز است.",
    placeholder: "https://res.cloudinary.com/...",
  },
  pdf: {
    accept: "application/pdf",
    resourceType: "auto",
    isValid: (file: File) => file.type === "application/pdf",
    invalidMessage: "فقط فایل PDF تا ۱۰ مگابایت مجاز است.",
    placeholder: "/resume.pdf یا آدرس فایل آپلودشده",
  },
} as const;

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (url: string) => void;
  /** One of `uploadFolders`. */
  folder: string;
  kind?: keyof typeof kinds;
};

/** A URL field with direct signed upload to Cloudinary (the URL can still be pasted by hand). */
export default function UploadField({ id, label, value, onChange, folder, kind = "image" }: Props) {
  const config = kinds[kind];
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File) => {
    if (!config.isValid(file) || file.size > MAX_BYTES) {
      toast.error(config.invalidMessage);
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

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${config.resourceType}/upload`, {
        method: "POST",
        body,
      });
      if (!response.ok) throw new Error(`Cloudinary responded with ${response.status}`);

      const { secure_url } = (await response.json()) as { secure_url: string };
      onChange(secure_url);
    } catch {
      toast.error("آپلود فایل ناموفق بود.");
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  return (
    <div className="grid gap-2">
      <TextField id={id} label={label} value={value} placeholder={config.placeholder} onChange={onChange} />
      <div className="flex items-center gap-2">
        <input
          ref={fileInput}
          type="file"
          accept={config.accept}
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void upload(file);
          }}
        />
        <Button variant="outline" size="sm" disabled={uploading} onClick={() => fileInput.current?.click()}>
          <RiUploadLine /> {uploading ? "در حال آپلود…" : "آپلود فایل"}
        </Button>
        {value && (
          <Button variant="ghost" size="sm" onClick={() => onChange("")}>
            <RiDeleteBinLine /> حذف
          </Button>
        )}
      </div>
      {value && kind === "image" && (
        // eslint-disable-next-line @next/next/no-img-element -- admin preview of an arbitrary URL
        <img src={value} alt="" className="h-32 w-auto max-w-full rounded-xl object-cover" />
      )}
      {value && kind === "pdf" && (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-primary text-sm underline">
          مشاهده فایل
        </a>
      )}
    </div>
  );
}
