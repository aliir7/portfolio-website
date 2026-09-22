"use client";

import { ResumeItemType } from "@/types";
import { RiAddLine, RiSubtractLine } from "@remixicon/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Props = {
  item: ResumeItemType;
};

const ResumeItem = ({ item }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="border-border/60 border-b last:border-b-0">
      <button
        type="button"
        className="flex w-full items-start gap-4 py-4 text-start transition-colors hover:text-primary"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        <span className="bg-primary/10 text-primary mt-1 flex size-8 shrink-0 items-center justify-center rounded-full">
          <span className="relative block size-4">
            <RiAddLine
              className={`absolute inset-0 size-4 transition-all duration-300 ease-out ${
                isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              }`}
            />
            <RiSubtractLine
              className={`absolute inset-0 size-4 transition-all duration-300 ease-out ${
                isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              }`}
            />
          </span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <span className="text-lg font-bold leading-7">{item.title}</span>
            <time
              className="text-primary bg-primary/10 w-fit rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap"
              dateTime={item.date}
            >
              {item.date}
            </time>
          </span>
          <span className="text-muted-foreground mt-2 block text-sm font-medium">
            {item.organization}
          </span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground pb-5 ps-12 text-sm leading-8">
              {item.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

export default ResumeItem;
