"use client";

import type { ReactNode } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

/**
 * reCAPTCHA v3 is invisible; its badge is hidden site-wide in `globals.css` and only shown while a
 * `data-recaptcha-badge` element is mounted. Auth forms pass `showBadge`; other forms (contact) must
 * show Google's notice text instead, which Google requires when the badge is hidden.
 */
export function RecaptchaProvider({ children, showBadge = false }: { children: ReactNode; showBadge?: boolean }) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey} scriptProps={{ async: true, defer: true }}>
      {showBadge ? (
        <div data-recaptcha-badge className="contents">
          {children}
        </div>
      ) : (
        children
      )}
    </GoogleReCaptchaProvider>
  );
}
