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
