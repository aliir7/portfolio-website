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
