// Initial content for `pnpm db:seed`. Persian text comes from the former
// `lib/constants` mock data, English text from the former `lib/i18n` dictionaries.
// After seeding, the database is the only owner of this content.
import { withSortOrder } from "../helpers";
import type {
  profile,
  projects,
  resumeItems,
  services,
  skills,
  socialLinks,
  user,
} from "../schema";

export const ownerEmail = "alirezaeii.dev@gmail.com";

export const adminSeed = {
  name: "علی رضایی",
  email: ownerEmail,
} satisfies Pick<typeof user.$inferInsert, "name" | "email">;

export const profileSeed: typeof profile.$inferInsert = {
  id: 1,
  name: { fa: "علی رضایی", en: "Ali Rezaei" },
  role: { fa: "برنامه‌نویس React و Next.js", en: "React & Next.js Developer" },
  bio: {
    fa: "من یک توسعه‌دهنده وب ساکن تهران هستم که از سال ۱۴۰۱ به‌صورت خودآموز مسیر برنامه‌نویسی را دنبال می‌کنم و در توسعه رابط‌های کاربری مدرن با React و Next.js فعالیت دارم.",
    en: "I am a Tehran-based web developer who has been pursuing software development since 2022. I focus on building modern user interfaces with React and Next.js.",
  },
  location: { fa: "تهران، ایران", en: "Tehran, Iran" },
  email: ownerEmail,
  phone: "0902 925 3481",
  resumeUrl: "/resume.pdf",
  experienceYears: 3,
  completedProjects: 7,
};

export const socialLinksSeed: (typeof socialLinks.$inferInsert)[] = [
  { platform: "github", href: "https://github.com/aliir7", sortOrder: 0 },
];

const servicesBase: Omit<typeof services.$inferInsert, "sortOrder">[] = [
  {
    title: { fa: "توسعه فرانت‌اند", en: "Frontend development" },
    subtitle: { fa: "React و Next.js", en: "React and Next.js" },
    description: {
      fa: "توسعه رابط‌های کاربری مدرن و ریسپانسیو با React و Next.js، از پیاده‌سازی کامپوننت‌ها تا بهینه‌سازی تجربه کاربری.",
      en: "Modern, fast, and responsive web applications focused on user experience, SEO, and clean code.",
    },
  },
  {
    title: {
      fa: "طراحی و توسعه وب‌سایت",
      en: "Website design and development",
    },
    subtitle: { fa: "WordPress و رابط کاربری", en: "WordPress and UI" },
    description: {
      fa: "طراحی و توسعه وب‌سایت‌های شخصی و کسب‌وکاری با تمرکز بر ساختار تمیز، واکنش‌گرایی و عملکرد مناسب.",
      en: "Personal and business websites focused on clean structure, responsiveness, and strong performance.",
    },
  },
  {
    title: { fa: "توسعه API", en: "API development" },
    subtitle: { fa: "Node.js و REST API", en: "Node.js and REST API" },
    description: {
      fa: "ساخت APIهای RESTful با Node.js و اتصال پایدار بین رابط کاربری، سرویس‌ها و پایگاه داده.",
      en: "Reliable RESTful APIs with Node.js connecting interfaces, services, and databases.",
    },
  },
  {
    title: {
      fa: "بهینه‌سازی برای موتورهای جستجو",
      en: "Search engine optimization",
    },
    subtitle: { fa: "SEO تکنیکال و داخلی", en: "Technical and on-page SEO" },
    description: {
      fa: "بهبود ساختار صفحات، عملکرد و قابلیت دیده‌شدن وب‌سایت با استفاده از Google Search Console، Ahrefs و ابزارهای تحلیل کلمات کلیدی.",
      en: "Improving page structure, performance, and visibility using Search Console, Ahrefs, and keyword analysis.",
    },
  },
  {
    title: {
      fa: "همکاری در توسعه محصول",
      en: "Product development collaboration",
    },
    subtitle: { fa: "Git و کار تیمی", en: "Git and teamwork" },
    description: {
      fa: "مشارکت در حل مسئله، نوشتن کد قابل نگهداری و مدیریت نسخه با Git در پروژه‌های واقعی و فریلنسری.",
      en: "Problem solving, maintainable code, and version control with Git across real and freelance projects.",
    },
  },
];

