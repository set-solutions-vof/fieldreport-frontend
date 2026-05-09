# FieldReport Design System

The foundation layer for FieldReport — a focused, data-dense desktop tool for
field inspectors reviewing AI-generated reports. Aesthetic peers: Linear,
Vercel, Braze. No decorative gradients, no playful illustrations, no rounded
bubbles. Typography-led hierarchy, restrained accent, status communicated
through both color and shape.

```
design-system/
├── tokens.css                 # All design tokens (color, type, space, radius, shadow, motion)
├── index.ts                   # Barrel export
└── components/
    ├── Button.tsx + .css
    ├── Input.tsx + .css       # (Input.css is shared with Textarea)
    ├── Textarea.tsx
    ├── Badge.tsx + .css
    ├── Card.tsx + .css
    ├── Spinner.tsx + .css
    └── Divider.tsx + .css
```

## Using tokens

Import `tokens.css` **once** at the application root. Every component imports
its own scoped CSS but reads only from these custom properties — never
hard-coded values. There is no JS token export; reference variables directly
in CSS or via `var(--fr-*)` in inline styles when you must.

```tsx
// app/main.tsx
import '@/design-system/tokens.css'
import { Button } from '@/design-system'
```

Add `class="fr-app"` (or `<body class="fr-app">`) to opt the app shell into
the system's font, color, and antialiasing defaults.

### Token namespaces

| Prefix                                                                                                                    | Purpose                                            |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `--fr-color-*`                                                                                                            | Raw color ramps (neutral, accent, status stems)    |
| `--fr-background`, `--fr-surface`, `--fr-border-*`, `--fr-text-*`, `--fr-accent*`, `--fr-destructive*`, `--fr-status-*-*` | Semantic colors — **prefer these in components**   |
| `--fr-font-*`                                                                                                             | Font stacks (sans, mono)                           |
| `--fr-text-*`                                                                                                             | Type size scale (xs → 3xl)                         |
| `--fr-weight-*`                                                                                                           | Font weight scale                                  |
| `--fr-leading-*`                                                                                                          | Line height scale                                  |
| `--fr-space-*`                                                                                                            | Spacing scale 0–16 on a 4px base                   |
| `--fr-radius-*`                                                                                                           | Border radius (none, sm 2px, md 4px, lg 6px, full) |
| `--fr-shadow-*`                                                                                                           | Elevation (sm, md, lg) + `--fr-shadow-focus`       |
| `--fr-duration-*`, `--fr-ease-*`, `--fr-transition-*`                                                                     | Motion                                             |
| `--fr-control-*`                                                                                                          | Shared Button/Input control geometry               |

## Components

Every component is fully typed, forwards refs, and is keyboard accessible.
Examples below show all variants of each.

### Button

Variants: `primary`, `secondary`, `ghost`, `destructive`. Sizes: `sm`, `md`,
`lg`. State is communicated by background, border, opacity, and (for loading)
an inline spinner — never color alone.

```tsx
<Button variant="primary" size="md">Approve report</Button>
<Button variant="secondary">Save draft</Button>
<Button variant="ghost" size="sm">Cancel</Button>
<Button variant="destructive">Delete inspection</Button>

<Button variant="primary" loading>Generating…</Button>
<Button variant="secondary" disabled>Unavailable</Button>
<Button variant="primary" leadingIcon={<PlusIcon />}>New inspection</Button>
```

### Input

Text field with label, helper text, and error state. The label is associated
via `htmlFor`; helper and error copy are wired through `aria-describedby`,
and the error path also sets `aria-invalid` and `role="alert"`.

```tsx
<Input
  label="Property address"
  placeholder="123 Main St."
  helperText="Used as the report header"
  required
/>

<Input label="Inspector ID" defaultValue="FR-018" disabled />

<Input
  label="Email"
  type="email"
  error="Enter a valid email address."
/>
```

### Textarea

Same field anatomy as `Input`; vertical resize only, used for editing report
sections.

```tsx
<Textarea
  label="Findings — kitchen"
  rows={6}
  defaultValue="Cabinetry shows water damage along the sink run…"
  helperText="Edit before approving."
/>

<Textarea label="Notes" error="Notes cannot be empty." />
```

### Badge

Maps to report lifecycle: `draft`, `approved`, `generating`, `failed`.
Always pairs a leading dot (or spinner for `generating`) with the color so
the variant is also identifiable by shape.

```tsx
<Badge variant="draft" />
<Badge variant="approved" />
<Badge variant="generating" />   {/* spinner + amber */}
<Badge variant="failed" />
<Badge variant="approved">Approved · 2:14pm</Badge>
```

### Card

Surface container — use for inspection cards on the dashboard. Pass
`interactive` to render as a focusable button.

