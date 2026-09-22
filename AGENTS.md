# CLAUDE.md

## Project Overview
Personal portfolio website — frontend (`client/`), currently mid-development. Next.js App Router project, package manager is **pnpm**.

## Tech Stack
- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS 4 (CSS-first config — no `tailwind.config.js`, theme lives in `@theme` block inside globals.css) + shadcn/ui (built on `radix-ui`)
- **Icons:** `@remixicon/react`
- **Animation:** `framer-motion`
- **State:** `zustand`
- **Theme:** `next-themes` (light/dark)
- **Carousel:** `swiper`
- **Class utilities:** `clsx` + `tailwind-merge` via a `cn()` helper, `class-variance-authority` (cva) for component variants

## Commands
```
pnpm dev              # start dev server
pnpm build             # production build
pnpm lint              # eslint
pnpm deps:update       # bump deps via npm-check-updates + reinstall
```

## Code Style & Conventions
- TypeScript strict mode — avoid `any`.
- Always use the `cn()` utility for conditional/merged classNames. Never string-concatenate Tailwind classes.
- Server Components by default. Add `"use client"` only when the component needs state, effects, event handlers, framer-motion, or a zustand hook.
- Components with multiple visual states use `cva`, following the shadcn pattern (see existing `components/ui/*`).
- File naming: kebab-case for files (`project-card.tsx`), PascalCase for component/export names (`ProjectCard`).
- Use `@/` path aliases (see tsconfig `paths`) instead of relative `../../../` imports.

## shadcn/ui
- Generated primitives live in `components/ui/`, added via `npx shadcn add <component>`. Don't hand-edit generated primitives beyond intended customization — re-run the generator instead.
- Custom, composed components (built from shadcn primitives) go in `components/`, outside `ui/`.

## State Management (zustand)
- Keep stores small and feature-scoped — no single giant global store.
- Co-locate a store with the feature that owns it, e.g. `features/<feature>/store.ts`.

## Animations (framer-motion)
- Motion components must live in Client Components.
- Define `variants` objects as module-level constants, not inline in JSX, to avoid re-creating them every render.

## Theming
- Dark/light handled by `next-themes` — root layout is wrapped in `ThemeProvider`.
- Respect system preference (`prefers-color-scheme`) by default; don't hardcode a theme.

## Linting / Formatting
- ESLint 10 flat config (`eslint.config.js`) — run `pnpm lint` before committing.
- Prettier + `prettier-plugin-tailwindcss` auto-sorts class order — don't manually reorder Tailwind classes.

## What NOT to do
- Don't create a `tailwind.config.js` — this project uses Tailwind 4's CSS-first config.
- Don't bypass `cn()` when merging classes.
- Don't introduce a second state library — `zustand` is the standard here.
- Don't hardcode raw color values — use the design tokens defined in `globals.css` / the shadcn theme.
- Don't add new dependencies without checking with me first.

## Notes for Claude
- Solo junior-dev portfolio project — prioritize clarity and simplicity over enterprise-scale patterns.
- Before building a new UI element, check `components/ui/` first to see if a shadcn primitive already covers it.


# CLAUDE.md (backend)

## Project Overview
Backend API for a personal portfolio site. Lives in `backend/`, a sibling folder to `client/` (Next.js frontend) inside the same monolithic repo. Serves a JSON REST API consumed by the frontend, plus a small admin-only surface for managing content.

## Tech Stack
- Runtime: Node.js + Express
- Language: TypeScript
- Database: MongoDB via Mongoose
- Validation: `zod` (validate every request body/query before it reaches a controller)
- Auth: JWT in an httpOnly cookie, password hashing via `bcrypt` — single-admin auth, no multi-role system needed
- Image uploads: `multer` → Cloudinary; store only the resulting URL in Mongo, never binary blobs
- Security middleware: `helmet`, `express-rate-limit` (on `/auth/login` and `/contact`), `cors` locked to the frontend origin only

## Folder Structure
```
backend/
  src/
    config/        # db.ts (mongoose connection), env.ts
    models/        # Project.ts, Post.ts, Admin.ts, Message.ts
    routes/
    controllers/
    middleware/     # auth.ts, errorHandler.ts, rateLimiter.ts
    validators/      # zod schemas, one per route/action
    utils/
  package.json
```

## Data Models (initial)
- **Project** — title, slug, description, content, thumbnail, images[], techStack[], liveUrl, githubUrl, featured, order, timestamps
- **Post** (blog) — title, slug, excerpt, content, coverImage, tags[], published, publishedAt, timestamps
- **Admin** — email, passwordHash (single admin — don't build a role system for this)
- **Message** — name, email, message, read, timestamps (contact-form submissions)

## Routes
- Public: `GET /projects`, `GET /projects/:slug`, `GET /posts`, `GET /posts/:slug`, `POST /contact`
- Protected (require valid JWT cookie, checked by `auth` middleware): everything under `/admin/*` (create/update/delete projects & posts, read messages)

## Conventions
- Layering: `routes/` → `controllers/` → `models/`. Keep controllers thin; if logic grows, extract a `services/` layer.
- Validate all input with a `zod` schema from `validators/` before touching the DB.
- Never trust client-supplied slugs — generate/sanitize them server-side.
- Wrap async route handlers (e.g. with `express-async-handler`) instead of repeating try/catch in every controller.
- Consistent error response shape: `{ error: string }` with the correct HTTP status code.
- Centralize error handling in `middleware/errorHandler.ts` rather than ad hoc responses per controller.

## Environment Variables
- `MONGODB_URI`
- `JWT_SECRET`
- `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET`
- `FRONTEND_URL` (used for the CORS allow-list)
- `PORT`

## What NOT to do
- Don't store images as base64/binary in MongoDB — always Cloudinary + URL reference.
- Don't build multi-role RBAC — this is a single-admin CMS.
- Don't couple this API to Next.js internals — it must stay a plain REST API the frontend fetches from over HTTP.
- Don't introduce a second ORM/ODM — Mongoose is the standard here.
- Don't add new dependencies without checking with me first.

## Deployment
- Target: Railway or Render (long-running Express process — not a serverless platform like Vercel).
- Database: MongoDB Atlas (free tier).
- `FRONTEND_URL` / CORS origin restricted to the deployed frontend domain only.

## Notes for Claude
- Solo junior-dev portfolio project — keep it simple, avoid enterprise-scale abstractions.
- Frontend conventions live in `client/CLAUDE.md`. Treat the two folders as separate codebases sharing a repo; don't carry over frontend patterns here 
# CLAUDE.md (root)

## Repo Structure
This is a monolithic repo holding both halves of a personal portfolio site:
- `client/` — Next.js 16 frontend. See `client/CLAUDE.md` for frontend conventions.
- `backend/` — Express + MongoDB API. See `backend/CLAUDE.md` for backend conventions.

## Notes for Claude
- `client/` and `backend/` are independent codebases that happen to share a repo — don't mix their conventions.
- When working inside either folder, that folder's local `CLAUDE.md` takes precedence for stack-specific rules; use this root file only for repo-wide orientation.
