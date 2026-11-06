# rxs.to portfolio research — Muse (muse-wonder-full-1.0)

Independent research report. Shared brief: `BRIEF.md` in this folder.
Subject: Oskar Lang, software engineer and entrepreneur in Kufstein, Austria.
Audiences in order: (1) clients/collaborators who might hire him for contract work,
(2) Discord/developer peers, (3) recruiters.

## Method and evidence labels

- Searched gallery/list coverage (Colorlib developer portfolios roundup, Waida Studio
  portfolio examples, Bushe personal-website examples, Scrimba minimal portfolios,
  dev.to collections, Awwwards-adjacent coverage, and the issamzk.com personal-sites
  essay), then verified every candidate myself. Search results are discovery only.
- Candidate pool checked live with HTTP status (40 URLs, 39 returned 200 on the day
  of research; taminomartinius.de timed out and was excluded):
  paco.me, rauno.me, leerob.com, emilkowal.ski, antfu.me, brittanychiang.com,
  joshwcomeau.com, maximeheckel.com, bruno-simon.com, jhey.dev, paulstamatiou.com,
  mxstbr.com, samuelkraft.com, brianlovin.com, itssharl.ee, dennissnellenberg.com,
  aristidebenoist.com, rauchg.com, shud.in, cassidoo.co, overreacted.io,
  sarasoueidan.com, henry.codes, ped.ro, coryetzkorn.com, evanyou.me, patak.dev,
  kentcdodds.com, ishadeed.com, meowni.ca, jesse-zhou.com, olivierlarose.com,
  zehfernandes.com, samselikoff.com, delba.dev, tkdodo.eu, swyx.io,
  manuelmoreale.com, frankchimero.com, taminomartinius.de (dead/timeout, excluded).
- Shortlist: 20 sites (table below). Evidence per site is one of:
  - **observed (capture)** — I looked at the shoot.mjs PNGs (desktop light fold plus
    scroll frames where available) and/or `report.json`.
  - **observed (HTML)** — I read the rendered page text/structure via web fetch or
    curl. Structure, copy, navigation and content claims are verified; exact motion
    is not.
  - **recalled** — from memory, unverified this session. Used only for well-known
    interaction behaviour and always labelled.
- Capture status under the rs01 coordinator's mid-task resource order (machine load;
  parallel captures stopped; max 6 captures, sequential only): captures completed
  *before* that order landed are kept and used. Full captures with `report.json`:
  paco, rauno, leerob, emil-kowalski, antfu, brittany-chiang, josh-comeau.
  Partial captures (desktop frames only, no report.json, run killed): brian-lovin,
  jhey, maxime-heckel, mxstbr, paul-stamatiou, samuel-kraft — their fold/scroll PNGs
  were viewed and are cited as observed (capture, partial). Empty folders
  (aristide-benoist, bruno-simon, cassidoo, dennis-snellenberg, rauchg, sharlee,
  shu-ding) were **not** retried per the order; those sites are judged
  observed (HTML). The three `/lab` preview routes were likewise **not** shot after
  the order; the preview critique is observed (HTML) via web fetch + curl, and any
  visual/motion claim about the preview beyond HTML structure is marked inferred.
  This deviates from the original task text (shoot every shortlisted site and all
  three preview routes) because the later coordinator order explicitly overrides it.
- All shots live under `shots/muse/<slug>/` in this research folder.

## Principles

Twelve principles. Each names the sites that show it. "Observed" means seen in a
capture or in HTML this session unless marked recalled.

1. **Identity, role and proof fit in the first screen, in that order.** observed.
   Brittany Chiang: name, "Frontend Engineer", one-line value proposition
   ("I build accessible, pixel-perfect experiences for the web") fixed in the left
   column while About/Experience scrolls on the right (observed, capture).
   Antfu: name, "fanatical open sourceror and design engineer", then five labelled
   proof lines (Working at / Creator of / Recent work / Core team of / Maintaining)
   before any prose (observed, capture). Samuel Kraft: avatar, name, current role
   with employer link, 13-years line, contact links, then Projects (observed,
   capture partial). For Oskar the first screen must carry: name, "software
   engineer and entrepreneur", and his three server counts — no scroll required.

2. **One measure, one type system, relentless restraint.** observed.
   Paco Coursey runs the whole homepage on one centered column (roughly 640–700px
   in the 1440px capture), small body text, italic serif accents only for emphasis
   phrases, underlined inline links, no cards, no hero image (observed, capture;
   report.json: body font Sohne, heading Inter, 1424px page height). Emil Kowalski
   is even stricter: name, role, "Today", "Projects", four text-only project rows
   (observed, capture). Beauty here is spacing rhythm and alignment, not effects.
   This is the closest existing match to Arc's own rules (sentence case, regular/
   medium weights, no decorative gradients).

3. **Projects are rows with a one-line outcome, not tiles with adjectives.** observed.
   Paco: each project is a linked name (⌘K, Writer, Next Themes) plus one factual
   line ("Perfect dark mode in Next.js apps") (observed, capture). Brittany Chiang:
   each project gets a thumbnail, a 2–3 line factual description, a hard metric
   where one exists ("★ 719", "100k+ Installs") and tech pills (observed, capture,
   scroll50). Antfu compresses this furthest: projects are inline pills with tiny
   logos inside running prose, so 20+ projects fit in five lines without a grid
   (observed, capture). Oskar has better outcome numbers than any of them
   (16M+, 6.1M, 667K servers; $1M+; 150K in month one); the row format is how to
   make those numbers scannable instead of boastful.

