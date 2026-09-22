"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { RiMailLine, RiPhoneLine, RiMapPinLine } from "@remixicon/react";
import { cn } from "@/lib/utils";
import RevealSection from "../ui/reveal-section";

const contactInfo = [
  {
    icon: RiMailLine,
    title: "ایمیل",
    value: "ali.rezaei@example.com",
    href: "mailto:ali.rezaei@example.com",
  },
  {
    icon: RiPhoneLine,
    title: "تلفن",
    value: "+98 912 345 6789",
    href: "tel:+989123456789",
  },
  {
    icon: RiMapPinLine,
    title: "موقعیت",
    value: "تهران، ایران",
    href: "https://maps.google.com/?q=Tehran,Iran",
  },
];

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.name.trim()) newErrors.name = "نام الزامی است";
    if (!formData.email.trim()) newErrors.email = "ایمیل الزامی است";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "فرمت ایمیل نامعتبر است";
    if (!formData.message.trim()) newErrors.message = "پیام الزامی است";
    else if (formData.message.trim().length < 10)
      newErrors.message = "پیام باید حداقل ۱۰ کاراکتر باشد";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
      const response = await fetch(
        apiBaseUrl ? `${apiBaseUrl}/contact` : "/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "خطا در ارسال پیام");

      toast.success("پیام شما با موفقیت ارسال شد");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "خطایی رخ داد");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  return (
    <RevealSection
      id="contact"
      delay={0.5}
      className="section-gradient relative overflow-hidden py-20"
    >
      <div className="container-custom relative z-10">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-primary text-sm font-bold tracking-[0.2em]">
            شروع یک همکاری تازه
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            با من در تماس باشید
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl leading-8">
            برای پیشنهاد پروژه، همکاری یا هر سوالی، لطفاً از فرم زیر استفاده کنید.
            در اسرع وقت پاسخ خواهم داد.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="bg-card rounded-3xl border border-border/60 p-6 shadow-sm sm:p-8">
            <h3 className="text-2xl font-bold">اطلاعات تماس</h3>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              برای شروع گفتگو از یکی از راه‌های زیر با من در ارتباط باشید.
            </p>
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="group bg-background/60 flex items-center gap-4 rounded-2xl border border-border/50 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <item.icon className="size-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">{item.title}</p>
                    <p className="truncate font-medium">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-3xl border border-border/60 p-6 shadow-sm sm:p-8"
            noValidate
          >
            <h3 className="mb-6 text-2xl font-bold">پیام خود را بفرستید</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">نام کامل</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="نام و نام خانوادگی"
                  className={cn(
                    errors.name && "border-destructive focus:border-destructive"
                  )}
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-destructive" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">ایمیل</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={cn(
                    errors.email && "border-destructive focus:border-destructive"
                  )}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-destructive" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message">پیام</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="پیام شما..."
                rows={5}
                className={cn(
                  errors.message && "border-destructive focus:border-destructive"
                )}
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "message-error" : undefined}
                disabled={isSubmitting}
              />
              {errors.message && (
                <p id="message-error" className="text-sm text-destructive" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="cta"
              size="lg"
              className="mt-4 w-full px-8 py-3 text-base sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  در حال ارسال...
                </>
              ) : (
                "ارسال پیام"
              )}
            </Button>
          </form>
        </div>
      </div>
    </RevealSection>
  );
};

export default ContactSection;