"use client";

import { useState } from "react";
import { RiCheckLine, RiDeleteBinLine, RiMailSendLine } from "@remixicon/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { deleteContactMessageAction, markContactMessageReadAction } from "@/lib/actions/contact.actions";
import { formatDate } from "@/lib/utils/format-date";
import { notifyResult } from "@/lib/utils/notify";
import type { ContactMessage } from "@/types";

export default function ContactMessagesManager({ initialMessages }: { initialMessages: ContactMessage[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [onlyUnread, setOnlyUnread] = useState(false);

  const unreadCount = messages.filter((message) => !message.readAt).length;
  const visible = onlyUnread ? messages.filter((message) => !message.readAt) : messages;

  const markRead = async (id: string) => {
    if (!notifyResult(await markContactMessageReadAction(id))) return;
    setMessages((current) => current.map((message) => (message.id === id ? { ...message, readAt: new Date() } : message)));
  };

  const remove = async (message: ContactMessage) => {
    if (!window.confirm(`پیام «${message.name}» حذف شود؟`)) return;
    if (notifyResult(await deleteContactMessageAction(message.id))) {
      setMessages((current) => current.filter((item) => item.id !== message.id));
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-medium text-primary">ارتباط</p>
          <h2 className="text-3xl font-black">پیام‌ها</h2>
          <p className="mt-2 text-muted-foreground">{unreadCount} پیام خوانده‌نشده از {messages.length} پیام.</p>
        </div>
        <Button variant={onlyUnread ? "default" : "outline"} onClick={() => setOnlyUnread((current) => !current)}>
          فقط خوانده‌نشده‌ها
        </Button>
      </section>

      {visible.length === 0 && <p className="text-muted-foreground rounded-2xl border border-dashed p-8 text-center">پیامی وجود ندارد.</p>}

      <div className="grid gap-4">
        {visible.map((message) => (
          <Card key={message.id} className="glass-panel border-0">
            <CardContent className="space-y-4">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold" dir="auto">{message.name}</h3>
                    {!message.readAt && <Badge>جدید</Badge>}
                  </div>
                  <a href={`mailto:${message.email}`} dir="ltr" className="text-primary text-sm">{message.email}</a>
                  <p className="text-muted-foreground text-xs">{formatDate(message.createdAt, "fa", true)}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <Button variant="ghost" size="icon" asChild aria-label="پاسخ با ایمیل">
                    <a href={`mailto:${message.email}`}><RiMailSendLine /></a>
                  </Button>
                  {!message.readAt && (
                    <Button variant="ghost" size="icon" aria-label="علامت‌گذاری به‌عنوان خوانده‌شده" onClick={() => markRead(message.id)}><RiCheckLine /></Button>
                  )}
                  <Button variant="ghost" size="icon" aria-label="حذف" onClick={() => remove(message)}><RiDeleteBinLine /></Button>
                </div>
              </div>
              <p dir="auto" className="whitespace-pre-line leading-7">{message.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
