import {
  RiHomeLine as Home,
  RiBriefcaseLine as Briefcase,
  RiFileTextLine as FileText,
  RiMailLine as Mail,
  RiInstagramLine as Instagram,
  RiGithubLine as Github,
  RiLinkedinLine as Linkedin,
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
    subtitle: "React & Next.js",
    description:
      "طراحی و توسعه وب‌اپلیکیشن‌های مدرن، سریع و ریسپانسیو با تمرکز بر تجربه کاربری، سئو، عملکرد بالا و کدنویسی قابل نگهداری.",
  },
  {
    id: 2,
    title: "توسعه فول‌استک",
    subtitle: "Node.js & PostgreSQL",
    description:
      "پیاده‌سازی سیستم‌های کامل شامل احراز هویت، مدیریت کاربران، APIهای REST، پایگاه داده و پنل‌های مدیریتی با معماری مقیاس‌پذیر و امن.",
  },
  {
    id: 3,
    title: "پیاده‌سازی رابط کاربری",
    subtitle: "Tailwind CSS & Shadcn UI",
    description:
      "تبدیل طرح‌های Figma و طراحی‌های سفارشی به رابط‌های کاربری حرفه‌ای، ریسپانسیو و سازگار با تمامی دستگاه‌ها.",
  },
];
