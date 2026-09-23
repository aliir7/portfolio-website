"use client";

import { createContext, useContext } from "react";
import { useEffect } from "react";
import { projects, resumeData, services, skillsData } from "@/lib/constants";

export type Locale = "fa" | "en";

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

export const dictionaries: Record<Locale, Dictionary> = {
  fa: {
    nav: { home: "خانه", services: "خدمات", skills: "مهارت‌ها", works: "نمونه کارها", resume: "رزومه", contact: "تماس" },
    common: { more: "بیشتر بدانید", repository: "ریپازیتوری", viewProject: "مشاهده پروژه", all: "همه پروژه‌ها", frontend: "فرانت‌اند", fullstack: "فول‌استک", dashboard: "داشبورد", noProjects: "موردی در این دسته‌بندی یافت نشد", theme: "تغییر تم", language: "English" },
    hero: { greeting: "سلام،", welcome: "به دنیای من", welcomeEnd: "خوش آمدید", name: "علی رضایی", role: "طراح سایت و توسعه‌دهنده فرانت‌اند", bio: "من در تهران زندگی می‌کنم. تجربه غنی و بالایی در طراحی رابط کاربری و توسعه وبسایت‌های مدرن دارم. من عاشق خلق تجربه‌های دیجیتال منحصر‌به‌فرد هستم.", resume: "رزومه من", skills: "مهارت‌های من", years: "سال", experience: "تجربه", projects: "پروژه", successful: "موفق", imageAlt: "علی رضایی" },
    services: { title: "خدمات من", subtitle: "راهکارهای تخصصی برای رشد کسب‌وکار شما" },
    skills: { title: "مهارت های من" },
    works: { title: "نمونه‌کارهای من", subtitle: "مجموعه‌ای از پروژه‌هایی که تجربه من را در ساخت وب‌اپلیکیشن‌های مدرن، مقیاس‌پذیر و حرفه‌ای نشان می‌دهند." },
    resume: { title: "رزومه من", subtitle: "مروری بر مسیر آموزشی، تجربیات کاری و مهارت‌های فنی من در دنیای توسعه نرم‌افزار.", education: "تحصیلات و دوره‌ها", experience: "سوابق شغلی" },
    contact: { eyebrow: "شروع یک همکاری تازه", title: "با من در تماس باشید", intro: "برای پیشنهاد پروژه، همکاری یا هر سوالی، لطفاً از فرم زیر استفاده کنید. در اسرع وقت پاسخ خواهم داد.", infoTitle: "اطلاعات تماس", infoText: "برای شروع گفتگو از یکی از راه‌های زیر با من در ارتباط باشید.", messageTitle: "پیام خود را بفرستید", name: "نام کامل", namePlaceholder: "نام و نام خانوادگی", email: "ایمیل", message: "پیام", messagePlaceholder: "پیام شما...", submit: "ارسال پیام", submitting: "در حال ارسال...", requiredName: "نام الزامی است", requiredEmail: "ایمیل الزامی است", invalidEmail: "فرمت ایمیل نامعتبر است", requiredMessage: "پیام الزامی است", shortMessage: "پیام باید حداقل ۱۰ کاراکتر باشد", success: "پیام شما با موفقیت ارسال شد", sendError: "خطا در ارسال پیام", unexpectedError: "خطایی رخ داد", location: "موقعیت", phone: "تلفن" },
    footer: { eyebrow: "آماده ساختن چیزی متفاوت هستید؟", ctaTitle: "بیایید ایده بعدی شما را به واقعیت تبدیل کنیم.", ctaAction: "شروع یک گفتگو", tagline: "تجربه‌های دیجیتال ماندگار می‌سازم.", backToTop: "بازگشت به بالا", rights: "تمامی حقوق محفوظ است.", madeWith: "ساخته شده با", by: "توسط علی رضایی" },
  },
  en: {
    nav: { home: "Home", services: "Services", skills: "Skills", works: "Works", resume: "Resume", contact: "Contact" },
    common: { more: "Learn more", repository: "Repository", viewProject: "View project", all: "All projects", frontend: "Frontend", fullstack: "Full-stack", dashboard: "Dashboard", noProjects: "No projects found in this category", theme: "Change theme", language: "فارسی" },
    hero: { greeting: "Hello,", welcome: "Welcome to", welcomeEnd: "my world", name: "Ali Rezaei", role: "Web Designer & Frontend Developer", bio: "I live in Tehran and have extensive experience designing user interfaces and developing modern websites. I love creating unique digital experiences.", resume: "My resume", skills: "My skills", years: "Years", experience: "Experience", projects: "Projects", successful: "Successful", imageAlt: "Ali Rezaei" },
    services: { title: "My services", subtitle: "Specialized solutions for growing your business" },
    skills: { title: "My skills" },
    works: { title: "My works", subtitle: "A collection of projects that showcase my experience building modern, scalable, and professional web applications." },
    resume: { title: "My resume", subtitle: "An overview of my education, work experience, and technical skills in software development.", education: "Education & courses", experience: "Work experience" },
    contact: { eyebrow: "Start a new collaboration", title: "Get in touch", intro: "For a project proposal, collaboration, or any question, please use the form below. I will get back to you as soon as possible.", infoTitle: "Contact information", infoText: "Reach out through one of the following ways to start a conversation.", messageTitle: "Send your message", name: "Full name", namePlaceholder: "Your name", email: "Email", message: "Message", messagePlaceholder: "Your message...", submit: "Send message", submitting: "Sending...", requiredName: "Name is required", requiredEmail: "Email is required", invalidEmail: "Invalid email format", requiredMessage: "Message is required", shortMessage: "Message must be at least 10 characters", success: "Your message was sent successfully", sendError: "Failed to send message", unexpectedError: "Something went wrong", location: "Location", phone: "Phone" },
    footer: { eyebrow: "Ready to build something different?", ctaTitle: "Let’s turn your next idea into a digital experience.", ctaAction: "Start a conversation", tagline: "Creating digital experiences that last.", backToTop: "Back to top", rights: "All rights reserved.", madeWith: "Made with", by: "by Ali Rezaei" },
  },
};

