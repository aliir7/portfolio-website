"use client";
import { AnimatePresence, motion } from "framer-motion";

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="bg-card fixed inset-y-0 right-0 z-50 w-4/5 p-6"
        >
          <button onClick={onClose} className="mb-6">
            بستن
          </button>
          <ul className="flex flex-col gap-4">
            <li>
              <a href="#portfolio" onClick={onClose}>
                نمونه‌کارها
              </a>
            </li>
            <li>
              <a href="#experience" onClick={onClose}>
                سوابق
              </a>
            </li>
            <li>
              <a href="#contact" onClick={onClose}>
                ارتباط
              </a>
            </li>
          </ul>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
