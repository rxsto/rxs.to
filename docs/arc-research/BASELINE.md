# rxs.to Arc rewrite: baseline for the next build pass

Settled 6 November 2026 by a three-model council (Opus 5.5, Sol 6.1, Muse Wonder Full) over two rounds, from three independent research passes (Sol 6.1, Cursor Grok 4.7 Fast, Muse Wonder Full) and an evaluation of all 381 Arc items. All three members accepted this baseline and scored it 8/10. Where a point was decided by majority, the dissent is noted.

## Goal

Rewrite rxs.to as a full UI Arc site that is calm, modern and quietly interactive. It should serve, in order, clients who might hire Oskar for contract work, peers in the Discord and developer community, and recruiters. The site should show what Oskar personally owned and decided, not just how big the numbers were.

## Inspiration set

| # | Site | Take | Don't take | Informs |
|---|---|---|---|---|
| 1 | https://paco.me | The 640px column with 16px/28px body text, and Now and Contact written as plain sentences | His serif accents and fonts. Arc keeps Geist and Inter | The whole page rhythm |
| 2 | https://jakub.kr | The identity line (name, role, place), icon rows of name plus one-line purpose, and Copy email and CV as inline text links so "Email me" is the only button | — | Hero, Now rows |
| 3 | https://antfu.me | Labelled ownership lines that separate kinds of ownership (co-founded, co-own, project lead, built for), with inline project pills | The icon-heavy header row | Proof lines under the hero |
| 4 | https://samuelkraft.com | One wide media card per flagship project, with a caption under it | Showing more than three | Selected work |
| 5 | https://benji.org | An "Updated <month year>" stamp, a year-grouped ledger with one "New" marker, and local time as one plain footer sentence | — | Now stamp, Since 2018, footer |
| 6 | https://portfolio.chsmc.org | Case-study page grammar: a first-person paragraph on what he owned, framed screenshots with captions naming one decision each, and a date range | — | The /work pages |

Cut, with their single useful idea absorbed elsewhere: Emil Kowalski (covered by Jakub and Paco), Brittany Chiang (dated rows come through Benji, and her layout is the most-forked portfolio template), Lee Robinson (the bio toggle lost, see below), nan.fyi (its case-study pattern sits inside uncaptured articles). Never copy: START screens, drive-to-read worlds, canvas-only pages, cursor glows, sound toggles.

## Decisions

- **No stats band.** Each number appears once, inside the line or caption of the project that earned it, with its own period. Groovy's figures are past tense ("16M+ servers by 2021"). Hydra's carries an "as of" month. No count-up animation. Unanimous.
- **Factual fix.** The current Story page puts "16M+" at 2018. Groovy reached that by 2021. Every figure carries its own period. Unanimous.
- **Removed:** the weather card, the clock card (local time becomes footer text), the variant switcher, the skills badge wall (tools go inside sentences, the full list lives on /cv), experience accordions, Story's "details" tabs, and the standalone Webby card (the Webby moves to the Netflix line and its case study). Unanimous.
- **Story gets its own /story route.** The homepage keeps Story's headline and a slim "Since 2018" index linking into it. /story runs on ordinary page scroll with dated, anchored chapters. It doesn't use scroll-story's nested scroll area. Unanimous after round 2. Opus moved over from wanting it as a homepage chapter.
- **The memorable detail is the year ruler on the homepage (option A).** It uses the free `ruler-slider` as the header of the Since 2018 index. Dragging or using the arrow keys moves the needle from 2018 to 2026 and highlights the matching row. Years with no entry land on the latest earlier row. The five rows stay visible as plain text, and that list is all you get without JavaScript or under reduced motion. Opus and Muse ranked it first. Sol ranked the Hydra card opening into its case study (C) first and A second.
  - **Process.** Decide A now and prototype only A against the veto test below. If it fails, fall back to C, not the bio toggle. Opus and Sol both rank C above the toggle. Muse preferred the toggle as fallback.
  - **No second ruler on /story.** Its chapters are plain dated entries with anchors. Two members wanted it this way. Opus wanted the same slider as /story's scroll marker.