4. **The site itself is the best demo of the claimed skill.** observed + recalled.
   Bruno Simon's portfolio is a drivable Three.js/WebGPU world with achievements,
   a race circuit, visitor "whispers" and full keyboard/gamepad controls (observed,
   HTML — the controls/achievements/behind-the-scene copy is in the page).
   Rauno Freiberg's homepage is a horizontal gallery of oversized work panels
   ("Devouring Details", "Craft", "Projects", "Field Notes") with a filmstrip-style
   progress indicator at the top (observed, capture). Maxime Heckel's homepage is a
   dark shader/WebGL showcase ("Raymarched terrains", "Volumetric Lighting",
   "Whimsical interaction patterns") (observed, capture partial; canvas renders
   black in headless capture, which is itself a lesson — see Anti-patterns).
   Oskar's equivalent is not WebGL. It is Discord-scale product engineering, so his
   demo should be a working product surface (see Interaction moments: a slash-command
   playground or a live server-count), not a generic animation.

5. **Exactly one memorable detail per page; everything else quiet.** observed.
   This is Arc's stated rule and the best sites obey it independently. Leerob's one
   detail is the "Default / Long" toggle above his bio, switching biography length
   in place next to a single large illustration (observed, capture). Jhey's is a
   live-data footer strip ("MESSIN' WITH 404 CONCEPTS IN BEDFORD · 50.5°F · 14:34",
   recent game, now-playing) under an otherwise plain text index (observed, capture
   partial). Paul Stamatiou's is a fixed left icon rail (home/about/photos/theme)
   on a warm paper-like background (observed, capture partial). Sites with five
   memorable details (see Anti-patterns) are the ones that feel templated.

6. **Writing, notes or beliefs carry the peer audience; projects alone don't.**
   observed. Leerob's homepage is Bio → Notes ("Things I believe", "Understanding
   AI", "Developer experience"…) → dated Blogs list; there is no project grid at all
   (observed, capture). Max Stoiber (mxstbr.com) is a nested belief list
   ("What you tolerate becomes the standard", "Speed wins", "Feelings are data")
   in deliberately plain HTML (observed, capture partial). Guillermo Rauch's index
   is just essay titles with years and per-post view counts ("Pure UI · 709,361")
   (observed, HTML). Cassidy Williams leads with recent posts, a "random one"
   affordance and a tag index (observed, HTML). Peers share essays, not CVs.
   Oskar currently gives audience 2 nothing to share.

7. **A visible "now": current roles, availability, location, local time.** observed.
   Paco has a dedicated "Now" section on the homepage (observed, capture). Dennis
   Snellenberg shows "Located in the Netherlands", a live local-time footer
   ("09:41 PM CET" in fetched HTML) and a "Let's work together / Get in touch"
   closing block with email and phone (observed, HTML). Samuel Kraft: "Based in
   Stockholm, Sweden" in the intro block (observed, capture partial). Jhey's footer
   shows live location/weather/time (observed, capture partial). For a contractor,
   "now" must also answer: taking new work or not, from when, what kind.

8. **Navigation is an index, not a menu bar.** observed.
   Antfu's header is Blog / Projects / Talks / Sponsors plus icon links to
   podcasts, photos, demos, Bluesky, GitHub, RSS and a theme toggle — the whole
   sitemap in one row (observed, capture). Brittany Chiang's left column nav is
   three items (About / Experience / Projects) with a line indicator that tracks
   scroll position (observed, capture; scroll-tracking behaviour recalled).
   Shu Ding: About / Thoughts / Projects / Guestbook (observed, HTML). Josh Comeau:
   Categories / Courses / Goodies / About plus search, sound, theme and RSS icons
   (observed, capture). Four to six destinations, named as nouns the visitor wants.

9. **Light and dark are both first-class, and the switch is visible.** observed.
   Antfu and Josh Comeau both expose a theme control in the header icon row
   (observed, captures). Paco's own Next Themes project is linked from his homepage
   as a credential (observed, capture). Brittany Chiang is the counterexample:
   dark-only navy (report.json background rgb(15,23,42) in both schemes), which
   looks deliberate but gives up Arc's semantic-token story (observed, capture).
   A theme switch is also the cheapest "memorable detail" Arc already ships
   (eclipse/split/rise variants in the catalog).

10. **Metrics are shown where they are earned, attached to the work.** observed.
    Brittany Chiang attaches stars/installs under the specific project (observed,
    capture). Rauch attaches view counts to each essay (observed, HTML). Antfu's
    proof is affiliation density (core team of Vue/Nuxt/Vite) rather than numbers
    (observed, capture). None of the best sites opens with a disembodied stats band
    of four big counters — that pattern reads as a SaaS landing page (see Preview
    critique; the /lab variants all do exactly this, observed, HTML).

11. **Personal texture in small doses: a face, a place, one non-work fact.** observed.
    Samuel Kraft and Brian Lovin both open with a small circular portrait above the
    name (observed, captures partial). Brittany Chiang's About ends with climbing,
    tennis and "searching for Korok seeds" (observed, capture). Leerob's bio names
    his wife, daughters and music fandom in two lines (observed, capture). Antfu
    links photography and a /use page from the intro (observed, capture). Oskar's
    equivalents (Kufstein, BUNDjugend camp leadership, wrote Groovy at 16, left
    Passau after one semester) are already in the /lab copy but buried at the bottom
    (observed, preview HTML).

