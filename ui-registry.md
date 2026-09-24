# UI Registry

### Burgundy / Rose Color Tokens

File: `app/globals.css`, `components/ui/button.tsx`
Last updated: 2026-09-24

| Property         | Class / token |
| ---------------- | ------------- |
| Primary          | `var(--primary)` → `#E11D48` |
| Primary hover    | `var(--primary-hover)` → `#BE123C` |
| Primary light    | `var(--primary-light)` → `#FB7185` |
| Primary dark     | `var(--primary-dark)` → `#9F1239` |
| Burgundy         | `var(--burgundy)` → `#4C0519` |
| Burgundy dark    | `var(--burgundy-dark)` → `#240006` |
| Dark background  | `var(--background)` → `#09090B` |
| Light surface    | `var(--card)` → `#FFFFFF` |
| Light muted      | `var(--muted)` → `#F4F4F5` |
| Light text       | `var(--foreground)` → `#18181B` |
| Light border     | `var(--border)` → `#E4E4E7` |
| Dark surface     | `var(--card)` → `#111113` |
| Dark muted       | `var(--muted)` → `#18181B` |
| Dark text        | `var(--foreground)` → `#FAFAFA` |
| Dark border      | `var(--border)` → `#27272A` |

**Pattern notes:**
The rose primary is the shared action color across public and admin surfaces.
Use the hover token for interactive states instead of reducing primary opacity.
Use Burgundy tokens for hero/CTA backgrounds and deep accent surfaces; keep
text on those surfaces white for contrast.

### Hero Brand Shapes and CTA

File: `components/Hero/HeroSection.tsx`, `components/ui/shape.tsx`, `components/ui/button.tsx`
Last updated: 2026-09-24

| Property         | Class / token |
| ---------------- | ------------- |
| Shape connector  | `bg-foreground`, dark `bg-white` |
| Shape nodes      | `bg-foreground`, dark `bg-white border-white` |
| Shape shadow     | `var(--hero-shape-shadow)` |
| Hero image glow  | `shadow-[0_24px_70px_-24px_var(--primary)]` |
| Badge shadow     | soft glow plus `3px 3px var(--hero-shadow)` |
| CTA background   | `bg-primary` |
| CTA border       | `border-primary` |
| CTA hover        | `hover:bg-primary-hover hover:border-primary-hover` |
| CTA shadow       | `shadow-4px`, primary glow |

**Pattern notes:**
Hero decoration uses black foreground shapes in light mode and white shapes in
dark mode for maximum silhouette contrast. Badge shadows use black in light
mode and a soft Primary Light glow with a small offset in dark mode. The main
CTA is brand-filled in both themes and shifts to the darker primary token on
hover.

### Swiper Pagination Bullets

File: `app/globals.css`
Last updated: 2026-09-24

| Property         | Class / token |
| ---------------- | ------------- |
| Inactive bullet  | transparent with `var(--primary)` border |
| Active bullet    | `var(--primary)` background and border |
| Dark active      | `var(--primary-light)` background and border |
| Radius           | native Swiper bullet radius |
| Spacing          | `8px` horizontal margin |
| Active state     | `scale(1.35)` with Primary Light ring |
| Shadow           | `var(--pagination-shadow)` — black light, white dark |
| Accent usage     | Primary brand tokens only |

**Pattern notes:**
Pagination remains quiet when inactive and uses the same Rose brand hierarchy
as Hero CTAs when active. Dark mode lifts the active bullet to Primary Light
for visibility against the dark surface.

### Language Toggle

File: `components/Header/LanguageToggle.tsx`
Last updated: 2026-09-23

| Property         | Class |
| ---------------- | ----- |
| Background       | none |
| Border           | none |
| Border radius    | none |
| Text — primary   | `text-sm font-semibold` |
| Text — secondary | none |
| Spacing          | none |
| Hover state      | `hover:text-primary` |
| Shadow           | none |
| Accent usage     | `text-primary` on hover |

**Pattern notes:**
The language switcher is intentionally lightweight and sits beside the existing
theme control in the header. It uses a locale URL (`/fa` or `/en`) and persists
the selection in the `portfolio-locale` cookie.