- **Case studies at /work/hydra and /work/hey-netflix.** Unanimous. **Third: SoundCloud is recommended** (Opus, Muse): the clearest current client story and real assets, while Groovy's story lives on /story and its only screenshot is the shutdown notice. Sol preferred Groovy. Oskar decides.
- **The bio toggle is out.** With /story and the case studies holding the long version, a second biography mechanism repeats the narrative, and it's Lee Robinson's signature, not Oskar's.

## Veto test for the year ruler

The prototype ships only if it passes all of these in a real browser:

1. At 390px, dragging the tape doesn't fight vertical page scroll, and taps and arrow keys step it on a phone.
2. Keyboard and screen-reader users get one announcement per commit (`onValueCommit` plus a polite live region), not a flood.
3. Years without an entry resolve to the latest earlier chapter, and no figure implies precision the facts don't have.
4. Reduced motion removes the coasting and leaves the plain five-line dated index.
5. In a 30-second skim, it doesn't read as a toy sitting above five lines.

## Homepage outline

All in the Paco column. The only primary action is "Email me".

1. **Hero.** Avatar, "Oskar Lang" and "Kufstein, Austria" as Jakub's identity line. Story's headline as the H1 ("I build software for millions of Discord servers, and have since I was 16."), with `text-reveal`. One sentence on what clients hire him for, which Oskar supplies; no availability date is invented. "Email me" as a button-styled link, with Copy email and CV as inline text links.
2. **Proof lines.** Four Antfu lines with bot-avatar pills, numbers and years in muted text: co-founded Groovy (16M+ servers by 2021, $1M+ revenue), co-own Hydra (6.1M servers, as of month), project lead on the SoundCloud bot (667K servers), built Hey Netflix for Netflix (150K+ servers in its first month, Webby Honoree 2023).
3. **Now.** "Updated November 2026". One sentence on leading frontend, infrastructure and the monorepo for Hydra's 2026 Rust rebuild, then Jakub rows for Digital Office 24, Finaure and Top.gg, one clause each naming the kind of role. One human line (Kufstein, the BUNDjugend Bayern camp leadership team).
4. **Selected work.** Three Samuel Kraft media cards: Hydra, Hey Netflix and the third case study. Each caption gives his role, one decision and the dated number, and links to /work/<slug>. A quiet crossfade on that link is fine, but it isn't the memorable detail.
5. **Since 2018.** The year ruler over five dated rows: 2018 Groovy (written at 16), 2020 Hydra, 2021 SoundCloud and Groovy's shutdown, 2022 Hey Netflix, 2026 the Rust rebuild and contracts, with one "New" marker on the rebuild. Each row links to its /story chapter.
6. **Contact close.** "Have something to build?", one sentence on what helps him reply (the goal and the timeline), "Email me" and Copy email.
7. **Footer.** "<time> in Kufstein, Austria", falling back to "Kufstein, Austria (CET)" without JavaScript. Then GitHub, LinkedIn, Discord, X, the CV, and the theme switch.

## Routes

- **Exist:** `/`, `/work/hydra`, `/work/hey-netflix`, `/work/<third>`, `/story`, and `/cv` (unchanged, with PDF, JSON Resume and Markdown). Secondary pages get a simple way back home.
- **Don't exist in this pass:** /writing, /notes, /now, /uses, /about, /projects, a guestbook, a newsletter, a booking or intake flow, a services page, and public /lab routes or a variant switcher. Writing arrives later as a Benji-style dated list, once at least two real posts exist.

## Arc shortlist

**Use**

| Item | Tier | Job |
|---|---|---|
| `text-reveal` | free | Hero H1 only. Its entrance runs in CSS, so the headline reads before scripts load |
| `ruler-slider` | free | The year ruler in Since 2018, controlled, with its veto test |
| `card` | free | The three media cards, each linking to /work/<slug>, without its quick-look dialog. Make the link the obvious click target |
| `copy-button` | free | Copy email in the hero and the contact close |
| `badge` | free | At most two or three per page: the "New" marker, the Webby marker, and the case-study date range. Two members also allow it on the Now date. Opus wants that as plain text |
| `theme-switch` (`rise`) | free | One quiet footer toggle. Delete the eclipse and split code paths in the current ThemeToggle |
| `cta-section` (centered) | free | The homepage and /story close. Pass `faces={[]}`, and never keep the default marketing note |
| `site-footer` (minimal) | free | Every route, with newsletter and status off. The local-time sentence goes in `tagline` |

