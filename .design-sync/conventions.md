# Imaginary Cakes — Design System Conventions

Imaginary Cakes is a custom cake bakery in Wilmington, NC. The design language is warm, artisanal, and elegant — never corporate or sterile.

## Brand Palette

| Token | Value | Use |
|---|---|---|
| `--color-cream` | `#FAF6F1` | Page background |
| `--color-cream-deep` | `#F0E8D8` | Section backgrounds, card backgrounds |
| `--color-ink` | `#2C1810` | Primary text, dark surfaces |
| `--color-gold` | `#C9A84C` | Accent, button gradients |
| `--color-body` | `#4A3020` | Body text |
| `--color-muted` | `#8B6F5E` | Secondary labels, captions |
| `--color-blush` | `#F9E4E4` | Soft accent backgrounds |

## Typography

- **Display / headings**: Playfair Display (`var(--font-display)`) — serif, elegant, used for all h1–h6 and eyebrow labels
- **UI / body**: Lato (`var(--font-ui)`) — clean sans-serif, used for paragraphs and interface text
- **Italic text** in headings signals the brand's warmth: "Cakes so good, they _can't be real!_"

## Buttons

Always use the provided button components — never raw `<button>` or `<a>` elements for CTAs.

- **`GoldButton`** — primary CTA, gold gradient, used for "Start Your Order", "Contact Us"
- **`OutlineButton`** — secondary action, ink border, used for "View Gallery", "Learn More"
- **`LavenderButton`** — accent action, lavender background, used for contact form submit

## Layout Patterns

- Section padding: `80px 40px` desktop / `48px 24px` mobile
- Max content width: `1080px`, centered
- Use `SectionIntro` (eyebrow + title + OrnamentRule) to open every content section
- Use `PageHero` for page-top hero blocks (h1 + italic sub-title + optional body text)

## Component Notes

- **`ArchFrame`** / **`OvalFrame`**: image frames with GSAP scroll animations — pass `src` for the image URL, use `width`/`height` to control size
- **`Marquee`**: scrolling text banner, `color="gold"` or `"blush"`, pass `items` array of strings
- **`WorkTile`**: gallery card, expects a `cake` object with `photo`, `title`, `baker`, `category`
- **`BotanicalSprig`**: decorative SVG ornament, use as flank decoration (`side="left"` / `"right"`)
- **`OrnamentRule`**: hairline divider with diamond — appears between eyebrow and section title via `SectionIntro`

## What the Design Agent Should Know

When designing with these components:
1. Every page section starts with `SectionIntro` or `PageHero`
2. All CTAs use `GoldButton` (primary) or `OutlineButton` (secondary)
3. Images go in `ArchFrame` (portrait/vertical) or `OvalFrame` (portrait with label)
4. The brand palette is warm — use cream/ink/gold, avoid pure white or cool grays
5. `Nav` is excluded from this design system (uses Next.js router — not renderable in isolation)
