"use client";

import { useLocale as useIntlLocale, useTranslations } from "next-intl";
import { useEffect } from "react";
import { projects, resumeData, services, skillsData } from "@/lib/constants";
import type { Locale } from "@/i18n/routing";

export type { Locale };

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
  nav: ["home", "services", "skills", "works", "resume", "contact"],
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
  ],
  hero: [
    "greeting",
    "welcome",
    "welcomeEnd",
    "name",
    "role",
    "bio",
    "resume",
    "skills",
    "years",
    "experience",
    "projects",
    "successful",
    "imageAlt",
  ],
  services: ["title", "subtitle"],
  skills: ["title"],
  works: ["title", "subtitle"],
  resume: ["title", "subtitle", "education", "experience"],
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
  return Object.fromEntries(
    Object.entries(sectionKeys).map(([section, keys]) => [
      section,
      Object.fromEntries(keys.map((key) => [key, t(`${section}.${key}`)])),
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

const englishServices = [
  [
    "Frontend development",
    "React and Next.js",
    "Modern, fast, and responsive web applications focused on user experience, SEO, and clean code.",
  ],
  [
    "Website design and development",
    "WordPress and UI",
    "Personal and business websites focused on clean structure, responsiveness, and strong performance.",
  ],
  [
    "API development",
    "Node.js and REST API",
    "Reliable RESTful APIs with Node.js connecting interfaces, services, and databases.",
  ],
  [
    "Search engine optimization",
    "Technical and on-page SEO",
    "Improving page structure, performance, and visibility using Search Console, Ahrefs, and keyword analysis.",
  ],
  [
    "Product development collaboration",
    "Git and teamwork",
    "Problem solving, maintainable code, and version control with Git across real and freelance projects.",
  ],
];

const englishSkills = [
  "Modern and optimized user interfaces with React, Next.js, and a focus on user experience.",
  "Type-safe code architecture to reduce errors and improve stability in large projects.",
  "Responsive interfaces with Tailwind CSS, shadcn/ui, and modern design tools.",
  "RESTful API development and client-server communication with Node.js and Express.",
  "Hands-on experience with PostgreSQL, MongoDB, MySQL, Prisma, and Drizzle ORM.",
  "Performance optimization, code organization, and maintainable development with Git.",
];

const englishResume = [
  {
    id: "edu-1",
    category: "education",
    organization: "Azad University of Parand",
    title: "Bachelor of Civil Engineering",
    date: "2014 - 2017",
    content:
      "Studied civil engineering while building a professional path in web development.",
  },
  {
    id: "edu-2",
    category: "education",
    organization: "Maktabkhooneh",
    title: "Specialized Web Development Courses",
    date: "2022",
    content:
      "Completed Node.js, React, Git, and front-end web design courses totaling more than 130 hours.",
  },
  {
    id: "edu-3",
    category: "education",
    organization: "Self-directed learning",
    title: "Front-end Developer",
    date: "2023 - Present",
    content:
      "Continuous study of React, Next.js, TypeScript, Tailwind CSS, REST APIs, and modern development tools.",
  },
  {
    id: "exp-1",
    category: "experience",
    organization: "Freelance work",
    title: "Front-end Developer",
    date: "March 2024 - Present",
    content:
      "Building websites and user interfaces with React, Next.js, and Tailwind CSS, focusing on clean code, problem solving, and user experience.",
  },
  {
    id: "exp-2",
    category: "experience",
    organization: "Personal and freelance projects",
    title: "Web Designer and WordPress Developer",
    date: "2022 - Present",
    content:
      "Designing and developing personal and business websites with WordPress while optimizing their structure and performance.",
  },
  {
    id: "exp-3",
    category: "experience",
    organization: "Continuous learning and development",
    title: "Web Developer",
    date: "2023 - Present",
    content:
      "Building practice and production projects with React, Next.js, Node.js, REST APIs, PostgreSQL, MongoDB, and MySQL.",
  },
];

export function useLocalizedContent() {
  const locale = useLocale();
  if (locale === "fa")
    return { services, skills: skillsData, projects, resume: resumeData };
  return {
    services: services.map((item, index) => ({
      ...item,
      title: englishServices[index][0],
      subtitle: englishServices[index][1],
      description: englishServices[index][2],
    })),
    skills: skillsData.map((item, index) => ({
      ...item,
      description: englishSkills[index] ?? item.description,
    })),
    projects: projects.map((item) => ({
      ...item,
      description:
        {
          "1": "An online store built with Next.js 16 and a modern user interface.",
          "2": "A web project for showcasing and selling home and decor products.",
          "3": "A React interface for displaying cryptocurrency information and data.",
        }[item.id] ?? item.description,
    })),
    resume: englishResume,
  };
}