```tsx
<Card>
  <CardHeader>
    <div>
      <CardTitle>1428 Oak Avenue</CardTitle>
      <CardSubtitle>Inspected May 4 · Residential</CardSubtitle>
    </div>
    <Badge variant="approved" />
  </CardHeader>
  <p>Three-bedroom single-family. 14 photos, 6 sections.</p>
  <CardFooter>
    <span>Updated 2h ago</span>
    <Button variant="ghost" size="sm">Open</Button>
  </CardFooter>
</Card>

<Card interactive padding="md" onClick={() => open(id)}>
  …
</Card>
```

### Spinner

Single animated loading indicator. Inherits `currentColor`. Sizes: `sm`,
`md`, `lg`.

```tsx
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
```

### Logo

The geometric mark + wordmark lockup. Built from tokens, sized via the `size` prop (px). Use `markOnly` for app rails or compact chrome; use `onDark` when placed on a dark surface.

```tsx
import { Logo, LogoMark } from "@/design-system";

<Logo size={20} />                          {/* default ink */}
<Logo size={36} variant="accent" />         {/* accent glyph */}
<Logo size={20} onDark />                   {/* on dark surface */}
<LogoMark size={32} variant="accent" />     {/* mark only */}
```

### Logo as image asset

For surfaces that can't load the React component — emails, slide decks, OG images, app store listings — vector and raster exports live alongside the favicon in `design-system/brand/`:

```
logo-lockup.svg                 logo-mark.svg
logo-lockup-accent.svg          logo-mark-accent.svg
logo-lockup-on-dark.svg
logo-lockup-{480,720,1200}.png             (ink raster, 5:1)
logo-lockup-accent-{480,720,1200}.png      (accent raster)
logo-lockup-on-dark-{480,720,1200}.png     (white-on-ink, baked dark bg)
logo-mark-{128,256,512}.png                (square)
logo-mark-accent-{128,256,512}.png
```

Prefer the SVG when the host can render it; the PNGs are for fixed-pixel surfaces.

### Favicon

Direction 03 — the FR monogram tile in the brand accent. Files live in `design-system/brand/`.

```html
<link rel="icon" type="image/svg+xml" href="/design-system/brand/favicon.svg" />
<link
  rel="icon"
  type="image/png"
  sizes="32x32"
  href="/design-system/brand/favicon-32.png"
/>
<link
  rel="apple-touch-icon"
  sizes="180x180"
  href="/design-system/brand/favicon-180.png"
/>
```

### Divider

Horizontal rule (default) or vertical. Built on the border token.

```tsx
<Divider />
<Divider spacing="md" />
<Divider orientation="vertical" />
```

## Adding a new component

Naming and structural conventions — keep these consistent so the system stays
legible.

1. **One folder per design system.** Components live in
   `design-system/components/`. Each component is a `.tsx` file plus an
   adjacent `.css` file of the same base name. Shared CSS (e.g. `Input.css`
   used by `Textarea`) is the rare exception.
2. **PascalCase** for component files and exports (`StatusPill.tsx`,
   `export const StatusPill`).
3. **CSS class prefix `fr-`**, kebab-case, BEM-ish:
   block `.fr-statuspill`, modifiers `.fr-statuspill--draft`, elements
   `.fr-statuspill__icon`. Never write a class without the `fr-` prefix.
4. **Tokens only.** No hex codes, no raw px values, no font names inside
   component CSS. If you need something the token set doesn't cover, add a
   token first, then use it.
5. **Forward refs**, accept the platform element's native props, and forward
   `className` to the root element so consumers can compose.
6. **Accessibility is required, not optional.** Every interactive component
   must be operable by keyboard, expose the right role/aria, and show a
   visible focus state via `--fr-shadow-focus`.
7. **Re-export** from `design-system/index.ts` (component + its public
   types).

## Validation

Built and verified against the brief:

- ✅ All listed components implemented; nothing extra.
- ✅ Component CSS references only `--fr-*` tokens — no hex, px, or font names.
- ✅ TypeScript: every component fully typed with forwarded refs and exported prop types.
- ✅ Keyboard: Button (`Enter`/`Space`, focus ring), Input/Textarea (label association, `aria-describedby`, `aria-invalid`), interactive Card (rendered as `<button>`), Divider semantic option (`role="separator"`).
- ✅ Color is never the only signal: Button loading uses a spinner, Badge pairs each variant with a dot or spinner, Input/Textarea errors are announced via `role="alert"`.
- ⚠️ Not validated in this scaffold: a real TypeScript compile (no `tsconfig.json` is shipped here — the system is consumed inside the host app's TS pipeline) and automated visual regression. The component preview at `preview.html` exercises every variant by eye.
