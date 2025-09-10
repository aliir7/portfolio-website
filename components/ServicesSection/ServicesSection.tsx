"use client";

import Counter from "./Counter";

export default function Services() {
  return (
    <div className="snap-center space-y-8">
      <h3 className="text-2xl font-bold">مهارت‌ها و خدمات</h3>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h4 className="font-semibold">Frontend</h4>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Next.js، TypeScript، Tailwind، SSR/SSG
          </p>
        </li>
        <li className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h4 className="font-semibold">Animations</h4>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Framer Motion، GSAP، تعامل اسکرولی
          </p>
        </li>
        <li className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h4 className="font-semibold">Performance</h4>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            بهینه‌سازی، Lighthouse، کش
          </p>
        </li>
      </ul>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        <Counter to={5} text="سال تجربه" />
        <Counter to={30} text="پروژه تکمیل‌شده" />
        <Counter to={12} text="مشتری راضی" />
        <Counter to={100} text="امتیاز عملکرد" />
      </div>
    </div>
  );
}
