"use client";
type Project = { title: string; desc: string; href: string; tech: string[] };

const ITEMS: Project[] = [
  {
    title: "داشبورد فروش",
    desc: "داشبورد Next.js با SSR و کش",
    href: "#",
    tech: ["Next.js", "TS", "Tailwind"],
  },
  {
    title: "لندینگ انیمیشنی",
    desc: "انیمیشن‌های تعاملی با Framer Motion",
    href: "#",
    tech: ["React", "Framer Motion"],
  },
  {
    title: "گالری سه‌بعدی",
    desc: "مدل‌های 3D و تعامل با GSAP",
    href: "#",
    tech: ["GSAP", "3D"],
  },
];

export default function Portfolio() {
  return (
    <div className="snap-center space-y-6">
      <h3 className="text-2xl font-bold">نمونه‌کارها</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((p, i) => (
          <a
            key={i}
            href={p.href}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          >
            <h4 className="text-lg font-semibold">{p.title}</h4>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {p.desc}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800"
                >
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
