# Pass 2: site study and build notes

Measured 6 November 2026 on atmos with Playwright 1.64 (Chromium) at 1440 × 900 and 390 × 844, light and dark colour schemes. Values are computed styles read from each live page. Screenshots of each site's first screen are in `pass2/site-<site>-<width>-<scheme>.png`. Benji and Chase McCoy have no dark mode: their dark captures match the light ones.

## Measurements

| | paco.me | jakub.kr | samuelkraft.com | benji.org | portfolio.chsmc.org |
|---|---|---|---|---|---|
| Column | 640px, centred | 644px | 640px box, 598px text | 550px text, 16px padding | 707px for intros, wider for media |
| Top of page to name | 128px | 128px | 112px to the avatar, 154px to the name | 80px | Hero card at about 80px |
| Body text | Söhne 16/28, 400 | Inter 17/27.6, 400 | Inter 14/21, 500 | Inter 14/20, 460 | Inter 16/24, 400 |
| Name or H1 | 16/28, 500, body colour | 17/27.6, 500 | 14/21, 500 | 14/20, 500 | Serif 24/33.6, a whole sentence |
| Section headings | 14/20 muted, or 16/28 500 | 17px 500, the body size | 14px 500, muted | 14px, 40% black | Serif 36/43 (projects), 24/29 (items) |
| Gap between sections | 64px | 128px | 84px | 40px | 80px with a wavy rule |
| Rows | Three columns of link plus one line | 71px rows: 8px padding, 16px radius, 8px gap, 44px tile | Media item, then title and muted line | Year column, title, date right, hairlines | Title, one line, media |
| Light background and text | #fff, #3a3a3a | #fcfcfc, #1c1c1c titles, #6f6f6f paragraphs | #fdfdfc, #1b1b18 titles, #706f6c paragraphs | #fdfdfc, #111, muted rgba(0,0,0,.4) | #fff, #202020, #646464 paragraphs |
| Dark background and text | #1a1a1a, #e5e5e5, muted #a0a0a0 | #101010, #f0f0f0, paragraphs #b5b5b5 | #161615, #ededec, muted #a1a09a | none | none |
| Inline links | Body colour, 1px underline, 2.5px offset, colour transition 240ms | Title colour, underline transparent until hover, then muted, 200ms | Muted with underline, darkens on hover | No underline, dotted rule under | Muted, no underline |
| Media | none | 44px icon tiles | 598px wide, 10.5px radius, 14px hover pad at 14px radius | none | Phone frames and 16:9 tiles, captions 13.6/20.4 in a 250px column beside them |
| Badges | none | none | none | "New" in #ff00aa, circled by a hand-drawn stroke | Date range as a 12px mono pill: 1px #e8e8e8 border, 2px × 8px padding |
| Footer | "Find flow." and the year, 14/20 | none | none | "7:51am in Los Angeles, California", muted, under a short rule | none |
| Motion | Each block fades in and rises 10px over 600ms, staggered | none | Each block fades in over 500ms, staggered | The "New" circle draws in about 400ms, plus an idle mascot | none on load |

## Translated into Arc

Arc keeps Geist and Inter, regular and medium weights, sentence case, its semantic tokens and its focus outline. Each value above maps onto a token:

| Decision | Value in the build | From |
|---|---|---|
| Column | `--measure: 40rem` (640px), 24px gutters on phones | Paco, Samuel Kraft |
| Top padding | `clamp(5rem, 3rem + 6vw, 8rem)`: 80px on a phone, 128px on desktop | Benji on phones, Paco and Jakub on desktop |
| Body | Inter 16px, line height 1.75 (28px), `--text-secondary` | Paco's 16/28. Jakub's and Samuel's muted paragraphs |
| Name, headings | 16px Inter medium in `--foreground`, the same size as body | All four with a name H1 |
| Section gap | `clamp(4rem, 3rem + 4vw, 6rem)`: 64px to 96px | Between Paco's 64px and Jakub's 128px |
| Inline links | `--foreground`, 1px underline at 3px offset in `--border-strong`, firming to the text colour over `--duration-standard` | Paco |
| Rows | 44px tile with `--border` and `--shadow-resting`, title in foreground, one muted line, the whole row a link with a `--surface-muted` hover at `--radius-control` | Jakub |
| Media cards | Arc `card` with a 16:9 image and its caption below, the case-study link stretched over the card | Samuel Kraft |
| Ledger | 56px year column in `--text-muted`, hairlines in `--border-subtle`, one Arc `badge` for "New" | Benji |
| Footer | Local time as one muted 14px sentence under a 32px rule, then links and the theme switch | Benji |
| Case studies | Geist 28px regular title with an outline `badge` for the date range, "What I owned", framed figures with one-decision captions | Chase McCoy |
| Light and dark | Arc's neutral tokens: white and oklch(19%) backgrounds, close to Paco's #fff and #1a1a1a | Paco, Jakub, Samuel Kraft |
| Entrance | Hero blocks fade in and rise 8px over `--duration-considered` (480ms) on `--ease-enter`, 60ms apart, CSS only and off under reduced motion | Paco, Samuel Kraft |
| Memorable detail | The year ruler, and nothing else that moves on its own | Baseline |