const LocaleContext = createContext<Locale>("fa");

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function useDictionary() {
  const locale = useLocale();
  return dictionaries[locale];
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
    ["Frontend development", "React and Next.js", "Modern, fast, and responsive web applications focused on user experience, SEO, and clean code."],
    ["Full-stack development", "Node.js and PostgreSQL", "Complete systems with authentication, databases, REST APIs, and scalable, secure admin panels."],
    ["MERN Stack development", "MongoDB, Express, and React", "Full-stack applications built with MongoDB, Express.js, React, and Node.js from database design to deployment."],
    ["WordPress website design", "Business and personal websites", "Responsive, search-optimized WordPress websites tailored to each business's needs."],
    ["SEO optimization", "Technical and on-page SEO", "Improving search visibility through technical SEO, performance optimization, and search engine best practices."],
];

export function useLocalizedContent() {
    const locale = useLocale();
    if (locale === "fa") return { services, skills: skillsData, projects, resume: resumeData };
    return {
      services: services.map((item, index) => ({ ...item, title: englishServices[index][0], subtitle: englishServices[index][1], description: englishServices[index][2] })),
      skills: skillsData.map((item) => ({ ...item, description: item.description.replace("توسعه اپلیکیشن‌های مقیاس‌پذیر و بهینه با تمرکز بر SSR، SSG و تجربه کاربری مدرن.", "Scalable, optimized applications focused on SSR, SSG, and modern user experience.").replace("پیاده‌سازی معماری کد Type-safe برای کاهش خطاها و افزایش پایداری در پروژه‌های بزرگ.", "Type-safe architecture that reduces errors and improves stability in large projects.").replace("طراحی رابط‌های کاربری ریسپانسیو، زیبا و کاربرپسند با استفاده از اکوسیستم Shadcn و Tailwind.", "Beautiful, responsive interfaces built with the Shadcn and Tailwind ecosystem.").replace("تجربه در توسعه RESTful API و مدیریت ارتباط بین کلاینت و سرور با استفاده از Node.js و Express.", "Experience building RESTful APIs and client-server communication with Node.js and Express.").replace("طراحی دیتابیس‌های رابطه‌ای و غیررابطه‌ای با تسلط بر PostgreSQL، MongoDB و Drizzle ORM.", "Relational and non-relational database design with PostgreSQL, MongoDB, and Drizzle ORM.").replace("بهینه‌سازی عملکرد وب‌سایت، پیاده‌سازی معماری تمیز (Clean Architecture) و مدیریت کدهای نگهداشت‌پذیر.", "Website performance optimization, clean architecture, and maintainable code.") })),
      projects: projects.map((item) => ({ ...item, title: { "1": "Anima Home", "2": "Admin dashboard", "3": "Landing page" }[item.id] ?? item.title, description: { "1": "A full-stack interior design and furniture platform with an admin panel.", "2": "An analytics dashboard with charts, data tables, and role-based access.", "3": "A modern, responsive landing page for product marketing." }[item.id] ?? item.description })),
      resume: resumeData.map((item) => ({ ...item, organization: { "edu-1": "SevenLearn Academy", "edu-2": "Self-directed study", "edu-3": "Additional courses", "exp-1": "Freelance", "exp-2": "WordPress projects", "exp-3": "Personal projects" }[item.id] ?? item.organization, title: { "edu-1": "Complete Full-stack Web Development", "edu-2": "Frontend Development specialization", "edu-3": "Git, SEO, and development tools", "exp-1": "Frontend Developer", "exp-2": "Web Designer and Developer", "exp-3": "Full-stack Developer" }[item.id] ?? item.title, date: { "edu-1": "2022 - 2023", "edu-2": "2023 - Present", "edu-3": "2024 - Present", "exp-1": "2023 - Present", "exp-2": "2022 - Present", "exp-3": "2024 - Present" }[item.id] ?? item.date, content: { "edu-1": "Learning web development fundamentals from HTML and CSS to JavaScript, React, Next.js, Node.js, Express, and MongoDB through practical projects.", "edu-2": "Continuous study of official React, Next.js, Tailwind CSS, and TypeScript documentation, modern project architecture, performance, and UI design.", "edu-3": "Proficiency with Git and GitHub, technical SEO, responsive design, REST APIs, and modern tools such as Shadcn UI and Radix UI.", "exp-1": "Designing and developing modern interfaces with React, Next.js, and Tailwind CSS, building responsive pages, and turning UI designs into clean, optimized code.", "exp-2": "Designing and developing business, ecommerce, and personal WordPress websites, customizing themes, and optimizing speed and technical SEO.", "exp-3": "Building MERN full-stack projects with authentication, admin panels, RESTful APIs, and modular architecture focused on clean code." }[item.id] ?? item.content })),
    };
}
