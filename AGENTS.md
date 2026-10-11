# CLAUDE.md

## Project Overview
Personal portfolio website: a single full-stack Next.js App Router project (no separate backend). Package manager is **pnpm**. Architectural decisions are recorded in `docs/ADR.md`.

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
pnpm db:generate       # create a migration from db/schema
pnpm db:migrate        # apply migrations
pnpm db:seed           # seed content + admin (needs SEED_ADMIN_PASSWORD)
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

## Backend & Data (same app)
- **Database:** PostgreSQL on Neon via Drizzle ORM (`neon-http` driver — no interactive transactions; use `db.batch` from `db/helpers.ts` for atomic writes).
- **Auth:** Better Auth (email/password, sign-up disabled, `admin` plugin, captcha). Admin role is `admin`.
- **Mutations:** Server Actions only. Every admin action goes through `runAdminAction` (`lib/utils/admin-action.ts`): authorize → Zod validate → run → revalidate.
- **Content:** the database owns all portfolio content. Bilingual fields are `jsonb { fa, en }`; use `localized()` in schemas, `localizedText()` in Zod, `LocalizedField` in admin forms, `localize()` to resolve a locale. Never copy content into constants or messages.
- **Reads:** `query/*.query.ts`. Public pages read `useContent()` (provider in the locale layout).
- **Layout:** `db/schema` (tables), `db/seed` (initial data), `lib/validations` (Zod), `lib/actions` (server actions), `query` (reads), `types` (derived from schema/Zod, not hand-written).
- Admin list editors (services, resume, social links, skills) use `useListEditor` + `ListEditorPage`/`ListItemCard`; form fields use `LocalizedField`, `TextField`, `SelectField` in `components/admin/`.
- Allowed value lists live in `db/schema/values.ts` — reuse them instead of repeating string unions.

## Backend rules
- DRY and single ownership: one definition per fact; derive types with `$inferSelect` / `z.infer`.
- Don't add new dependencies without checking with me first.
- Don't add a second ORM, a CMS, or an extra service layer without a concrete need.
