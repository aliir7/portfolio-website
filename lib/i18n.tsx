"use client";

import { useLocale as useIntlLocale, useTranslations } from "next-intl";
import { useEffect } from "react";
import type { Locale } from "@/i18n/routing";

export type { Locale };

export function toLocaleDigits(value: string | number, locale: Locale) {
  return String(value).replace(/\d/g, (digit) =>
    locale === "fa" ? "۰۱۲۳۴۵۶۷۸۹"[Number(digit)] : digit,
  );
}

type Dictionary = {
  nav: Record<string, string>;
  common: Record<string, string>;
  hero: Record<string, string>;
  services: Record<string, string>;
  skills: Record<string, string>;
  works: Record<string, string>;
  resume: Record<string, string>;
  contact: Record<string, string>;
  footer: Record<string, string>;
};

const sectionKeys = {
  nav: ["home", "services", "skills", "works", "resume", "blog", "contact"],
  common: [
    "more",
    "repository",
    "viewProject",
    "all",
    "frontend",
    "fullstack",
    "dashboard",
    "noProjects",
    "theme",
    "language",
    "login",
  ],
  hero: [
    "greeting",
    "welcome",
    "welcomeEnd",
    "resume",
    "skills",
    "years",
    "experience",
    "projects",
    "successful",
  ],
  services: ["title", "subtitle"],
  skills: ["title"],
  works: ["title", "subtitle"],
  resume: ["title", "subtitle", "education", "experience", "download"],
  contact: [
    "eyebrow",
    "title",
    "intro",
    "infoTitle",
    "infoText",
    "messageTitle",
    "name",
    "namePlaceholder",
    "email",
    "message",
    "messagePlaceholder",
    "submit",
    "submitting",
    "requiredName",
    "requiredEmail",
    "invalidEmail",
    "requiredMessage",
    "shortMessage",
    "success",
    "sendError",
    "unexpectedError",
    "location",
    "phone",
  ],
  footer: ["backToTop", "rights", "madeWith", "by"],
} as const;

export function useLocale() {
  return useIntlLocale() as Locale;
}

export function useDictionary(): Dictionary {
  const t = useTranslations();
  const translate = t as unknown as (key: string) => string;
  return Object.fromEntries(
    Object.entries(sectionKeys).map(([section, keys]) => [
      section,
      Object.fromEntries(keys.map((key) => [key, translate(`${section}.${key}`)])),
    ]),
  ) as Dictionary;
}

export function useDocumentLocale() {
  const locale = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
  }, [locale]);
  return locale;
}
