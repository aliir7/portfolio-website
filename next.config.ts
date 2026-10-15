import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const isProduction = process.env.NODE_ENV === "production";

const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "your-cloud-name";

// Content Security Policy. Static on purpose: nonce-based policies force every page to render
// per request, which would turn off the prerendering/ISR the site relies on. Without nonces,
// Next's inline scripts and styles need 'unsafe-inline'; everything else is allow-listed.
const contentSecurityPolicy = Object.entries({
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    ...(isProduction ? [] : ["'unsafe-eval'"]), // React dev tooling
    "https://www.google.com", // reCAPTCHA
    "https://www.gstatic.com",
  ],
  "style-src": ["'self'", "'unsafe-inline'"],
  // Any https image: blog posts can embed images from arbitrary hosts.
  "img-src": ["'self'", "data:", "blob:", "https:"],
  "font-src": ["'self'", "data:"],
  "connect-src": [
    "'self'",
    "https://www.google.com", // reCAPTCHA
    "https://api.cloudinary.com", // direct uploads from the admin panel
  ],
  "frame-src": ["https://www.google.com"], // reCAPTCHA challenge frame
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "frame-ancestors": ["'none'"],
  ...(isProduction ? { "upgrade-insecure-requests": [] } : {}),
})
  .map(([directive, sources]) => [directive, ...sources].join(" "))
  .join("; ");

// Report-only until CSP_ENFORCE=true: violations then show in the browser console without
// breaking the page, so the policy can be verified on the real site first.
const cspHeaderName =
  process.env.CSP_ENFORCE === "true" ? "Content-Security-Policy" : "Content-Security-Policy-Report-Only";

const securityHeaders = [
  { key: cspHeaderName, value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" }, // frame-ancestors is not applied in report-only mode
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  ...(isProduction
    ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }]
    : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: `/${cloudinaryCloudName}/**`,
      },
    ],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // The admin panel must never appear in search results.
      { source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
};

export default createNextIntlPlugin("./i18n/request.ts")(nextConfig);
