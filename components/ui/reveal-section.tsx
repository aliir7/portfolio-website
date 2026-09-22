"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";

type RevealSectionProps = ComponentProps<typeof motion.section> & {
  delay?: number;
};

const RevealSection = ({
  children,
  delay = 0,
  initial = "hidden",
  whileInView = "visible",
  viewport = { once: true, amount: 0.15 },
  transition,
  ...props
}: RevealSectionProps) => {
  return (
    <motion.section
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={
        transition ?? {
          duration: 0.65,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }
      }
      {...props}
    >
      {children}
    </motion.section>
  );
};

export default RevealSection;
