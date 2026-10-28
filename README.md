This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Full-stack backend

The project uses Next.js Server Actions, Better Auth, PostgreSQL on Neon, Drizzle ORM, Zod, and Cloudinary. The public portfolio UI remains unchanged; the admin area is protected by an authenticated admin session.

### Environment

Copy `.env.example` to `.env` and configure:

- `DATABASE_URL`: Neon PostgreSQL connection string. When Neon is connected through Vercel, use the DATABASE_URL provided by the integration.
- `BETTER_AUTH_URL`: local or production site URL.
- `BETTER_AUTH_SECRET`: a long random secret.
- Cloudinary variables from the Cloudinary dashboard.
- `RESEND_API_KEY` and `RESEND_FROM_EMAIL`: password-reset e-mails and contact-form notifications (the notification goes to the profile e-mail).
- `RECAPTCHA_SECRET_KEY` and `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`: reCAPTCHA v3 for login, password reset and the contact form.
- Variables are validated at server start (`lib/env.ts`): a missing or malformed value stops the app with one readable list. `DATABASE_URL`, `BETTER_AUTH_SECRET` (32+ characters) and the reCAPTCHA keys are required; Resend and Cloudinary are optional integrations. Use `SKIP_ENV_VALIDATION=1` only for builds that run without secrets.
- `CSP_ENFORCE=true` switches the Content-Security-Policy from report-only to enforced (see `docs/ADR.md`, ADR-016).
- `SEED_ADMIN_PASSWORD`: password for the seeded admin user (`alirezaeii.dev@gmail.com`), used only by `pnpm db:seed`.

### Database

Run:

```bash
pnpm install
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

`db:seed` inserts the portfolio content and the admin user (role `admin`). It is idempotent: tables that already have rows are skipped and an existing admin is never modified. The public site and the login page read from the database, so migrate and seed before `pnpm build`. Public email/password signup is disabled.

### Architecture

- Better Auth owns authentication and sessions.
- The Better Auth route handler at `/api/auth/[...all]` is the only remaining auth endpoint required by the authentication library.
- Contact submissions and admin CRUD operations use Server Actions with server-side Zod validation.
- Database access is isolated in the server-side Drizzle layer; the database owns all portfolio content. See `docs/ADR.md` for the architectural decisions.
- Cloudinary is used for media storage; signed upload parameters are generated server-side.

## Sending e-mail (Resend)

Password-reset e-mails and contact-form notifications go through Resend (`lib/email.ts`). Resend only delivers to the e-mail address of your own account until you verify a sending domain:

1. Resend dashboard → **Domains** → **Add Domain**. Use a subdomain such as `mail.your-domain.com` to keep it separate from your normal mail.
2. Add the records Resend shows (an **MX** and a **TXT (SPF)** record on the `send` host, and a **TXT (DKIM)** record at `resend._domainkey`) at the DNS provider that your domain's nameservers point to. Enter host names without the domain suffix.
3. Click **Verify DNS Records** (usually minutes, up to 72 hours).
4. Set `RESEND_FROM_EMAIL="Portfolio <noreply@mail.your-domain.com>"`; the domain must match the verified one exactly.

No SMTP library (Nodemailer) is needed.
