# Design Sync Notes — Imaginary Cakes

## Repo Shape

- Private Next.js 14 App Router app, no TypeScript, no published dist
- No Storybook — synth-entry mode: converter discovers components from `src/components/`
- Package alias `@/*` → `./src/*` via `jsconfig.json`
- Path alias quirk: `@/data` resolves to the `src/data/` directory — Windows esbuild throws `ERROR_INVALID_FUNCTION` when it tries to open a directory. Fixed by `.design-sync/tsconfig-ds.json` with explicit `"@/data": ["./src/data/index.js"]` mapping.

## Build Command

```
node .ds-sync/package-build.mjs \
  --pkg imaginary-cakes \
  --entry ./ds-components-entry.js \
  --node-modules ./node_modules \
  --out ds-bundle \
  --config .design-sync/config.json \
  --overrides .design-sync/overrides
```

(The `--entry ./ds-components-entry.js` path intentionally doesn't exist — it forces PKG_DIR to walk up to the repo root where `package.json` lives, which is needed for `dts.mjs` to read `exportedNames`. Without it, PKG_DIR defaults to `node_modules/imaginary-cakes/` which doesn't exist.)

## Lib Overrides (`.design-sync/overrides/`)

### `bundle.mjs`

Next.js (`next/link`, etc.) is bundled inline as one of the 3 inlined externals. Next.js references `process` at runtime (not just at build time), which crashes the IIFE when loaded in a plain browser context. Fixed by adding a banner polyfill:

```js
var process=globalThis.process||(globalThis.process={env:{NODE_ENV:"production"},browser:true,version:""});
```

Import fix: `../../.ds-sync/lib/common.mjs` (not `./common.mjs`).

### `source-kit.mjs`

The synth-entry barrel uses `export * from '...'` which does **not** re-export default exports. All 8 default-exported components (Marquee, PageHero, ClosingCTA, Footer, GalleryGrid, StatsSection, AwardsRow, TestimonialCarousel) were invisible to the bundle namespace. Fixed by also emitting `export { default as Name } from '...'` for files where a `export default function/class Name` is detected.

Import fix: all relative lib imports repointed to `../../.ds-sync/lib/`.

## Excluded Components

- `Nav` — uses `usePathname` from `next/navigation` which throws outside the Next.js runtime. Excluded via `componentSrcMap: {"Nav": null}`.

## Fonts

- Playfair Display + Lato are loaded via `next/font/google` at runtime — no `@font-face` to ship. Suppressed via `runtimeFontPrefixes: ["Playfair Display", "Lato"]`.

## GSAP

- `ArchFrame` and `OvalFrame` use GSAP + ScrollTrigger via dynamic `import()` inside `useEffect`. These don't affect static preview rendering — the components mount without animation and look correct.

## node_modules Symlink

The `.design-sync/node_modules` symlink points to `../.ds-sync/node_modules` so the forked `bundle.mjs` can resolve `esbuild`. This is gitignored and must be recreated on a fresh clone:

```bash
ln -sfn ../.ds-sync/node_modules .design-sync/node_modules
# or on Windows:
cmd /c mklink /D .design-sync\node_modules ..\.ds-sync\node_modules
```

## Re-sync Risks

- **WorkTile previews use Unsplash URLs** — if those images are unavailable, the preview shows the frame shape only. Safe for component demo but not production-accurate.
- **Data inlined at bundle time** — `src/data/index.js` (CAKE_PHOTOS, REVIEWS, etc.) is bundled inline. If the data changes (new cake entries, updated reviews), rebuild and re-sync to update the bundle.
- **GSAP animations skipped in previews** — ArchFrame and OvalFrame animate on scroll in production. Previews show the static end-state. The component is fully functional when mounted in a Next.js app.
- **35 exports vs 34 components** — the synth barrel emits both `export *` and `export { default as Name }` for files with a default export. For files that also have named exports matching the default name, there is 1 extra export. This is benign (validate passes; the extra is just an alias) but worth monitoring on re-sync.

## Known Render Warns (triaged, not failures)

- `[GRID_OVERFLOW]` PageHero (`WithChildren`) and WorkTile (`Grid`) — fixed with `cardMode: "column"` in config overrides. Column mode cards can't re-flag wide by construction.
- Icons at default 18px height render thin/blank without authored previews — resolved by `.design-sync/previews/Icon*.tsx` files showing icons at 18/24/36px with labels.
- OrnamentRule renders at 6px maxHeight without a preview container — resolved by `.design-sync/previews/OrnamentRule.tsx` wrapping in a padded div.