export const servicesSeed = withSortOrder(servicesBase);

const skillsBase: Omit<typeof skills.$inferInsert, "sortOrder">[] = [
  {
    name: "React & Next.js",
    value: 95,
    description: {
      fa: "توسعه رابط‌های کاربری مدرن و بهینه با React، Next.js و تمرکز بر تجربه کاربری.",
      en: "Modern and optimized user interfaces with React, Next.js, and a focus on user experience.",
    },
  },
  {
    name: "TypeScript",
    value: 90,
    description: {
      fa: "پیاده‌سازی معماری کد Type-safe برای کاهش خطاها و افزایش پایداری در پروژه‌های بزرگ.",
      en: "Type-safe code architecture to reduce errors and improve stability in large projects.",
    },
  },
  {
    name: "Tailwind & UI/UX",
    value: 85,
    description: {
      fa: "طراحی رابط‌های کاربری ریسپانسیو با Tailwind CSS، Shadcn UI و ابزارهای طراحی.",
      en: "Responsive interfaces with Tailwind CSS, shadcn/ui, and modern design tools.",
    },
  },
  {
    name: "Backend & APIs",
    value: 80,
    description: {
      fa: "تجربه در توسعه RESTful API و مدیریت ارتباط بین کلاینت و سرور با استفاده از Node.js و Express.",
      en: "RESTful API development and client-server communication with Node.js and Express.",
    },
  },
  {
    name: "Databases & ORM",
    value: 85,
    description: {
      fa: "آشنایی عملی با PostgreSQL، MongoDB، MySQL و ابزارهایی مانند Prisma و Drizzle ORM.",
      en: "Hands-on experience with PostgreSQL, MongoDB, MySQL, Prisma, and Drizzle ORM.",
    },
  },
  {
    name: "Performance & Architecture",
    value: 75,
    description: {
      fa: "بهینه‌سازی عملکرد، ساختاردهی کد و توسعه پروژه‌های قابل نگهداری با Git.",
      en: "Performance optimization, code organization, and maintainable development with Git.",
    },
  },
];

export const skillsSeed = withSortOrder(skillsBase);

const placeholderImage = "/assets/img/placeholder.svg";

export const projectsSeed: (typeof projects.$inferInsert)[] = [
  {
    slug: "fashionito-nextjs-shop",
    title: { fa: "Fashionito Next.js Shop", en: "Fashionito Next.js Shop" },
    description: {
      fa: "فروشگاه آنلاین توسعه‌یافته با Next.js 16 و رابط کاربری مدرن.",
      en: "An online store built with Next.js 16 and a modern user interface.",
    },
    category: "fullstack",
    techStack: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    image: placeholderImage,
    repoUrl: "https://github.com/aliir7/Fashionito-Nextjs-Shop",
    status: "published",
    createdAt: new Date("2026-09-23T00:00:00.000Z"),
  },
  {
    slug: "anima-home",
    title: { fa: "Anima Home", en: "Anima Home" },
    description: {
      fa: "پروژه وب برای معرفی و فروش محصولات خانه و دکوراسیون.",
      en: "A web project for showcasing and selling home and decor products.",
    },
    category: "fullstack",
    techStack: ["Next.js", "TypeScript", "React"],
    image: placeholderImage,
    repoUrl: "https://github.com/aliir7/anima-home",
    status: "published",
    createdAt: new Date("2025-01-15T00:00:00.000Z"),
  },
  {
    slug: "crypto-react",
    title: { fa: "Crypto React", en: "Crypto React" },
    description: {
      fa: "رابط کاربری React برای نمایش اطلاعات و داده‌های رمزارزها.",
      en: "A React interface for displaying cryptocurrency information and data.",
    },
    category: "frontend",
    techStack: ["React", "JavaScript", "CSS"],
    image: placeholderImage,
    repoUrl: "https://github.com/aliir7/crypto-react",
    status: "published",
    createdAt: new Date("2024-10-01T00:00:00.000Z"),
  },
];