### Portfolio Header

File: `components/Header/Header.tsx`
Last updated: 2026-09-23

| Property         | Class |
| ---------------- | ----- |
| Background       | `bg-card/90` when scrolled, transparent at top |
| Border           | `border-b border-border/60` when scrolled |
| Border radius    | none |
| Text — primary   | `text-xl font-bold` |
| Text — secondary | none |
| Spacing          | `h-20`, container padding |
| Hover state      | inherited control states |
| Shadow           | `shadow-sm` when scrolled |
| Accent usage     | existing theme and language controls |

**Pattern notes:**
The header stays visually quiet at the top of the page and becomes a translucent,
bordered navigation surface after scrolling. This preserves the hero composition
while keeping navigation legible.

### Portfolio Footer

File: `components/Footer/Footer.tsx`
Last updated: 2026-09-23

| Property         | Class |
| ---------------- | ----- |
| Background       | `bg-background` |
| Border           | `border-t border-border/60` |
| Border radius    | none |
| Text — primary   | `text-card-foreground` |
| Text — secondary | `text-muted-foreground` |
| Spacing          | `py-7` |
| Hover state      | `hover:text-primary` |
| Shadow           | none |
| Accent usage     | `text-primary` for labels and heart icon |

**Pattern notes:**
The footer is intentionally reduced to a compact legal/credit bar containing
copyright, author credit, and a back-to-top link.

### Portfolio Content Card

File: `components/Services/ServiceCard.tsx`, `components/Works/WorkCard.tsx`, `components/Resume/ResumeColumn.tsx`
Last updated: 2026-09-24

| Property         | Class |
| ---------------- | ----- |
| Background       | `bg-card` or `bg-card/80` |
| Border           | `border border-border/60` |
| Border radius    | `rounded-3xl` |
| Text — primary   | `text-card-foreground` via heading tokens |
| Text — secondary | `text-muted-foreground` |
| Spacing          | `p-6`, `sm:p-8`, or component-specific `md:p-10` |
| Hover state      | `hover:-translate-y-1 hover:border-card-foreground` |
| Shadow           | `hover:shadow-4px` |
| Accent usage     | `text-primary` for actions and section accents |

**Pattern notes:**
Cards use a restrained surface treatment with one bold graphic interaction:
a short upward lift and offset shadow on hover. Avoid adding blur or heavy
gradients to every card; reserve those effects for contextual surfaces.
Work card category badges keep the Card Header grid with compact `py-1.5`
spacing. Technology badges use the same primary filled treatment with
theme-aware borders, while footer decorations stay anchored to the footer
corner with reduced mobile opacity.

### Primary CTA Button

File: `components/ui/button.tsx`
Last updated: 2026-09-23

| Property         | Class |
| ---------------- | ----- |
| Background       | `bg-card`; `dark:bg-primary` |
| Border           | `border-2 border-border`; `dark:border-primary/70` |
| Border radius    | `rounded-4xl` |
| Text — primary   | `text-sm font-bold text-card-foreground`; dark primary foreground |
| Text — secondary | none |
| Spacing          | `px-10 py-4` |
| Hover state      | primary fill with accent shadow in dark mode |
| Shadow           | `shadow-4px`; dark accent glow |
| Accent usage     | `bg-primary`, `text-primary-foreground` |

**Pattern notes:**
Primary actions use a filled accent surface in dark mode so they remain
visually dominant against dark cards and muted text links. Secondary `ctaLink`
actions stay quiet and text-based.

### Admin Glass Panel

File: `components/admin/admin-shell.tsx`, `components/admin/dashboard-overview.tsx`, `components/admin/projects-manager.tsx`
Last updated: 2026-09-23

| Property         | Class |
| ---------------- | ----- |
| Background       | `bg-white/55 dark:bg-white/5 backdrop-blur-xl` |
| Border           | `border border-white/30 dark:border-white/10` |
| Border radius    | `rounded-2xl` or `rounded-3xl` |
| Text — primary   | `text-foreground`, `font-bold` or `font-black` |
| Text — secondary | `text-muted-foreground` |
| Spacing          | `p-4`, `p-5`, or shadcn card spacing |
| Hover state      | `hover:bg-primary/10 hover:text-foreground` for navigation |
| Shadow           | `shadow-xl shadow-black/5 dark:shadow-black/20` |
| Accent usage     | `bg-primary`, `text-primary-foreground`, `bg-primary/20` |

