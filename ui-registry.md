# UI Registry

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

### Portfolio Content Card

File: `components/Services/ServiceCard.tsx`, `components/Works/WorkCard.tsx`, `components/Resume/ResumeColumn.tsx`
Last updated: 2026-09-23

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