## Arc items in the build

- **Used, free:** `ruler-slider`, `card` (no quick look), `copy-button` (plain), `badge` (the "New" marker and the case-study date range), `avatar`, `theme-switch` (`rise` only), and `button` through theme-switch.
- **Hand-built instead of the shortlist:**
  - **The contact close.** `cta-section` scales its heading from 30px to 52px. Under a 16px name H1 that would make the close the loudest line on the page, which none of the five sites does. It's a Paco "Connect" block instead.
  - **The footer.** `site-footer` has no slot for the theme switch and prints a "© year brand." line, so the footer is Benji's time sentence plus a link row.
- **Removed:** `text-reveal` (hero option A has no display H1), `stats-band`, `scroll-story` and `card-to-article` (both Arc Pro, without the notice), `accordion`, `tabs`, `in-view-title`, `segmented-control`, and the lab variants.
- **Licence:** every Arc file left in `components/arc/` is free and MIT, and `components/arc/LICENSE` carries the notice. No Pro file stays, so the Arc Pro token was not needed.

## Year ruler veto test

Run against the production build (`pnpm build`, then `pnpm preview`) in Chromium. Evidence: `pass2/veto/veto.json` and the captures beside it.

| # | Point | Result | Evidence |
|---|---|---|---|
| 1 | At 390px, dragging doesn't fight page scroll; taps and keys step it | **Pass** (emulated touch) | A vertical swipe on the tape scrolled the page 292px and left the value alone. A horizontal drag moved it from 2026 to 2023 with no page scroll. A tap two ticks right moved it from 2023 to 2025. The arrow keys step one year. Chromium touch emulation, not a physical phone or iOS Safari |
| 2 | One announcement per commit, not a flood | **Not verified** | The polite live region gets exactly one message per commit: 8 messages for 8 key presses, and 1 for a mouse flick during which `aria-valuenow` changed 8 times. The VoiceOver check could not run. VoiceOver's AppleScript interface timed out (`-1712`) because macOS needs "Allow VoiceOver to be controlled with AppleScript" turned on in VoiceOver Utility first, which takes an admin password. The open risk: during a drag or flick, the focused slider's own value changes once per tick, and VoiceOver may read them as a series |
| 3 | Years without an entry resolve to the latest earlier chapter, with no false precision | **Pass** | 2023, 2024 and 2025 highlight the 2022 row and announce "2024: no entry. Latest before it, 2022: Built Hey, Netflix for Netflix". The ruler shows no figures |
| 4 | Reduced motion leaves the plain five-line index | **Pass** | With reduced motion, and also without JavaScript, there's no slider, no highlight and no reserved gap, and all five rows show as plain links (`veto4-390-*.png`) |
| 5 | In a 30-second skim it doesn't read as a toy | **Pass** (judgment) | After the browser pass the large rolling readout is hidden (it is `aria-hidden` and repeats the row), and rows stay at full strength until the ruler is first moved. The section reads as a dated list under a quiet scale (`veto5-*.png`). Starting at 2026 leaves the right half of the tape empty |

The prototype has not yet cleared all five points, because point 2's VoiceOver half is open. Per the baseline, no fallback was built.

## Route checks

Every route (`/`, `/story`, `/work/hydra`, `/work/hey-netflix`, `/work/soundcloud`, `/cv`) at 390px and 1440px, each in light, dark, JavaScript off and reduced motion: all return 200, none has horizontal overflow, and none logs a console error or warning. Captures are in `pass2/routes/`, downscaled JPEGs. A keyboard sweep of `/`, `/story`, `/work/hydra` and `/cv` at 1440px light and 390px dark found a visible focus outline on every stop (`pass2/focus/`).