**Pattern notes:**
Admin surfaces use the shared `.glass-panel` component class instead of
hardcoded colors. Decorative blurred primary/secondary circles sit behind the
shell, while content cards keep borders and text readable in both themes.
Use rounded-2xl for controls and list rows, rounded-3xl for shell-level panels,
and preserve the existing shadcn token colors for actions and status badges.

### Admin Sidebar

File: `components/ui/sidebar.tsx`, `components/admin/admin-shell.tsx`
Last updated: 2026-09-23

| Property         | Class |
| ---------------- | ----- |
| Background       | `bg-white/45 dark:bg-white/5 backdrop-blur-2xl` |
| Border           | `border-white/20 dark:border-white/10` |
| Border radius    | `rounded-3xl` for the shell, `rounded-2xl` for menu items |
| Text — primary   | `text-foreground`, `font-bold` |
| Text — secondary | `text-muted-foreground` |
| Spacing          | `p-3`, `gap-1.5`, `h-11` menu buttons |
| Hover state      | `hover:bg-primary/10 hover:text-foreground` |
| Shadow           | `shadow-2xl shadow-black/10` |
| Accent usage     | `data-[active=true]:bg-primary data-[active=true]:text-primary-foreground` |

**Pattern notes:**
The admin navigation follows the official shadcn Sidebar block model:
provider context, keyboard shortcut (`Ctrl/Cmd+B`), collapsible desktop rail,
and Sheet-backed mobile navigation. The right-side placement respects the
project's RTL direction while preserving token-based active and hover states.

### Admin Dashboard Layout

File: `components/admin/admin-header.tsx`, `components/admin/admin-shell.tsx`, `components/admin/dashboard-overview.tsx`
Last updated: 2026-09-23

| Property         | Class |
| ---------------- | ----- |
| Background       | `bg-background` with blurred `bg-primary/20` layers |
| Border           | `border-border/60` for dividers and list rows |
| Border radius    | `rounded-3xl` shell/header, `rounded-2xl` content rows |
| Text — primary   | `text-lg font-bold`, `text-3xl font-black` |
| Text — secondary | `text-sm text-muted-foreground` |
| Spacing          | `px-4 py-8`, `gap-4`, responsive `lg:px-8` |
| Hover state      | `hover:bg-primary/10`, `hover:bg-background/70` |
| Shadow           | inherited `.glass-panel` shadow |
| Accent usage     | `text-primary`, `bg-primary/10`, primary action button |

**Pattern notes:**
The admin frame follows the shadcn dashboard-block composition: contextual
breadcrumb header, responsive content container, stat cards, recent-content
list, and quick-action panel. Glass surfaces remain the visual layer while
layout rhythm and hierarchy follow the block conventions. The desktop frame
reserves physical left space for the RTL sidebar (`md:pl-72` / `md:pl-28`)
without shrinking the shell, while the header owns the mobile sidebar trigger.

### Admin Create Forms

File: `components/admin/project-create-form.tsx`, `components/admin/skill-create-form.tsx`
Last updated: 2026-09-23

| Property         | Class |
| ---------------- | ----- |
| Background       | `glass-panel` on shadcn `Card` |
| Border           | `border-0` with shared glass surface |
| Border radius    | inherited shadcn Card radius |
| Text — primary   | `text-3xl font-black` for page headings |
| Text — secondary | `text-muted-foreground` |
| Spacing          | `space-y-8`, `gap-5`, `p-4`/Card spacing |
| Hover state      | existing shadcn Button states |
| Shadow           | inherited `.glass-panel` shadow |
| Accent usage     | `text-primary` section eyebrow and primary save action |

**Pattern notes:**
Create flows are full admin pages rather than Sheets. They reuse the admin
header, breadcrumb, glass Card surface, responsive form grids, and a clear
back-navigation action. Keep forms narrow enough to scan while allowing
two-column fields from the `sm` breakpoint upward.
