# Notably — Design Tokens

A working spec, pulled from the Paper style guide. Use these tokens directly when building the site. Do not invent new values; if you need one, add it here first.

---

## 1. Color

| Token              | Hex        | RGB                | Role                                          |
| ------------------ | ---------- | ------------------ | --------------------------------------------- |
| `color.off-black`  | `#272826`  | `39, 40, 38`       | Primary text. Core UI. Dark surfaces.         |
| `color.off-white`  | `#FBFAF5`  | `251, 250, 245`    | Page background. Text on dark surfaces.       |
| `color.pink`       | `#F2D0F4`  | `242, 208, 244`    | Accent. Highlight. Button background.         |
| `color.mint`       | `#DEFBEE`  | `222, 251, 238`    | Accent. Highlight. Section background.        |
| `color.yellow`     | `#F6F2B6`  | `246, 242, 182`    | Accent. Highlight. Bookend / brand moments.   |

**Usage rules**

- `off-white` is the default page background. `off-black` is used sparingly for hero, interrupt, or footer sections.
- Pink, Mint, and Yellow function as highlighter swatches. Use one per surface. Never let all three compete on the same screen.
- All text sits on `off-white` or on an accent tint. Avoid white text on accents — pastels won't carry it.
- The Pink used for the **button background** is `#F3D0F4` (one digit hotter than the swatch Pink). Both are valid; the button variant has slightly more saturation to read confidently against `off-white`.

---

## 2. Typography

### Families

| Token            | Family                       | Use                                                                                  |
| ---------------- | ---------------------------- | ------------------------------------------------------------------------------------ |
| `font.sans`      | Rhetorik Sans Trial Regular  | Editorial headlines (Display / H1 / H2), buttons, eyebrows, nav, small UI labels.    |
| `font.serif`     | Rhetorik Serif Trial Regular | Body L / Body / Small paragraphs, italic pull quotes, list items, the brand wordmark.|

Only these two families. No mono. No system fallback in production once Rhetorik is licensed.

### Scale

| Style       | Size | Line height | Letter spacing | Family | Notes                                  |
| ----------- | ---- | ----------- | -------------- | ------ | -------------------------------------- |
| Display     | 96   | 100         | -2.5%          | Sans   | Hero, full-bleed moments, Final CTA.   |
| H1          | 64   | 68          | -2%            | Sans   | Section headlines.                     |
| H2          | 40   | 46          | -1%            | Sans   | Sub-section headlines, service titles. |
| H3          | 24   | 32          | 0%             | Sans / Serif | Pillar labels, process titles.   |
| Body L      | 18   | 28          | 0%             | Serif  | Marketing paragraphs, leads.           |
| Body        | 15   | 24          | 0%             | Serif  | Default running text, UI body.         |
| Small       | 13   | 20          | 0%             | Serif  | Captions, helper, footer copy.         |
| Eyebrow     | 12   | 16          | +8%            | Sans   | UPPERCASE. Section labels.             |

**Conventions**

- Headlines (Display / H1 / H2) are **Sans**.
- Body, UI text, footer info, list items, and italic pull quotes are **Serif**.
- The **Notably.** wordmark is **Serif** (kept as the typographic brand mark — the italic period is a Serif feature).
- Eyebrows are UPPERCASE Sans, 8% tracking, 12px.

---

## 3. Spacing

4pt base scale. Use only these values.

| Token         | Value |
| ------------- | ----- |
| `space.1`     | 4px   |
| `space.2`     | 8px   |
| `space.3`     | 12px  |
| `space.4`     | 16px  |
| `space.5`     | 24px  |
| `space.6`     | 32px  |
| `space.7`     | 48px  |
| `space.8`     | 64px  |
| `space.9`     | 96px  |
| `space.10`    | 120px |

**Section padding** (vertical) — `120px` desktop / `64px` tablet / `48px` mobile.
**Block gap** (default between sibling blocks within a section) — `24px`.
**Section gap** (between sections) — handled by section padding; no extra margin.

---

## 4. Radius

| Token            | Value   | Use                                          |
| ---------------- | ------- | -------------------------------------------- |
| `radius.none`    | `0`     | Color-cell blocks, full-bleed sections.      |
| `radius.sm`      | `4px`   | (Reserved.)                                  |
| `radius.md`      | `8px`   | Inputs.                                      |
| `radius.lg`      | `10px`  | **Buttons, cards, accent tiles.** (Default.) |
| `radius.xl`      | `16px`  | (Reserved for larger cards.)                 |

Note: the original pull-sheet specified `999` (full pill) for buttons. Production has standardized on `10px` to match the card system. Pill radius is no longer in use.

---

## 5. Layout & Grid

