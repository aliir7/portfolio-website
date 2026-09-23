import { Project, Skill } from "@/types";
import {
  RiBriefcaseLine as Briefcase,
  RiFileTextLine as FileText,
  RiGithubLine as Github,
  RiHomeLine as Home,
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
    label: "GitHub",
    href: "https://github.com/aliir7",
    icon: Github,
  },
];

export const services = [
  {
    id: 1,
    title: "توسعه فرانت‌اند",
    subtitle: "React و Next.js",
    description:
      "توسعه رابط‌های کاربری مدرن و ریسپانسیو با React و Next.js، از پیاده‌سازی کامپوننت‌ها تا بهینه‌سازی تجربه کاربری.",
  },
  {
    id: 2,
    title: "طراحی و توسعه وب‌سایت",
    subtitle: "WordPress و رابط کاربری",
    description:
      "طراحی و توسعه وب‌سایت‌های شخصی و کسب‌وکاری با تمرکز بر ساختار تمیز، واکنش‌گرایی و عملکرد مناسب.",
  },
  {
    id: 3,
    title: "توسعه API",
    subtitle: "Node.js و REST API",
    description:
      "ساخت APIهای RESTful با Node.js و اتصال پایدار بین رابط کاربری، سرویس‌ها و پایگاه داده.",
  },
  {
    id: 4,
    title: "بهینه‌سازی برای موتورهای جستجو",
    subtitle: "SEO تکنیکال و داخلی",
    description:
      "بهبود ساختار صفحات، عملکرد و قابلیت دیده‌شدن وب‌سایت با استفاده از Google Search Console، Ahrefs و ابزارهای تحلیل کلمات کلیدی.",
  },
  {
    id: 5,
    title: "همکاری در توسعه محصول",
    subtitle: "Git و کار تیمی",
    description:
      "مشارکت در حل مسئله، نوشتن کد قابل نگهداری و مدیریت نسخه با Git در پروژه‌های واقعی و فریلنسری.",
  },
];

export const skillsData: Skill[] = [
  {
    name: "React & Next.js",
    value: 95,
    description:
      "توسعه رابط‌های کاربری مدرن و بهینه با React، Next.js و تمرکز بر تجربه کاربری.",
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
      "طراحی رابط‌های کاربری ریسپانسیو با Tailwind CSS، Shadcn UI و ابزارهای طراحی.",
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
      "آشنایی عملی با PostgreSQL، MongoDB، MySQL و ابزارهایی مانند Prisma و Drizzle ORM.",
  },
  {
    name: "Performance & Architecture",
    value: 75,
    description:
      "بهینه‌سازی عملکرد، ساختاردهی کد و توسعه پروژه‌های قابل نگهداری با Git.",
  },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "Fashionito Next.js Shop",
    slug: "fashionito-nextjs-shop",
    description:
      "فروشگاه آنلاین توسعه‌یافته با Next.js 16 و رابط کاربری مدرن.",
    category: "fullstack",
    techStack: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
    ],
    image: "/assets/img/placeholder.svg",
    repoUrl: "https://github.com/aliir7/Fashionito-Nextjs-Shop",
    createdAt: "2026-09-23T00:00:00.000Z",
  },
  {
    id: "2",
    title: "Anima Home",
    slug: "anima-home",
    description:
      "پروژه وب برای معرفی و فروش محصولات خانه و دکوراسیون.",
    category: "fullstack",
    techStack: ["Next.js", "TypeScript", "React"],
    image: "/assets/img/placeholder.svg",
    repoUrl: "https://github.com/aliir7/anima-home",
    createdAt: "2025-01-15T00:00:00.000Z",
  },
  {
    id: "3",
    title: "Crypto React",
    slug: "crypto-react",
    description: "رابط کاربری React برای نمایش اطلاعات و داده‌های رمزارزها.",
    category: "frontend",
    techStack: ["React", "JavaScript", "CSS"],
    image: "/assets/img/placeholder.svg",
    repoUrl: "https://github.com/aliir7/crypto-react",
    createdAt: "2024-10-01T00:00:00.000Z",
  },
];

// lib/constants/index.ts
export const resumeData = [
  // =========================
  // Education
  // =========================
  {
    id: "edu-1",
    category: "education",
    organization: "دانشگاه آزاد اسلامی واحد دزفول",
    title: "کارشناسی مهندسی عمران",
    date: "۱۳۹۳ - ۱۳۹۶",
    content:
      "تحصیل در رشته مهندسی عمران و توسعه مسیر حرفه‌ای در حوزه برنامه‌نویسی وب.",
  },
  {
    id: "edu-2",
    category: "education",
    organization: "مکتب‌خونه",
    title: "دوره‌های تخصصی توسعه وب",
    date: "۱۴۰۱",
    content:
      "گذراندن دوره‌های Node.js، React JS، Git و طراحی وب Front-End با مجموع بیش از ۱۳۰ ساعت آموزش.",
  },
  {
    id: "edu-3",
    category: "education",
    organization: "یادگیری خودآموز",
    title: "توسعه‌دهنده Front-End",
    date: "۱۴۰۲ تاکنون",
    content:
      "مطالعه مستمر React، Next.js، TypeScript، Tailwind CSS، REST API و ابزارهای مدرن توسعه.",
  },

  // =========================
  // Experience
  // =========================
  {
    id: "exp-1",
    category: "experience",
    organization: "فعالیت فریلنسری",
    title: "برنامه‌نویس Front-End",
    date: "اسفند ۱۴۰۲ تاکنون",
    content:
      "توسعه وب‌سایت‌ها و رابط‌های کاربری با React، Next.js و Tailwind CSS، با تمرکز بر کدنویسی تمیز، حل مسئله و تجربه کاربری.",
  },
  {
    id: "exp-2",
    category: "experience",
    organization: "پروژه‌های شخصی و فریلنسری",
    title: "طراح وب و توسعه‌دهنده WordPress",
    date: "۱۴۰۱ تاکنون",
    content:
      "طراحی و توسعه وب‌سایت‌های شخصی و کسب‌وکاری با WordPress و بهینه‌سازی ساختار و عملکرد آن‌ها.",
  },
  {
    id: "exp-3",
    category: "experience",
    organization: "یادگیری و توسعه مستمر",
    title: "توسعه‌دهنده وب",
    date: "۱۴۰۲ تاکنون",
    content:
      "ساخت پروژه‌های تمرینی و واقعی با React، Next.js، Node.js، REST API و پایگاه‌های داده PostgreSQL، MongoDB و MySQL.",
  },
];
