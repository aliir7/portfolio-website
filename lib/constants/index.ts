import { Project, Skill } from "@/types";
import {
  RiBriefcaseLine as Briefcase,
  RiFileTextLine as FileText,
  RiGithubLine as Github,
  RiHomeLine as Home,
  RiInstagramLine as Instagram,
  RiLinkedinLine as Linkedin,
  RiMailLine as Mail,
} from "@remixicon/react";

export const navLinks = [
  { name: "خانه", href: "#home", icon: Home },
  { name: "خدمات", href: "#services", icon: Briefcase },
  { name: "مهارت‌ها", href: "#skills", icon: Briefcase },
  { name: "نمونه کارها", href: "#works", icon: Briefcase },
  { name: "رزومه", href: "#resume", icon: FileText },
  { name: "تماس", href: "#contact", icon: Mail },
];

export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: Github,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: Instagram,
  },
];

export const services = [
  {
    id: 1,
    title: "توسعه فرانت‌اند",
    subtitle: "React و Next.js",
    description:
      "طراحی و توسعه وب‌اپلیکیشن‌های مدرن، سریع و ریسپانسیو با تمرکز بر تجربه کاربری، سئو و کدنویسی استاندارد.",
  },
  {
    id: 2,
    title: "توسعه فول‌استک",
    subtitle: "Node.js و PostgreSQL",
    description:
      "پیاده‌سازی سیستم‌های کامل شامل احراز هویت، پایگاه داده، APIهای REST و پنل‌های مدیریتی با معماری مقیاس‌پذیر و امن.",
  },
  {
    id: 3,
    title: "توسعه MERN Stack",
    subtitle: "MongoDB، Express و React",
    description:
      "توسعه اپلیکیشن‌های فول‌استک با استفاده از MongoDB، Express.js، React و Node.js از طراحی دیتابیس تا استقرار نهایی.",
  },
  {
    id: 4,
    title: "طراحی سایت وردپرسی",
    subtitle: "وب‌سایت‌های شرکتی و شخصی",
    description:
      "طراحی و راه‌اندازی وب‌سایت‌های وردپرسی ریسپانسیو و بهینه برای موتورهای جستجو متناسب با نیاز کسب‌وکارها.",
  },
  {
    id: 5,
    title: "بهینه‌سازی سئو",
    subtitle: "سئوی فنی و داخلی",
    description:
      "افزایش دیده‌شدن وب‌سایت در نتایج جستجو از طریق سئوی فنی، بهینه‌سازی عملکرد و رعایت استانداردهای موتورهای جستجو.",
  },
];

export const skillsData: Skill[] = [
  {
    name: "React & Next.js",
    value: 95,
    description:
      "توسعه اپلیکیشن‌های مقیاس‌پذیر و بهینه با تمرکز بر SSR، SSG و تجربه کاربری مدرن.",
  },
  {
    name: "TypeScript",
    value: 90,
    description:
      "پیاده‌سازی معماری کد Type-safe برای کاهش خطاها و افزایش پایداری در پروژه‌های بزرگ.",
  },
  {
    name: "Tailwind & UI/UX",
    value: 85,
    description:
      "طراحی رابط‌های کاربری ریسپانسیو، زیبا و کاربرپسند با استفاده از اکوسیستم Shadcn و Tailwind.",
  },
  {
    name: "Backend & APIs",
    value: 80,
    description:
      "تجربه در توسعه RESTful API و مدیریت ارتباط بین کلاینت و سرور با استفاده از Node.js و Express.",
  },
  {
    name: "Databases & ORM",
    value: 85,
    description:
      "طراحی دیتابیس‌های رابطه‌ای و غیررابطه‌ای با تسلط بر PostgreSQL، MongoDB و Drizzle ORM.",
  },
  {
    name: "Performance & Architecture",
    value: 75,
    description:
      "بهینه‌سازی عملکرد وب‌سایت، پیاده‌سازی معماری تمیز (Clean Architecture) و مدیریت کدهای نگهداشت‌پذیر.",
  },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "آنیماهوم",
    slug: "anima-home",
    description:
      "پلتفرم فول‌استک طراحی داخلی و فروش مبلمان همراه با پنل مدیریت.",
    category: "fullstack",
    techStack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "Auth.js",
    ],
    image: "/assets/img/placeholder.svg",
    liveUrl: "https://anima-home.ir",
    repoUrl: "https://github.com/aliir7/anima-home",
    createdAt: "2025-01-15T00:00:00.000Z",
  },
  {
    id: "2",
    title: "پنل ادمین",
    slug: "admin-dashboard",
    description:
      "داشبورد تحلیلی با نمودارها، جدول داده و سطح دسترسی مبتنی بر نقش.",
    category: "dashboard",
    techStack: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    image: "/assets/img/placeholder.svg",
    liveUrl: "https://anima-home.ir",
    repoUrl: "https://github.com/aliir7/anima-home",
    createdAt: "2025-03-20T00:00:00.000Z",
  },
  {
    id: "3",
    title: "صفحه فرود",
    slug: "landing-page",
    description: "صفحه فرود مدرن و واکنش‌گرا برای معرفی و بازاریابی محصول.",
    category: "frontend",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    image: "/assets/img/placeholder.svg",
    liveUrl: "https://anima-home.ir",
    repoUrl: "https://github.com/aliir7/anima-home",
    createdAt: "2025-05-10T00:00:00.000Z",
  },
];
