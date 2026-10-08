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

## Contact API

The contact form sends requests to `/api/contact` by default. When the API is
served separately, set `NEXT_PUBLIC_API_URL` in `.env.local` to the backend
origin, for example `http://localhost:5000`.

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

Copy `.env.example` to `.env.local` and configure:

- `DATABASE_URL`: Neon PostgreSQL connection string. When Neon is connected through Vercel, use the DATABASE_URL provided by the integration.
- `BETTER_AUTH_URL`: local or production site URL.
- `BETTER_AUTH_SECRET`: a long random secret.
- Cloudinary variables from the Cloudinary dashboard.

### Database

Run:

```bash
pnpm install
pnpm db:generate
pnpm db:migrate
```

For the first deployment, create the initial admin account through a controlled server-side bootstrap/SQL step and set its `user.role` to `admin`. Public email/password signup is disabled.

### Architecture

- Better Auth owns authentication and sessions.
- The Better Auth route handler at `/api/auth/[...all]` is the only remaining auth endpoint required by the authentication library.
- Contact submissions and admin CRUD operations use Server Actions with server-side Zod validation.
- Database access is isolated in the server-side Drizzle layer.
- Cloudinary is used for media storage; signed upload parameters are generated server-side.
