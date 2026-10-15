import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, captcha } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { sendEmail } from "@/lib/email";
import { logger } from "@/lib/utils/logger";
import { env } from "@/lib/env";
import { recaptchaConfig } from "@/lib/recaptcha";

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema.authSchema,
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    autoSignIn: false,
    requireEmailVerification: false,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      // Not awaited on purpose: response time must not reveal whether the account exists.
      void sendEmail({
        to: user.email,
        subject: "Reset your password",
        html: `
          <div style="font-family: sans-serif; line-height: 1.7">
            <h2>Reset your password</h2>
            <p>Click the button below to set a new password.</p>
            <p><a href="${url}" style="display:inline-block;padding:10px 16px;background:#111;color:#fff;text-decoration:none;border-radius:8px">Reset password</a></p>
            <p>This link expires in 1 hour.</p>
          </div>
        `,
      }).catch((error) => logger.error({ action: "auth.sendResetPassword", err: error }, "Reset e-mail failed"));
    },
  },
  plugins: [
    admin({
      defaultRole: "user",
      adminRoles: ["admin"],
    }),
    captcha({
      provider: "google-recaptcha",
      secretKey: recaptchaConfig.secretKey,
      minScore: recaptchaConfig.minScore,
    }),
    nextCookies(),
  ],
  rateLimit: {
    enabled: true,
    window: 60,
    max: 100,
    customRules: {
      "/sign-in/email": {
        window: 60,
        max: 5,
      },
      "/request-password-reset": {
        window: 300,
        max: 3,
      },
      "/reset-password": {
        window: 300,
        max: 5,
      },
    },
  },
  trustedOrigins: [env.BETTER_AUTH_URL],
});
