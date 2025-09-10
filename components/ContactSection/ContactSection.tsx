"use client";
import { useState } from "react";

export default function Contact() {
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    // TODO: اتصال به /app/api/contact/route.ts
    setTimeout(() => setSending(false), 800);
  }

  return (
    <div className="snap-center space-y-6" id="contact">
      <h3 className="text-2xl font-bold">تماس</h3>
      <form onSubmit={onSubmit} className="grid max-w-xl grid-cols-1 gap-4">
        <input
          required
          name="name"
          placeholder="نام"
          className="rounded-md border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
        />
        <input
          required
          type="email"
          name="email"
          placeholder="ایمیل"
          className="rounded-md border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
        />
        <textarea
          required
          name="message"
          placeholder="پیام"
          rows={5}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
        />
        <button
          disabled={sending}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {sending ? "در حال ارسال…" : "ارسال"}
        </button>
      </form>
    </div>
  );
}
