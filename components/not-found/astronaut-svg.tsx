import type { SVGProps } from "react";

interface AstronautSVGProps extends SVGProps<SVGSVGElement> {
  label: string;
}

export function AstronautSVG({ label, ...props }: AstronautSVGProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="nf-planet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--primary-light)" />
          <stop offset="100%" stopColor="var(--primary-dark)" />
        </linearGradient>
        <radialGradient id="nf-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* هالهٔ پشت فضانورد */}
      <circle cx="200" cy="200" r="150" fill="url(#nf-glow)" />

      {/* سیارهٔ حلقه‌دار */}
      <g className="nf-planet">
        <circle cx="322" cy="88" r="46" fill="url(#nf-planet)" />
        <ellipse
          cx="322"
          cy="88"
          rx="78"
          ry="19"
          fill="none"
          stroke="var(--primary-light)"
          strokeWidth="4"
          opacity="0.7"
          transform="rotate(-18 322 88)"
        />
        <circle
          cx="307"
          cy="76"
          r="8"
          fill="var(--primary-dark)"
          opacity="0.45"
        />
        <circle
          cx="338"
          cy="100"
          r="5"
          fill="var(--primary-dark)"
          opacity="0.4"
        />
      </g>

      {/* ستاره‌های چشمک‌زن */}
      <g fill="var(--muted-foreground)">
        <path
          className="nf-star"
          style={{ animationDelay: "0s" }}
          d="M60 70 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z"
        />
        <path
          className="nf-star"
          style={{ animationDelay: "0.6s" }}
          d="M120 42 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 z"
        />
        <circle
          className="nf-star"
          style={{ animationDelay: "1.1s" }}
          cx="92"
          cy="150"
          r="3"
        />
        <circle
          className="nf-star"
          style={{ animationDelay: "0.3s" }}
          cx="352"
          cy="222"
          r="2.5"
        />
        <path
          className="nf-star"
          style={{ animationDelay: "1.5s" }}
          d="M300 302 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 z"
        />
        <circle
          className="nf-star"
          style={{ animationDelay: "0.9s" }}
          cx="72"
          cy="300"
          r="3"
        />
        <circle
          className="nf-star"
          style={{ animationDelay: "1.8s" }}
          cx="200"
          cy="48"
          r="2"
        />
      </g>

      {/* فضانورد */}
      <g
        className="nf-astronaut"
        stroke="var(--foreground)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* کوله‌پشتی */}
        <rect
          x="158"
          y="180"
          width="84"
          height="64"
          rx="14"
          fill="var(--muted)"
        />
        {/* پاها */}
        <rect
          x="176"
          y="244"
          width="20"
          height="40"
          rx="10"
          fill="var(--card)"
        />
        <rect
          x="204"
          y="244"
          width="20"
          height="40"
          rx="10"
          fill="var(--card)"
        />
        {/* دست‌ها */}
        <rect
          x="140"
          y="196"
          width="22"
          height="44"
          rx="11"
          fill="var(--card)"
          transform="rotate(18 151 218)"
        />
        <rect
          x="238"
          y="196"
          width="22"
          height="44"
          rx="11"
          fill="var(--card)"
          transform="rotate(-18 249 218)"
        />
        {/* بدن */}
        <rect
          x="168"
          y="186"
          width="64"
          height="66"
          rx="22"
          fill="var(--card)"
        />
        {/* پنل سینه */}
        <rect
          x="186"
          y="206"
          width="28"
          height="20"
          rx="5"
          fill="var(--primary)"
          stroke="none"
          opacity="0.9"
        />
        <circle
          cx="194"
          cy="216"
          r="2.5"
          fill="var(--primary-foreground)"
          stroke="none"
        />
        <circle
          cx="206"
          cy="216"
          r="2.5"
          fill="var(--primary-foreground)"
          stroke="none"
        />
        {/* کلاهک */}
        <circle cx="200" cy="158" r="40" fill="var(--card)" />
        {/* آنتن */}
        <line x1="200" y1="118" x2="200" y2="104" />
        <circle cx="200" cy="100" r="5" fill="var(--primary)" stroke="none" />
        {/* شیشهٔ کلاهک */}
        <ellipse
          cx="200"
          cy="160"
          rx="28"
          ry="24"
          fill="#0b0b12"
          stroke="var(--foreground)"
          strokeWidth="2"
        />
        {/* بازتاب شیشه */}
        <ellipse
          cx="190"
          cy="152"
          rx="9"
          ry="6"
          fill="var(--primary-light)"
          opacity="0.55"
          stroke="none"
          transform="rotate(-20 190 152)"
        />
        <circle
          cx="211"
          cy="167"
          r="3"
          fill="#ffffff"
          opacity="0.5"
          stroke="none"
        />
      </g>
    </svg>
  );
}