const resumeBase: Omit<typeof resumeItems.$inferInsert, "sortOrder">[] = [
  {
    category: "education",
    organization: {
      fa: "دانشگاه آزاد اسلامی واحد پرند",
      en: "Azad University of Parand",
    },
    title: { fa: "کارشناسی مهندسی عمران", en: "Bachelor of Civil Engineering" },
    period: { fa: "۱۳۹۳ - ۱۳۹۶", en: "2014 - 2017" },
    content: {
      fa: "تحصیل در رشته مهندسی عمران و توسعه مسیر حرفه‌ای در حوزه برنامه‌نویسی وب.",
      en: "Studied civil engineering while building a professional path in web development.",
    },
  },
  {
    category: "education",
    organization: { fa: "مکتب‌خونه", en: "Maktabkhooneh" },
    title: {
      fa: "دوره‌های تخصصی توسعه وب",
      en: "Specialized Web Development Courses",
    },
    period: { fa: "۱۴۰۱", en: "2022" },
    content: {
      fa: "گذراندن دوره‌های Node.js، React JS، Git و طراحی وب Front-End با مجموع بیش از ۱۳۰ ساعت آموزش.",
      en: "Completed Node.js, React, Git, and front-end web design courses totaling more than 130 hours.",
    },
  },
  {
    category: "education",
    organization: { fa: "یادگیری خودآموز", en: "Self-directed learning" },
    title: { fa: "توسعه‌دهنده Front-End", en: "Front-end Developer" },
    period: { fa: "۱۴۰۲ تاکنون", en: "2023 - Present" },
    content: {
      fa: "مطالعه مستمر React، Next.js، TypeScript، Tailwind CSS، REST API و ابزارهای مدرن توسعه.",
      en: "Continuous study of React, Next.js, TypeScript, Tailwind CSS, REST APIs, and modern development tools.",
    },
  },
  {
    category: "experience",
    organization: { fa: "فعالیت فریلنسری", en: "Freelance work" },
    title: { fa: "برنامه‌نویس Front-End", en: "Front-end Developer" },
    period: { fa: "اسفند ۱۴۰۲ تاکنون", en: "March 2024 - Present" },
    content: {
      fa: "توسعه وب‌سایت‌ها و رابط‌های کاربری با React، Next.js و Tailwind CSS، با تمرکز بر کدنویسی تمیز، حل مسئله و تجربه کاربری.",
      en: "Building websites and user interfaces with React, Next.js, and Tailwind CSS, focusing on clean code, problem solving, and user experience.",
    },
  },
  {
    category: "experience",
    organization: {
      fa: "پروژه‌های شخصی و فریلنسری",
      en: "Personal and freelance projects",
    },
    title: {
      fa: "طراح وب و توسعه‌دهنده WordPress",
      en: "Web Designer and WordPress Developer",
    },
    period: { fa: "۱۴۰۱ تاکنون", en: "2022 - Present" },
    content: {
      fa: "طراحی و توسعه وب‌سایت‌های شخصی و کسب‌وکاری با WordPress و بهینه‌سازی ساختار و عملکرد آن‌ها.",
      en: "Designing and developing personal and business websites with WordPress while optimizing their structure and performance.",
    },
  },
  {
    category: "experience",
    organization: {
      fa: "یادگیری و توسعه مستمر",
      en: "Continuous learning and development",
    },
    title: { fa: "توسعه‌دهنده وب", en: "Web Developer" },
    period: { fa: "۱۴۰۲ تاکنون", en: "2023 - Present" },
    content: {
      fa: "ساخت پروژه‌های تمرینی و واقعی با React، Next.js، Node.js، REST API و پایگاه‌های داده PostgreSQL، MongoDB و MySQL.",
      en: "Building practice and production projects with React, Next.js, Node.js, REST APIs, PostgreSQL, MongoDB, and MySQL.",
    },
  },
];

export const resumeSeed = withSortOrder(resumeBase);
