import { z } from "zod";

// Server-side environment, validated once. Import `env` instead of reading `process.env`.
// Exceptions that cannot use it: `NEXT_PUBLIC_*` values read in client code (they must stay
// literal `process.env.NEXT_PUBLIC_X` so Next can inline them), `next.config.ts`,
// `drizzle.config.ts` and the seed script (they run outside the app bundle).
if (typeof window !== "undefined") {
  throw new Error("lib/env.ts contains server secrets and must not be imported in client code.");
}

const DEFAULT_AUTH_URL = "http://localhost:3000";

const schema = z.object({
  DATABASE_URL: z.string().startsWith("postgres", "must be a PostgreSQL connection string"),
  BETTER_AUTH_SECRET: z.string().min(32, "use a long random value, e.g. `openssl rand -base64 32`"),
  BETTER_AUTH_URL: z.url().default(DEFAULT_AUTH_URL),
  RECAPTCHA_SECRET_KEY: z.string().min(1),
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.url().optional(),

  // Optional integrations: the feature that needs them reports a clear message when they are missing.
  RESEND_API_KEY: z.string().min(1).optional(),
  RESEND_FROM_EMAIL: z.string().min(1).optional(),
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1).optional(),
  NEXT_PUBLIC_CLOUDINARY_API_KEY: z.string().min(1).optional(),
  CLOUDINARY_API_SECRET: z.string().min(1).optional(),
});

export type Env = z.infer<typeof schema>;

// `KEY=` (empty) in a .env file means "not set".
const raw = Object.fromEntries(Object.entries(process.env).filter(([, value]) => value !== ""));
const parsed = schema.safeParse(raw);

// `SKIP_ENV_VALIDATION=1` is an escape hatch for builds that run without secrets (CI, Docker).
if (!parsed.success && !process.env.SKIP_ENV_VALIDATION) {
  throw new Error(`Invalid environment variables:\n${z.prettifyError(parsed.error)}`);
}

export const env = (parsed.success ? parsed.data : { BETTER_AUTH_URL: DEFAULT_AUTH_URL, ...raw }) as Env;
