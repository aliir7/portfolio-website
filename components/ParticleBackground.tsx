// components/ParticleBackground.tsx
"use client";

import Particles from "@tsparticles/react";
import { useEffect, useState } from "react";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { tsParticles } from "@tsparticles/engine";

/**
 * توضیح کوتاه:
 *  - این نسخه مستقیماً loadFull(tsParticles) را یک‌بار در mount اجرا می‌کند.
 *  - سپس <Particles options={...} /> فقط options می‌گیرد (بدون prop غیراستاندارد `init`).
 *  - از تایپ ISourceOptions برای options استفاده شده است.
 */

export default function ParticleBackground() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    setIsMobile(typeof window !== "undefined" && window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // loadFull تنها یک‌بار روی اینسنس مرکزی اجرا می‌شود
  useEffect(() => {
    (async () => {
      try {
        await loadFull(tsParticles);
      } catch (err) {
        // اگر به هر دلیلی loadFull fail کند، particles ممکن است برخی پلاگین‌ها را نداشته باشند
        // ولی اپ کرش نخواهد کرد.
        // در محیط توسعه می‌توانی لاگ کنی:
        // console.warn("tsparticles loadFull failed", err);
      }
    })();
  }, []);

  const options: ISourceOptions = {
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: !isMobile, mode: "repulse" },
        onClick: { enable: true, mode: "push" },
        // resize: true,
      },
      modes: {
        repulse: { distance: 100 },
        push: { quantity: 4 },
      },
    },
    particles: {
      number: {
        value: isMobile ? 18 : 56,
        density: { enable: true },
      },
      color: { value: "#FF8A00" },
      links: {
        enable: !isMobile,
        distance: 110,
        color: "#FF8A00",
        opacity: 0.06,
        width: 1,
      },
      move: {
        enable: true,
        speed: isMobile ? 0.25 : 0.6,
        outModes: { default: "out" },
      },
      size: { value: { min: 1, max: 3 } },
      opacity: { value: 0.6 },
    },
    detectRetina: true,
  };

  return <Particles options={options} className="h-full w-full" />;
}
