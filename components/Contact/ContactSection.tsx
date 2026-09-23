"use client";

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
import Shape from "../ui/shape";
import { useDictionary, useLocale } from "@/lib/i18n";

const contactInfo = [
  {
    icon: RiMailLine,
    key: "email",
    value: "ali.rezaei@example.com",
    href: "mailto:ali.rezaei@example.com",
  },
  {
    icon: RiPhoneLine,
    key: "phone",
    value: "+98 912 345 6789",
    href: "tel:+989123456789",
  },
  {
    icon: RiMapPinLine,
    key: "location",
    value: "تهران، ایران",
    href: "https://maps.google.com/?q=Tehran,Iran",
  },
];

export const ContactSection = () => {
  const { contact } = useDictionary();
  const locale = useLocale();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.name.trim()) newErrors.name = contact.requiredName;
    if (!formData.email.trim()) newErrors.email = contact.requiredEmail;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = contact.invalidEmail;
    if (!formData.message.trim()) newErrors.message = contact.requiredMessage;
    else if (formData.message.trim().length < 10)
      newErrors.message = contact.shortMessage;
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
      if (!response.ok) throw new Error(data.error || contact.sendError);

      toast.success(contact.success);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : contact.unexpectedError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
            {contact.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {contact.title}
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl leading-8">
            {contact.intro}
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="bg-card border-border/60 rounded-3xl border p-6 shadow-sm sm:p-8">
            <h3 className="text-2xl font-bold">{contact.infoTitle}</h3>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              {contact.infoText}
            </p>
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <a
                key={item.key}
                  href={item.href}
                  className="group bg-background/60 border-border/50 hover:border-primary/50 flex items-center gap-4 rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors">
                    <item.icon className="size-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-muted-foreground text-sm">
                      {item.key === "email"
                        ? contact.email
                        : item.key === "phone"
                          ? contact.phone
                          : contact.location}
                    </p>
                    <p className="truncate font-medium">
                      {item.key === "location" && locale === "en"
                        ? "Tehran, Iran"
                        : item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-card border-border/60 rounded-3xl border p-6 shadow-sm sm:p-8"
            noValidate
          >
            <h3 className="mb-6 text-2xl font-bold">{contact.messageTitle}</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">{contact.name}</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={contact.namePlaceholder}
                  className={cn(
                    errors.name &&
                      "border-destructive focus:border-destructive",
                  )}
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="text-destructive text-sm"
                    role="alert"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">{contact.email}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={cn(
                    errors.email &&
                      "border-destructive focus:border-destructive",
                  )}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="text-destructive text-sm"
                    role="alert"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message">{contact.message}</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={contact.messagePlaceholder}
                rows={5}
                className={cn(
                  errors.message &&
                    "border-destructive focus:border-destructive",
                )}
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "message-error" : undefined}
                disabled={isSubmitting}
              />
              {errors.message && (
                <p
                  id="message-error"
                  className="text-destructive text-sm"
                  role="alert"
                >
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
                  {contact.submitting}
                </>
              ) : (
                contact.submit
              )}
            </Button>
          </form>
        </div>
      </div>
      <div className="hidden md:block">
        <Shape
          width={226}
          className="absolute -bottom-51.5 -left-11.5 h-56.5 max-w-56.5"
          containerClassName="-right-18"
        />
      </div>
    </RevealSection>
  );
};

export default ContactSection;
