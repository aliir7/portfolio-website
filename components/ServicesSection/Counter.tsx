"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type CounterProps = {
  from?: number;
  to: number;
  text: string;
  duration?: number;
};

export default function Counter({
  from = 0,
  to,
  text,
  duration = 2,
}: CounterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState(from);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const obj = { val: from };
          gsap.to(obj, {
            val: to,
            duration,
            ease: "power3.out",
            onUpdate: () => setCount(Math.floor(obj.val)),
          });
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [from, to, duration]);

  return (
    <div dir="rtl" ref={ref} className="text-center">
      <h4 className="text-3xl font-extrabold">{count}+</h4>
      <p className="text-sm text-gray-600 dark:text-gray-300">{text}</p>
    </div>
  );
}