12. **Performance and plain HTML are a design feature, stated or visible.** observed
    + recalled. MXStbr's near-unstyled page and Paco's 1424px-tall homepage load
    instantly and make "fast" tangible (observed, captures). Bruno Simon documents
    his stack and open-sources the portfolio on GitHub from a "Behind the scene"
    panel (observed, HTML). Cassidy Williams footers "This site is open source"
    with a repo link (observed, HTML). For an engineer who sells infrastructure
    competence (Terraform, Kubernetes, AWS), a colophon/how-this-site-works note is
    proof, not decoration (inferred for Oskar).

## Archetypes

Six layout families seen across the 20-site shortlist.

### A. Editorial single column
Sites: Paco Coursey, Emil Kowalski, Antfu, Samuel Kraft, Brian Lovin, Paul Stamatiou,
Leerob (hybrid, see F), Shu Ding. One narrow column, name and role at top, then
labelled sections (Today/Now, Projects, Writing) as text rows. Strengths: fastest to
scan, cheapest to keep current, typography does all the aesthetic work, maps 1:1 onto
Arc components (no custom canvas). Weakness: can look identical to every other
Vercel-adjacent engineer unless one memorable detail (Principle 5) is added; large
project visuals don't fit (Samuel Kraft solves this by breaking the column for one
full-width media card per project, observed capture partial).
Fit for Oskar: **best base archetype.** His content is text and numbers, not visuals;
the /lab/profile variant is already this. Needs Kraft-style media breaks for the
three bot projects.

### B. Sticky identity + scrolling record (two-pane index)
Sites: Brittany Chiang is the canonical example; Leerob's current homepage is a
loose variant (text left, one sticky illustration right). Left pane never moves:
name, role, one-liner, section nav, socials. Right pane scrolls About → Experience
→ Projects → résumé link. Strengths: perfect for recruiters and clients verifying a
career; the identity/CTA is always on screen; experience rows with date ranges and
tech pills are exactly Oskar's seven-role history. Weakness: this is the most-forked
portfolio layout on GitHub (recalled; Brittany's own v4 is listed on her site with
"6k+ stars and 3k+ forks", observed capture) — copying it closely signals template.
Fit for Oskar: **best information architecture, risky visual identity.** Steal the
IA (sticky identity, dated experience rows, "View full résumé" link), not the look.

### C. Bento / card grid
Sites in shortlist use it only partially: Maxime Heckel's dark card grid of shader
experiments with dates (observed, capture partial), Paul Stamatiou's "Recent gear"
card strip (observed, capture partial), and Oskar's own /lab/bento (observed, HTML).
Pure bento homepages were common in the wider candidate pool (recalled) but none of
the strongest engineer sites leads with a full bento — they use cards below a text
intro. Strengths: heterogeneous content (stat, photo, project, map, now-playing)
coexists; looks "designed" immediately. Weakness: hierarchy flattens — a Webby award
and a skills list get the same visual weight; grids date quickly; hard to keep
balanced when content changes. Fit for Oskar: **good as a second act** (three project
cards + Webby card + local-time/availability card, as /lab/bento already sketches),
weak as the whole page.

### D. Scroll story / timeline
Sites: Oskar's /lab/story is the purest example in this research (observed, HTML);
Rauno's horizontal scroll gallery is the award-site cousin (observed, capture);
Dennis Snellenberg's work list-to-case-study flow is a vertical variant (observed,
HTML). Strengths: Oskar genuinely has a story arc (16-year-old writes Groovy → 16M
servers → YouTube shutdown → SoundCloud/Netflix → five teams at once) that a
chronology tells better than a list; the story variant's headline ("I build software
for millions of Discord servers, and have since I was 16") is the best single line
in any /lab variant (observed, HTML). Weakness: stories are slow for a client who
wants skills, availability and a contact button in 20 seconds; scroll-jacking and
pinned scenes are the first thing to break on mobile and with reduced motion.
Fit for Oskar: **best narrative, worst utility.** Use as an About/story page or as
the middle chapter of the homepage, not as the only route to the CV.

### E. Playful / game-like / the site is a toy
Sites: Bruno Simon (drivable 3D world), Jhey Tompkins (experiment index —
"Generative Sprite Masks", "Pluckable Grid", "Refractive Gem" — with red-underline
links and a hand-drawn signature, observed capture partial), Josh Comeau (sky/rainbow
hero, 3D character, sound toggle, observed capture), Maxime Heckel (shader cards).
Strengths: unforgettable; the work sample and the portfolio are the same object;
peers share these sites unprompted. Weakness: clients/recruiters can't extract a CV;
theme risk for a B2B contractor; Josh's playfulness works because he sells courses
to developers, not engineering to companies. Fit for Oskar: **steal one toy, not the
archetype.** One bounded interactive (live bot demo, command palette, animated
server-count) inside archetype A/B gives 80% of the memorability at 5% of the cost.