**Conditional**

- `site-header` (simple): case studies, /story and /cv only. A plain back link may be enough.
- `toc-progress` (Pro): case studies with four or more real headings. Shorter ones get a plain anchor list.
- `avatar` (free): the portrait and the 16px bot avatars in the proof pills. Opus says use it, Sol says optional, and Muse says a plain image is enough.
- Data-gated, for case studies only, and absent until the real data or assets exist:
  - `line-replay` (Pro) or `line-chart` (free): one per series, only with real server-count history, never smoothed from endpoints.
  - `image-compare` (free): only with same-crop pairs.
  - `code-block` (free): check Rust highlighting first.
  - `lightbox-gallery` (Pro): only with five or more real screenshots.
  - `testimonial-stage` (Pro): only with real, permissioned quotes. A plain quote inside a case study is enough.
- If the ruler fails and C becomes the detail: a cross-document view transition from the Hydra card to /work/hydra. vinext stubs out React's `ViewTransition` (Opus observed this in its `check.js`), so this means CSS `@view-transition { navigation: auto; }` on a plain link, or a hand-wrapped `document.startViewTransition`.

**Drop:** `stats-band`, `card-to-article` (Pro; its doc says articles with their own URL should be real pages), `scroll-story` (Pro; a nested scroll area and no props), `in-view-title` in heroes (its doc reserves it for headings below the fold), `accordion` for experience, `hover-card` (a new dependency, unverified tap behaviour, and it would repeat the media cards), `time-dial` (a second interactive moment on the homepage, plus time-zone code, for a job the footer line already does), `tabs` and `expandable-text` (the bio toggle lost), and the command palette (too few destinations).

**Hand-built, because no Arc item does them:**
- the proof-line pill (avatar plus name as an inline link; not `badge` or `chip-group`)
- button-styled anchors for "Email me" and "Read my CV", since Arc's `button` has no href
- `<figure>`/`<figcaption>` frames on `--surface` for case-study media
- the Benji footer time line and its no-JS fallback
- the optional view transition

## What Oskar supplies or decides

1. **The engagement sentence.** What clients hire him for now, with no invented availability date.
2. **The third case study.** SoundCloud is recommended. Groovy is the alternative.
3. **Case-study material.** First-person notes on what he owned and one decision per project, approved screenshots, and an approved Hey Netflix image.
4. **Real data, only if it exists.** Server-count history for any chart. Real quotes for any testimonial.
5. **The licence path, before any push.** The local `spike/arc` branch holds Pro source without the Arc notice: card-to-article, scroll-story, a byte-identical copy of the scroll-story stylesheet, and the derived CareerStory.tsx. This baseline drops all of them. The only Pro items left in it are `toc-progress` (conditional, and replaceable with an anchor list) and the data-gated Pro maybes. A free-only build is fully possible. Choose between free-only, Pro with the notice kept as the licence allows in an end product, or a private repo.

## Council record

Rounds: 2

| Delegate | Round 1 (confidence) | Round 2 (score) | Satisfied |
| --- | --- | --- | --- |
| Claude Opus 5.5 | 7/10 | 8/10 | yes |
| GPT Sol 6.1 | 8/10 | 8/10 | yes |
| Muse Wonder Full | 7/10 | 8/10 | yes |

Sources, in this folder: `BRIEF.md`, `research-{sol,grok,muse}.md`, `MERGE.md`, `council-r1-{opus,sol,muse}.md`, `ROUND2.md`, `council-r2-{opus,sol,muse}.md`, `arc-eval-components.md`, `arc-eval-blocks.md`, and captures in `shots/`.
