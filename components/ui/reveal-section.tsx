"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";

export const revealSectionVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

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
      variants={revealSectionVariants}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport ?? { once: true, amount: 0.15 }}
      transition={
        transition ?? {
          duration: 0.9,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }
      }
      {...props}
    >
      {children}
    </motion.section>
  );
};

export default RevealSection;