### F. Writing-led index (blog/notes as homepage)
Sites: Leerob (Bio/Notes/Blogs), Rauchg (essay index with view counts), Cassidoo
(recent posts + tags + newsletter), MXStbr (beliefs list + Essays/Notes links),
Shu Ding (Thoughts/Projects/Guestbook), Josh Comeau (articles are the homepage).
Strengths: compounds — every essay is a new entry point and a peer-credibility asset;
dates prove the site is alive. Weakness: worthless until there is writing; an empty
or stale blog (last post 2023) actively hurts. Fit for Oskar: **the 12-month play,
not the launch play.** Ship A/B now with a Notes section stubbed by 2–3 substantial
posts (Groovy shutdown postmortem, Hydra Rust rebuild, multi-agent workflow), or
don't show a writing section at all.

## Shortlist

Scores out of 10: Aes = aesthetics, Int = interaction/motion quality, Rel = relevance
to Oskar (content twinship, audience fit, Arc compatibility). Scores judge the
homepage as observed, not the person's overall fame.
Evidence: C = observed (capture), Cp = observed (capture, partial), H = observed (HTML).

| URL | Owner | Archetype | One thing worth stealing | Map to Oskar's content | Shots folder | Aes | Int | Rel |
|---|---|---|---|---|---|---|---|---|
| https://antfu.me | Anthony Fu | A editorial | Inline logo-pills for projects inside five labelled proof lines (C) | Groovy/Hydra/SoundCloud/Netflix as pills; "Working at" = his 3 contract roles | shots/muse/antfu/ | 8 | 7 | 10 |
| https://paco.me | Paco Coursey | A editorial | Three-column Building/Projects/Writing index on one screen; Now section (C) | Building = Hydra rebuild; Projects = bots; Writing = future notes | shots/muse/paco/ | 9 | 8 | 9 |
| https://brittanychiang.com | Brittany Chiang | B two-pane | Dated experience rows + tech pills + "View Full Résumé" (C) | Seven roles with server counts attached per role; /cv link in-flow | shots/muse/brittany-chiang/ | 8 | 7 | 9 |
| https://dennissnellenberg.com | Dennis Snellenberg | D work-list | "Let's work together" closing + live local time + work index (H; hover image preview recalled) | Freelance conversion pattern for audience 1; Kufstein local time | shots/muse/dennis-snellenberg/ (empty, HTML only) | 9 | 9 | 9 |
| https://samuelkraft.com | Samuel Kraft | A + media cards | Short text intro, then one oversized media card per project (Cp) | Hydra/SoundCloud/Groovy get one big visual each; rest stays text | shots/muse/samuel-kraft/ | 8 | 7 | 9 |
| https://leerob.com | Lee Robinson | F writing-led | Bio length toggle (Default/Long) switching copy in place (C) | Default = client bio; Long = peer/founder bio; Notes = beliefs | shots/muse/leerob/ | 8 | 6 | 8 |
| https://rauno.me | Rauno Freiberg | D/E horizontal gallery | Filmstrip progress + oversized panels + Craft experiments index (C) | Motion quality bar for card-to-article morph; not the layout | shots/muse/rauno/ | 10 | 10 | 6 |
| https://emilkowal.ski | Emil Kowalski | A editorial | Radically short project list; the linked products (Sonner/Vaul) are the demo (C) | Proof that 4 rows suffice when each links to a live product | shots/muse/emil-kowalski/ | 7 | 5 | 7 |
| https://paulstamatiou.com | Paul Stamatiou | A + rail | Icon side-rail, credential mini-list, "Recent gear" uses strip (Cp) | Uses/gear page model; acquired/founder credentials as quiet list | shots/muse/paul-stamatiou/ | 8 | 7 | 7 |
| https://brianlovin.com | Brian Lovin | A/F index | Writing list directly under a 2-line intro; no project grid needed (Cp) | Peer-facing writing index once posts exist | shots/muse/brian-lovin/ | 7 | 6 | 7 |
| https://jhey.dev | Jhey Tompkins | E experiment index | Live-data footer (location, weather, game, now-playing) (Cp) | Steal footer strip: Kufstein time, Hydra status, now-building | shots/muse/jhey/ | 8 | 9 | 6 |
| https://www.joshwcomeau.com | Josh W. Comeau | E/F playful blog | Sound + theme toggles in header; category chips as navigation (C) | Interaction density reference; visual theme off-limits for Arc | shots/muse/josh-comeau/ | 9 | 9 | 5 |
| https://maximeheckel.com | Maxime Heckel | C/E shader grid | Dated experiment cards with persistent pill nav (Cp) | Card grid execution reference for /lab/bento project cards | shots/muse/maxime-heckel/ | 9 | 9 | 5 |
| https://bruno-simon.com | Bruno Simon | E game world | Achievements/whispers/behind-the-scene as content structure (H) | Upper bound of "site as demo"; colophon idea only | shots/muse/bruno-simon/ (empty, HTML only) | 9 | 10 | 3 |
| https://itssharl.ee | Charles "Sharlee" Bruyerre | D graphic portfolio | Bilingual FR/EN with numbered Home/Work/About/Contact index (H) | DE/EN toggle precedent if Oskar ever localises; numbered nav | shots/muse/sharlee/ (empty, HTML only) | 9 | 8 | 5 |
| https://aristidebenoist.com | Aristide Benoist | E award-canvas | Nothing safely stealable for Arc; page is JS-canvas, near-empty HTML (H) | Cautionary example (see Anti-patterns) | shots/muse/aristide-benoist/ (empty, HTML only) | 8 | 8 | 4 |
| https://mxstbr.com | Max Stoiber | F beliefs list | "Some things I believe" nested list as the whole homepage (Cp) | Beliefs/operating-principles section for founder credibility | shots/muse/mxstbr/ | 4 | 3 | 7 |
| https://rauchg.com | Guillermo Rauch | F essay index | Per-essay view counts as quiet social proof (H) | Per-project server counts in an index list, same pattern | shots/muse/rauchg/ (empty, HTML only) | 6 | 4 | 6 |
| https://cassidoo.co | Cassidy Williams | F blog/newsletter | "Read a random one" + tag index + newsletter-first framing (H) | Newsletter/random-post only if writing becomes real | shots/muse/cassidoo/ (empty, HTML only) | 6 | 5 | 6 |
| https://shud.in | Shu Ding | A/F minimal | Guestbook as a nav item; 3-paragraph career summary (H) | Guestbook = Discord-community wall idea for audience 2 | shots/muse/shu-ding/ (empty, HTML only) | 7 | 6 | 6 |

