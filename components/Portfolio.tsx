"use client";

import { motion } from "framer-motion";

const list = new Array(6).fill(0).map((_, i) => ({
  id: i,
  title: `پروژه ${i + 1}`,
  image: `/project${(i % 4) + 1}.jpg`,
}));

export default function Portfolio() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <h2 className="mb-6 text-2xl font-semibold">نمونه‌کارها</h2>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {list.map((item) => (
          <motion.article
            key={item.id}
            variants={{
              hidden: { y: 8, opacity: 0 },
              show: { y: 0, opacity: 1, transition: { duration: 0.12 } },
            }}
            className="bg-card overflow-hidden rounded-lg shadow-md"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-44 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="mb-2 font-semibold">{item.title}</h3>
              <p className="text-muted text-sm">توضیح کوتاه درباره پروژه.</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