| Token                  | Value                |
| ---------------------- | -------------------- |
| `layout.max-content`   | `1280px`             |
| `layout.gutter.desktop`| `80px`               |
| `layout.gutter.tablet` | `32px`               |
| `layout.gutter.mobile` | `20px`               |
| `layout.columns`       | `12`                 |
| `layout.column-gap`    | `24px`               |
| `breakpoint.tablet`    | `640px`              |
| `breakpoint.desktop`   | `1024px`             |
| `artboard.desktop`     | `1440px` (canvas)    |

---

## 6. Components

### Button — Primary

| Property        | Value                                          |
| --------------- | ---------------------------------------------- |
| Background      | `#F3D0F4` (Pink, button variant)               |
| Text color      | `#272826`                                      |
| Font            | Sans, 15px / 18px line-height, weight 400      |
| Padding         | `14px 22px` (block / inline)                   |
| Border          | None                                           |
| Radius          | `10px`                                         |

### Button — Secondary

| Property        | Value                                          |
| --------------- | ---------------------------------------------- |
| Background      | `transparent`                                  |
| Text color      | `#272826`                                      |
| Font            | Sans, 15px / 18px line-height, weight 400      |
| Padding         | `13px 21px` (block / inline; 1px less to compensate for the border) |
| Border          | `1px solid #272826`                            |
| Radius          | `10px`                                         |

### Input

| Property        | Value                                          |
| --------------- | ---------------------------------------------- |
| Background      | `#FBFAF5`                                      |
| Text color      | `#272826`                                      |
| Placeholder     | `#272826` @ 50% opacity                        |
| Font            | Sans, 15px                                     |
| Padding         | `14px 18px`                                    |
| Border          | `1px solid #272826`                            |
| Radius          | `8px`                                          |

### Card (color-tile)

| Property        | Value                                          |
| --------------- | ---------------------------------------------- |
| Background      | Pink / Mint / Yellow (rotation)                |
| Radius          | `10px`                                         |
| Padding         | `32px 28px` (block / inline)                   |
| Internal gap    | `12px`                                         |
| Borders         | None                                           |

Pattern: cycle Pink → Mint → Yellow → Pink for 4-up grids. Repeat for 8-up.

---

## 7. Motifs

### Highlight

A single word or phrase wrapped in a brand accent block, used to call out the moment that matters in a headline.

| Property        | Value                                          |
| --------------- | ---------------------------------------------- |
| Background      | Pink / Mint / Yellow (one color per surface)   |
| Padding         | `0 14–18px` (horizontal only; scale with type) |
| Radius          | `0` (sharp marker edge)                        |
| Text color      | `#272826` (unchanged from surrounding text)    |

**Rules**

- Highlight one or two phrases per surface. Never highlight whole sentences.
- The page bookends use **Yellow** (Hero "Growing" → Final CTA "Count?"). Use Pink or Mint inside the body for variation.
- Don't add radius to the highlight block — a sharp edge reads as marker, a rounded edge reads as a badge.

### Color cell blocks

Used to organize information into rhythm: feature grids, role cards, footer maps.

- Square corners (`radius.none`), hard edges, no shadows.
- Cells share a single grid; vary only by accent color.

---

## 8. Voice & Tone

**Voice descriptors:** Plainspoken · Observant · Confident · Warm.

**Do**
- Short, direct sentences.
- Concrete nouns ("resume," "interview," "fit").
- Lead with the insight, not the setup.

**Don't**
- HR jargon ("synergy," "talent stack").
- Hype words ("revolutionary," "next-gen").
- Corporate hedging.

---

## 9. CSS Custom Properties (ready to paste)

```css
:root {
  /* Color */
  --color-off-black: #272826;
  --color-off-white: #FBFAF5;
  --color-pink: #F2D0F4;
  --color-pink-button: #F3D0F4;
  --color-mint: #DEFBEE;
  --color-yellow: #F6F2B6;

  /* Type */
  --font-sans: "Rhetorik Sans Trial", system-ui, sans-serif;
  --font-serif: "Rhetorik Serif Trial", Georgia, serif;

  /* Type scale */
  --type-display: 96px / 100px var(--font-sans);
  --type-h1: 64px / 68px var(--font-sans);
  --type-h2: 40px / 46px var(--font-sans);
  --type-h3: 24px / 32px var(--font-sans);
  --type-body-l: 18px / 28px var(--font-serif);
  --type-body: 15px / 24px var(--font-serif);
  --type-small: 13px / 20px var(--font-serif);
  --type-eyebrow: 12px / 16px var(--font-sans);

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;
  --space-10: 120px;

  /* Radius */
  --radius-none: 0;
  --radius-md: 8px;
  --radius-lg: 10px;

  /* Layout */
  --layout-max: 1280px;
  --gutter-desktop: 80px;
  --gutter-tablet: 32px;
  --gutter-mobile: 20px;
  --column-gap: 24px;

  /* Breakpoints — for reference; use in media queries */
  --bp-tablet: 640px;
  --bp-desktop: 1024px;
}
```

---

_Last updated: May 12, 2026. Source of truth: this file. Paper canvas is the visual reference._