Near misses from the 40-pool, checked live but not shortlisted: overreacted.io
(writing-only, no portfolio structure to steal beyond restraint), sarasoueidan.com
and ishadeed.com (excellent teaching blogs, wrong content shape), henry.codes,
ped.ro, coryetzkorn.com (strong design-engineer minisites, redundant with
Paco/Emil/Samuel), evanyou.me and patak.dev (ecosystem-famous, content-thin
homepages), kentcdodds.com (course business, not a hiring portfolio),
jesse-zhou.com and olivierlarose.com and zehfernandes.com (creative-dev showcases,
redundant with Bruno/Rauno), samselikoff.com, delba.dev, tkdodo.eu, swyx.io,
manuelmoreale.com, frankchimero.com, meowni.ca (writing/personal-web, redundant
with Leerob/Cassidoo/MXStbr). All recalled as live-checked (HTTP 200) this session;
not individually judged beyond screening.

## Interaction and motion moments

Specific moments worth copying. "What happens" is one line each.
Capture-observed items describe what is visible in stills/structure; continuous
motion behaviour is marked recalled where I could not see it move.

1. **Command palette as portfolio navigation** — Paco Coursey is the author of ⌘K
   (cmdk), linked first under Projects (observed, capture). Steal for rxs.to:
   Cmd+K opens a palette listing projects, CV (PDF), email-copy, theme switch and
   socials; typing "hydra" jumps to that case study. Arc ships a command-palette
   block, so this is nearly free (catalog, recalled from brief).
2. **Bio length toggle** — leerob.com: "Default / Long" segmented control above the
   bio swaps the biography text in place without a page change (observed, capture;
   the control and both states' entry point are visible). For Oskar: Default =
   3-line client bio, Long = founder story including Groovy shutdown and Passau.
3. **Sticky identity with scroll-spy nav** — brittanychiang.com: left column
   (name/role/nav/socials) stays fixed while the right column scrolls, and the
   About/Experience/Projects rule-line lengthens for the section in view (layout
   observed, capture; scroll-spy motion recalled).
4. **Horizontal panel gallery with filmstrip progress** — rauno.me: scrolling moves
   oversized work panels sideways while a tick-mark indicator at top-center tracks
   position; a small crosshair cursor sits at panel center in captures (observed,
   capture fold + scroll50). Steal only the progress indicator idea for /lab/story.
5. **Hover image preview following the cursor over a work list** —
   dennissnellenberg.com: work rows are text (title + discipline + year) and an
   image preview follows the pointer (list structure observed, HTML; cursor preview
   recalled — it is this site's signature pattern). Perfect for Oskar's experience
   rows: hovering "Groovy" shows the bot's Discord UI instead of a static grid.
6. **Magnetic buttons and oversized footer CTA** — dennissnellenberg.com:
   "Let's work together" closes the page with email, phone, local time and socials
   (observed, HTML; magnetic hover recalled). For Oskar the stealable part is the
   closing block itself, which only /lab/story currently attempts ("Have something
   to build?", observed preview HTML).
7. **Live-data footer strip** — jhey.dev: footer shows current activity/location,
   weather, local time, recent game and now-playing track, all in mono microcopy
   (observed, capture partial). Oskar version: "Kufstein · 14:34 · Hydra: 6.1M
   servers · building the Rust rebuild". Live where an API exists, static text
   otherwise — do not fake "live".
8. **Local-time card** — dennissnellenberg.com footer ("09:41 PM CET", observed
   HTML) and /lab/bento already contains a Kufstein clock card rendering "--:--"
   in server HTML (observed, preview HTML). Keep it, but it must tick client-side
   and degrade to "Kufstein, Austria (CET)" without JS.
9. **Theme switch as the memorable detail** — joshwcomeau.com and antfu.me put the
   light/dark toggle in the header icon row next to search/RSS (observed, captures).
   Josh's toggle is famously animated with sound (sound icon observed, capture;
   animation recalled). Arc's eclipse/split/rise theme switches (catalog) are the
   on-brand version: one per site, not all four.
10. **Sound toggle** — joshwcomeau.com header has a speaker icon controlling UI
    sounds (observed, capture). Verdict for Oskar: do not copy. B2B visitors and
    Arc's reduced-motion rule make UI sound a liability; listed here because it is
    the most-copied "delight" feature in this genre and should be a deliberate no.
11. **Inline project pills** — antfu.me: project names render as small rounded pills
    with product logos inside sentences; the whole portfolio is readable as prose
    and clickable as an index (observed, capture). Directly applicable to Oskar's
    intro paragraph, which already names Groovy, Hydra, SoundCloud and Netflix in
    prose (observed, preview HTML).
12. **Card-to-article morph** — /lab/bento's stated pattern (project cards morph into
    articles, per brief; cards and images observed in preview HTML, morph inferred).
    Reference execution quality: rauno.me panel transitions and Maxime Heckel's card
    grid (observed, captures). Rule from Arc: the morph must preserve the clicked
    card's title/image position (cause and effect), with a reduced-motion crossfade.
13. **Animated counters, attached to claims** — the /lab variants animate server
    counts (the HTML contains duplicated counter text, e.g. "16M+1616M+", observed
    preview HTML — likely an animated-counter implementation detail; check
    screen-reader output). Brittany Chiang shows the calmer version: static metric
    text under each project (observed, capture). Counters are worth keeping once,
    at the project row, not as a four-up stats band on every variant.
14. **Scroll-driven timeline with year markers** — /lab/story renders 2018–2026
    markers and five numbered chapters (observed, preview HTML). Rauno's tick
    indicator (observed, capture) is the stealable progress treatment. Keep scroll
    native (no hijack); chapters should be reachable by anchor links for sharing.
15. **Guestbook / visitor traces** — shud.in has a Guestbook nav item (observed,
    HTML); bruno-simon.com lets visitors leave 30-character "whispers" in the 3D
    world (observed, HTML). For a Discord-community figure, a moderated
    guestbook/"servers that ran Groovy" wall is a plausible audience-2 feature —
    but only with moderation; an unmoderated wall is a spam/abuse surface.
16. **View-transition page changes** — none of the captures can prove view
    transitions from stills; several shortlisted sites are known for them
    (recalled: antfu.me and leerob.com use soft page transitions). Recommendation
    stands on Arc grounds alone: shared-element transition from project row/card to
    case-study header (title + image), crossfade fallback, `prefers-reduced-motion`
    branch. Labelled recalled/inferred, not observed.
17. **Copy-email with in-place confirmation** — already in all /lab variants
    ("Copy email / Copied / Failed" states in HTML, observed) and on rauno.me
    ("Email / Copied" in HTML, observed). Keep; make it the secondary action next
    to one primary "Email me" or booking action, not three competing buttons.

## Content ideas

What the best portfolios show that rxs.to (per the brief and /lab HTML) does not yet.
Judged per audience: C = clients, P = peers, R = recruiters.

1. **Availability and engagement shape** (C, high). Current status ("taking one new
   contract from <month>" / "booked until <month>"), engagement types (sole
   engineer, tech lead, project build), location/timezone and languages (German
   native, English fluent — already in /lab/profile skills, observed HTML, but not
   framed as hireability). No shortlisted freelancer omits this; Dennis's whole
   contact flow is built on it (observed, HTML). This is the single biggest missing
   content type for audience 1.
2. **A contact flow beyond mailto** (C, high). A short intake (who, what, timeline,
   budget range) or a booking link, with mailto as fallback. /lab only has
   "Email me" + copy-email (observed, HTML). Paul Stamatiou's email-subscribe field
   and Dennis's contact page are the models (observed). Even a "what happens next"
   line ("I reply within two working days") beats a bare address.
3. **Case-study pages per flagship project** (C/P/R, high). One page each for
   Groovy (growth, monetisation, YouTube shutdown), Hydra (web app, premium subs,
   Rust rebuild), SoundCloud bot (OAuth 2.1, AWS/Terraform) and Hey Netflix
   (150K servers in a month, Webby). Structure: problem → role → stack → outcome
   metric → screenshot/link. Brittany Chiang's project rows and Samuel Kraft's
   media cards are the shallow version (observed); Oskar's material supports the
   deep version and no /lab variant has it beyond the bento morph (inferred).
4. **Proof from others: testimonials, logos, press** (C/R, high). One or two short
   attributed quotes (SoundCloud/Netflix collaborators, contract clients) and a
   quiet client/brand line (Netflix, SoundCloud, Top.gg are already named in copy).
   The Webby Honoree 2023 credential exists in /lab/bento as a card (observed,
   HTML) — promote the pattern: awards/coverage as a small proof list, not a logo
   soup. None of the editorial-archetype sites do logo walls; they use affiliation
   lines (antfu) or metrics (brittany) instead (observed).
5. **Writing / notes** (P, high; C medium). 2–3 substantial pieces would change the
   site's peer value entirely: "What shutting down Groovy taught me", "Rebuilding
   Hydra in Rust", "Running a bot on millions of servers" (costs, sharding, abuse).
   Leerob/Rauch/Cassidoo prove the index format (observed). Do not launch an empty
   /writing route.
6. **Now page** (C/P, medium). Paco's Now section (observed) compressed to a dated
   block on the homepage plus /now: current three contracts, Hydra rebuild focus,
   what he's learning (Rust, multi-agent workflows), camp season. The /lab
   "Working on now" list (observed, HTML) is 80% of this; it lacks a date and the
   availability line from item 1.
7. **Uses page** (P, medium). Antfu's "hardware/software I use" and Paul Stamatiou's
   "Recent gear" (observed) are the genre standard. For Oskar the interesting
   version is the multi-agent AI development workflow across machines (named in
   brief) — a /uses or /workflow page about that is genuinely differentiating
   content peers would link to.
8. **Talks / appearances / OSS list** (P/R, medium if it exists). Antfu has Talks as
   a top-level nav item (observed). If Oskar has conference/community appearances
   or notable open-source contributions, they belong in the antfu-style labelled
   lines; if not, omit — do not pad.
9. **Live or dated stats with sources** (C/P, medium). Server counts with an
   "as of <month>" date and a link to the live product (hydra.bot, soundcloud.bot)
   read as evidence; undated counters read as marketing (inferred from Principle
   10). If a real Hydra server-count API is cheap, one live number is the best
   "memorable detail" candidate on this list.
10. **Personal page texture** (P, low-medium). Photos (antfu, stamatiou), a
    Kufstein/Alps note, BUNDjugend camp work with one photo. /lab/profile already
    lists these under "Beyond work" (observed, HTML) — they need placement and one
    image, not more copy.
11. **Colophon** (P, low). "Built with UI Arc, hosted on Cloudflare" plus a short
    how-it-works note or source link (bruno-simon's Behind the scene panel,
    cassidoo's "this site is open source", observed HTML). For an infrastructure
    engineer this is cheap credibility.
12. **Explicitly not recommended**: a newsletter (Cassidoo model) before writing
    exists; a guestbook before moderation exists (item 15 above); a skills
    percentage/bar chart in any form; a generic "services" pricing grid unless
    Oskar wants productised offers — his engagements (sole engineer, tech lead)
    don't price by package (inferred from brief).

## Anti-patterns

What made weaker (or weaker-for-Oskar) sites worse. Observed unless marked.

1. **Canvas-first, content-never.** aristidebenoist.com returns near-empty HTML
   ("0 0 1" of extractable text, observed HTML); maxime-heckel's hero captures as
   a black rectangle headless (observed, capture partial). If WebGL fails, is
   blocked, or is crawled, there is no portfolio left. Any Arc interactive must
   leave the full text record in HTML.
2. **The game that eats the CV.** Bruno Simon is a masterpiece that requires WASD
   to discover basic facts (controls observed, HTML). For a client on a phone with
   30 seconds, it converts nobody. Memorability without an extractable record is
   an art project, not a hiring page.
3. **Stats band as hero.** Four animated counters before any work (all three /lab
   variants, observed HTML) is SaaS-landing grammar. The best engineer sites
   attach each metric to its project (Principle 10). Repeated identically across
   variants, the band also wastes the one chance to differentiate them.
4. **The chip wall.** Long undifferentiated skill lists (17+ tools in /lab/bento's
   "Tools I reach for", observed HTML) tell a client nothing about depth.
   Brittany Chiang attaches 3–4 pills per job instead (observed, capture), which
   lets the same data prove recency and context. One grouped skills block (as in
   /lab/profile, observed) is the maximum; never skill bars/percentages.
5. **Template recognisability.** Brittany Chiang's layout is beautiful and also the
   most-forked developer portfolio in the world (fork count observed on her own
   site). Colour-swapping it is the fastest way for Oskar to look junior. Same
   warning for generic Framer bento templates seen during search (recalled from
   search results, not shortlisted).
6. **Dark-only or light-only by accident.** Brittany's dark-only is a deliberate
   brand; copied without that intent it just forfeits Arc's token system and
   hurts print/CV consistency (observed/inferred). Pick both, design both.
7. **Motion that doesn't explain anything.** Parallax heroes, gradient blobs and
   cursor glows (generic in the wider pool, recalled) violate Arc's cause-and-effect
   rule and date instantly. Josh Comeau's rainbow/character hero (observed,
   capture) works only because playfulness *is* his product.
8. **Hidden contact.** Sites that end without an explicit next step (several
   writing-led homepages end at a post list, observed: rauchg, cassidoo) are fine
   for people who aren't for hire. Oskar is for hire; every variant must end with
   the Dennis/story-style closing block.
9. **Stale "now".** An undated current-role list rots silently. Date the Now block
   and the stats (item 9, Content ideas); a wrong availability line is worse than
   none.
10. **Placeholder chrome shipping as content.** /lab/bento's clock renders "--:--"
    in server HTML (observed). Any live-data element needs a designed no-JS/loading
    state, or it reads as a bug on exactly the page meant to prove engineering care.

## Preview critique

Scope note: judged **observed (HTML)** via web fetch and curl under the coordinator
capture cap (see Method). Copy, structure, IA and component inventory are verified;
exact visual polish and motion timing are **inferred** from component names/structure
and the brief, not seen. Route contents below are observed (HTML).

### /lab/profile — editorial single column (archetype A)
Avatar, name, role, Kufstein, 3-line bio, Email + copy-email + CV link, four-stat
band, "Working on now" (5 roles), full Experience with per-role bullets and links,
grouped Skills (Programming / Infrastructure / Business / AI / Languages),
"Beyond work", socials. This is the most complete and most Paco/Emil-like variant,
and the only one whose experience section carries real bullet-level proof (HubSpot
integration, OAuth 2.1 move, Terraform in SoundCloud's AWS org). Against the best
sites it is 80% there: it lacks per-role metrics/pills (Brittany), project media
(Kraft), a Now date/availability line (Paco/Dennis) and any memorable detail.

### /lab/bento — grid with card-to-article morph (archetype C over A)
Same intro and stat band, then three project cards with images (hydra.jpg,
soundcloud.jpg, groovy.jpg) and server counts, a Webby Honoree 2023 card, Working
on now, an undifferentiated tools list, socials with handles, and a Kufstein
local-time card. This variant has the best *assets*: real project images, the award
as its own card, and the clock. It has the weakest *proof*: experience detail and
skills grouping from profile are gone, replaced by the chip wall (Anti-pattern 4).
The card-to-article morph (brief; inferred) is the right signature interaction if
it opens real case-study content — if it only enlarges the same three lines, it's
decoration.

### /lab/story — scroll timeline (archetype D)
Strongest headline of the three ("I build software for millions of Discord
servers, and have since I was 16"), 2018–2026 markers, "Eight years of building in
public" in five chapters (Groovy at 16 → Hydra → SoundCloud + Groovy shutdown →
Hey Netflix → five teams at once), then a details section (experience list), then
the only real closing CTA in the set: "Have something to build?" with email/copy
and socials. This is the only variant that tells the founder arc and the only one
that ends like Dennis. It is also the slowest path to skills/CV for a client, and
its chapter text is thinner than profile's bullets.

### The three biggest gaps vs. the best sites

1. **No conversion layer.** None of the variants states availability, engagement
   type, or a next step beyond mailto; none has testimonials, a booking/intake
   flow, or a "what happens next" line. Every for-hire site in the shortlist
   (Dennis, Brittany, Samuel Kraft) answers "can I hire this person, for what,
   how" on the homepage. For Oskar's audience 1 this outranks every visual choice.
2. **No Oskar-specific memorable detail.** The interactions present (animated
   counters, card morph, scroll timeline — inferred from structure/brief) are
   generic Arc demonstrations that any Arc site could ship. The best sites each
   have one detail inseparable from the owner (Leerob's bio toggle, Jhey's live
   footer, Antfu's pills, Paco's ⌘K). Oskar's candidates are sitting in his own
   material: a live Hydra server count, a Cmd+K palette over projects+CV, a
   Default/Long bio toggle, or a miniature Discord slash-command playground.
   Pick exactly one (Arc's own rule), build it properly, and make everything else
   quieter — including removing the repeated four-counter band from the hero.
3. **No depth below the homepage.** There are no case-study pages, no writing, no
   now/uses pages — so peers have nothing to share, clients can't verify how he
   works, and search has one page to rank. The best sites are small *systems*
   (antfu: projects/talks/use/photos; leerob: notes/blogs; stamatiou: gear/photos/
   writing). Minimum viable depth: three case studies (Groovy, Hydra, Netflix or
   SoundCloud) + dated Now block. Writing can follow.

Net judgement (inferred synthesis): build the production site as **profile's column
and copy depth, with bento's three project media cards and Webby card inserted as
media breaks (Kraft pattern), story's headline and closing CTA, and story itself
demoted to an /about chapter** — then spend the remaining effort on gaps 1–3 above
rather than a fourth layout.

## Top 5

Ranked for rxs.to specifically (audiences, content, Arc fit), not for general fame.

1. **https://antfu.me — Anthony Fu.** The content twin. A tools/ecosystem engineer
   whose entire credibility fits in five labelled, pill-linked proof lines plus
   Projects/Talks/Use/Photos sections (observed, capture). Oskar's bot portfolio,
   contract roles and future uses/writing pages map onto this structure with almost
   no invention, in Inter, in light and dark, at Arc's exact register of restraint.
2. **https://paco.me — Paco Coursey.** The aesthetic and motion ceiling for an
   Arc site: one column, one type system, a three-part index (Building / Projects /
   Writing) and a Now section, where quality is spacing and micro-interaction
   rather than effects (observed, capture). If rxs.to feels like paco.me with
   Oskar's numbers attached, it has succeeded. Also the source of the ⌘K steal.
3. **https://brittanychiang.com — Brittany Chiang.** The information-architecture
   reference for audiences 1 and 3: sticky identity, dated experience rows with
   pills, per-project metrics, in-flow résumé link (observed, capture). Steal the
   IA wholesale for Oskar's seven roles; deliberately do not steal the dark-navy
   look, which is now a template tell.
4. **https://dennissnellenberg.com — Dennis Snellenberg.** The freelance-conversion
   reference: text work index with hover previews (preview behaviour recalled),
   location and live local time, and a closing "Let's work together" block with
   direct contact details (structure observed, HTML). This is how the site turns
   Oskar's proof into enquiries, and its hover-preview list is the best treatment
   for his experience rows.
5. **https://samuelkraft.com — Samuel Kraft.** The layout compromise that resolves
   profile-vs-bento: a Paco-short text intro (avatar, role, 13-years line, based-in
   line, contact links) followed by one oversized media card per project (observed,
   capture partial). It gives Hydra, SoundCloud and Groovy the visual weight they
   deserve without surrendering the page to a bento grid.

Honourable mentions: leerob.com for the Default/Long bio toggle (the best single
small interaction in this research) and rauno.me as the pure craft/motion quality
bar — both worth stealing from, neither worth copying as a layout.
