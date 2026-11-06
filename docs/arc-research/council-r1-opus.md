# Council round 1: Opus ruling

Seat: claude-opus-5-5. Read in full: BRIEF.md, MERGE.md, research-sol.md, research-grok.md, research-muse.md. Did not read the other council seats.

Evidence I checked myself this round:

- **Observed, capture** (PNGs I looked at): preview profile, bento and story folds, story scroll25 on desktop and mobile (all in `shots/grok/_preview-*`). Paco scroll25, Emil fold, Jakub fold, Samuel Kraft fold, scroll25 and mobile scroll25, Antfu desktop and mobile folds (`shots/muse/antfu`), Brittany scroll25 (`shots/sol/brittany`), Lee fold, Benji fold, Chase McCoy fold and scroll25, nan.fyi fold.
- **Observed, HTML** (curl today, all HTTP 200): the three live `/lab` routes, plus dennissnellenberg.com, benji.org, portfolio.chsmc.org, jakub.kr, antfu.me and samuelkraft.com. The live lab text matches the grok captures: same copy, same four-up band, same dock.
- **New captures: none.** Every decision below could be made from existing captures and HTML, so I spent none of the browser budget.

How I ranked: the question is not which site is best. It is which site gives the next build pass the most concrete thing it can't get from a higher-ranked site. Three sites that teach the same row grammar would waste slots, so redundancy is the main reason for cuts.

## Final set

Six sites, ranked.

### 1. https://antfu.me (Anthony Fu)

- **Take: labelled proof lines as the answer to "what did you actually own".** Right under the intro, one line per kind of ownership, each a label followed by inline pills (a 16px avatar plus the name in a muted rounded chip). Observed, capture: "Working at / Creator of / Recent work / Core team of / Maintaining". For Oskar:
  - Co-founded · [Groovy] 16M+ servers, $1M+ revenue, 2018 to 2021
  - Co-own · [Hydra] 6.1M servers, leading the 2026 Rust rebuild
  - Project lead · [SoundCloud bot] 667K servers, since 2021
  - Built for Netflix · ["Hey, Netflix"] 150K+ servers in month one, Webby Honoree 2023

  Each pill uses the bot's own avatar and links to its case study or live product. Numbers sit after the pill as muted text, with years attached.
- **Why it ranks first:** this is the piece that settles the stats band. It keeps all four numbers, makes each one belong to a role and a date, and tells a client that founder, co-owner and project lead are different jobs. Observed, mobile capture: the lines wrap cleanly at 390px.
- **Must not take:** the dotted page background, the signature logo, the header row of eight icons, the multi-colour logo soup (use monochrome or the bots' own avatars on `--surface`), or the "fanatical open sourceror" register.
- **Informs:** the proof block directly under the hero. It replaces both the four-up stats band and the number-heavy bio paragraph.

### 2. https://samuelkraft.com (Samuel Kraft)

- **Take: one column-width media card per flagship, title and one paragraph underneath.** Observed, capture: a card about 600px wide on the text column, about 16:7.5, radius about 12px, dark ground with the product centred, then a 15px title and a two-line muted caption. Cards are stacked with about 40px between them, never side by side. On mobile they go full width at the same ratio.
- For Oskar: Hydra, SoundCloud and Hey Netflix, using the real assets the bento already has (hydra.jpg, soundcloud.jpg; Netflix needs an approved asset). The caption says what Oskar personally did and one decision he made, not a server count. The count is already in the proof lines. Clicking the card opens the case study through the bento's existing card-to-article morph, with a crossfade under reduced motion.
- **Must not take:** the length (Kraft runs eight or more cards; Oskar stops at three), or the darkening. The bento's screenshots are dimmed until their text is unreadable (observed, bento capture). Show them at full contrast.
- **Informs:** Selected work.

### 3. https://benji.org (Benji Taylor)

- **Take three small, exact things.** All observed in capture and HTML.
  1. A dated stamp under the name: "Updated Aug 22, 2026". Oskar's Now block gets the same "Updated <month year>". That date is what makes the Now block honest.
  2. A year-grouped ledger: the year in a left gutter about 100px wide, a name in the middle, a date right-aligned in muted tabular figures, hairline rules between rows, and exactly one "New" marker in the whole list.
  3. Local time as one line of plain footer text: "6:33am in Los Angeles, California".
- For Oskar, the ledger becomes the base markup of the Since 2018 chapter (see the Story ruling). The one "New" marker goes on the Hydra Rust rebuild. The footer line replaces the bento clock card and the "12° cloudy" weather.
- **Must not take:** the hand-drawn pink circle around "New" (use an Arc badge in `--accent`), the sleeping-animal doodle, or a writing list. Oskar has no posts yet.
- **Informs:** the Since 2018 chapter, the Now stamp and the footer.

### 4. https://jakub.kr (Jakub Krehel)

- **Take: the identity line, and contact links inline in the intro prose.** Observed, capture:
  - The first line is "Name / role at Company", with a muted slash and a tiny company glyph.
  - The intro sentence carries contact itself: "reach me at @ jakubkrehel and via ✉ email … see code on GitHub", each with a 12px glyph inline.
  - Projects are rows: a 44px rounded-square icon tile, then the name, then one muted line.
- For Oskar:
  - Identity line: "Oskar Lang / Kufstein, Austria". Leave the role to the headline.
  - Contact: Copy email and the CV become inline text links like these, so "Email me" is the only filled button. That fixes the three equal buttons Grok flagged in the profile variant.
  - Rows: the icon-row grammar is used once, for the three current contracts inside Now (Digital Office 24 · sole engineer of the customer platform; Finaure · tech lead; Top.gg · frontend and the Electron status app).
- **Must not take:** the dithered pixel "ask" widget, the very small name (Oskar's hero is the Story headline), or a row list for the flagships. Those get media cards.
- **Informs:** the hero identity and contact line, and the contract rows in Now.

### 5. https://portfolio.chsmc.org (Chase McCoy)

- **Take: the case-study page grammar.** Observed, capture and HTML:
  - A heading of the company name, then a date pill ("2024 – 2026"), set in Geist rather than his serif.
  - One paragraph in the first person about what he personally owned: "I implemented many of the core features … with a particular focus on …".
  - Product media in device frames, each with a short side caption naming one specific decision: "Allowing users to provide financial information manually means they can try the app before deciding to trust us with their bank data."
  - Large employers get sub-projects as two-up title, sentence and image blocks ("Stripe" → "Sail", "List views").
- For Oskar: `/work/hydra` with sub-blocks for the web app and premium subscriptions, the Kotlin backend and the 2026 Rust rebuild. `/work/soundcloud` with sub-blocks for the OAuth 2.1 move and the Terraform production setup in SoundCloud's AWS organization. `/work/hey-netflix` covering the first month and the Webby. Discord-client frames or plain browser frames take the place of the phone frames.
- **Must not take:** the stacked-paper intro card, the serif display face, the expertise chip marquee (the same chip wall we are cutting), or the green "Get in touch" pill.
- **Informs:** the case-study routes only.

### 6. https://paco.me (Paco Coursey)

- **Take: the reading measure, and Now and Connect written as prose.** Observed in Sol's measurement and my scroll25 capture:
  - Body text is 16px on a 28px line, in a 640px column.
  - "Now" is two or three short paragraphs of plain sentences with one inline link and one human detail.
  - "Connect" is a single sentence: "Reach me at @pacocoursey or p@paco.me."
- For Oskar, the Now block is: the Benji stamp, one sentence on the Rust rebuild, the three Jakub contract rows, and one sentence of life (BUNDjugend camp leadership, Kufstein). The close uses the same one-sentence register under Story's headline.
- **Must not take:** Söhne and the italic serif accents (Arc is Geist and Inter, regular and medium only), the three-column Building/Projects/Writing index (Writing would be empty), or the entrance fade. My capture and Sol's both show a near-blank first frame.
- **Informs:** the measure for the whole page, Now and Contact.

**Off-list slot: not used.** No site outside the list beat a listed one on a decision that matters.

## Cuts

- **https://emilkowal.ski**: redundant. Jakub supplies the row grammar and Paco the Now block. Its two-line small-name hero conflicts with keeping Story's large headline, and its dark capture didn't switch theme.
- **https://brittanychiang.com**: its two useful ideas, dated rows and per-role proof links, come from Benji's ledger and Chase's case studies without the most-forked layout on GitHub. The sticky split also fights a 640px column. Dark navy only, plus a cursor spotlight Arc forbids.
- **https://leerob.com**: the Default/Long toggle is a borrowed signature, and it solves a problem Oskar won't have: the long version is the case studies plus /cv. The notes index needs notes he hasn't written.
- **https://nan.fyi**: its value is interactive explanation inside articles, which isn't verified this round and is a writing project. Revisit when Oskar writes the Rust rebuild note. Chase covers case-study structure with verified visuals.
- **https://dennissnellenberg.com**: only a loader was captured. The HTML shows a 2022-edition agency site whose stealable part is "Let's work together / Get in touch", which Story's close already does. Its hover previews only work with a pointer, and magnetic buttons are off-Arc.
- **https://rauno.me**: the motion bar for craft, not something to build from. Horizontal panels are a navigation tax for a client.
- **https://jhey.dev**: Benji's local-time line does the same job more quietly. Weather and "now playing" are noise for a client.
- **https://ped.ro**: in capture, facts sit in pills over blurred, illegible sentences. Essential facts must never be hover-only.
- **https://maggieappleton.com**: a writing garden with a strong voice. It's the wrong shape until Oskar publishes.
- **https://vladmoroz.com**: HTML only. Chase demonstrates "a job written as sentences of what I built" with visuals I verified.

All 16 candidates are accounted for: 6 kept, 10 cut.

## Rulings

### 1. Stats band: remove it. The numbers move, they don't disappear.

No four-up band anywhere on the homepage. The four figures live in the Antfu proof lines, each with a role and years. The one big animated figure lives only in the Since 2018 ruler card, where it changes with the year. That is cause and effect, not decoration.

Why: Muse is right that a band before the work is SaaS grammar, and Sol is right that it repeats the bio. Grok's "one band then stop" still spends the hero on scale with nobody attached to it. The proof lines keep every number visible without JavaScript, which an animated counter does not. Muse also observed duplicated counter text, "16M+1616M+", in the HTML; the ruler figure needs `aria-hidden` on its animated digits and a static label.

### 2. The memorable detail: the Story year ruler, and nothing else.

Keep the sticky year card from `/lab/story`: chapters on the left, a card on the right showing the year and one large figure that updates as each chapter scrolls into view. Observed: desktop and mobile captures, with the card stacking above the chapters on mobile.

Why this one:
- It is Oskar's alone. "Since I was 16" is the fact no other engineer can claim.
- It is already built.
- It obeys Arc's cause-and-effect rule.
- It degrades to a plain dated list.

Why not the others:
- The Lee toggle and the ⌘K palette are other people's signatures. A palette over five destinations is ceremony.
- A live Hydra count adds an API, a staleness problem and an honesty problem.
- A slash-command playground is a large build that turns the page into a toy. If it ever exists, it belongs inside the Hydra case study.
- Dennis-style hover previews only work with a pointer.
- Antfu pills are used as grammar, not as the detail.

Demoted to quiet chrome: the clock becomes footer text, weather is removed, the theme switch is a plain icon in the footer with no showpiece transition, and the variant dock leaves production.

Copy fix observed in capture: the 2018 stop shows "16M+ servers", but Groovy reached that by 2021. Each stop's figure needs its own time frame ("16M+ by 2021").

### 3. Brittany Chiang: cut from the set.

Not a top-3 site for rxs.to. Take her two ideas, each from another site:
- Dated rows with the date in a gutter: Benji.
- Specific proof links per role: Chase's case studies, plus links on the Antfu pills.

Why: Muse's warning holds. Her layout is the most-forked portfolio there is (6k+ stars and 3k+ forks, observed on her site), so it reads as a template. The sticky split identity also exists to keep contact visible beside a long experience list. Oskar's homepage won't have a long experience list; /cv does.

### 4. Where Story goes: a homepage chapter. No /story route.

Story becomes one homepage section, Since 2018:
- The base is Benji's year-grouped ledger: five year groups (2018, 2020, 2021, 2022, 2026), one sentence each, taken from Story's five chapters.
- The ruler card is a desktop enhancement on top of that ledger.
- On mobile and under reduced motion, the chapter is just the ledger. No sticky card, no animated figure.
- Groovy's story (written at 16, $1M+, forced offline by YouTube) lives here instead of in a case study.
- Story's "The details" tabs are dropped; /cv already holds them.

Why: the memorable detail must sit on the page that gets the traffic. A /story route would duplicate the case studies and /cv, and a client would never click it.

## Page outline

Homepage, in order, on a 640px column with 16px/28px body text:

1. **Hero.** Jakub-style identity line (avatar, "Oskar Lang", "Kufstein, Austria"). Story's headline as the H1. One or two sentences on what clients hire him for; Oskar must choose that focus, and no availability date. One filled "Email me", then Copy email and CV as inline text links.
2. **Proof lines.** Four Antfu lines: Co-founded Groovy, Co-own Hydra, Project lead on the SoundCloud bot, Built for Netflix. Bot-avatar pills, with numbers and years in muted text.
3. **Now.** Benji's "Updated <month year>" stamp. One sentence on leading the Hydra Rust rebuild. Three Jakub icon rows for Digital Office 24, Finaure and Top.gg. One human sentence (BUNDjugend, Kufstein).
4. **Selected work.** Three Samuel Kraft media cards, Hydra, SoundCloud and Hey Netflix, each captioned with Oskar's role and one decision. Each opens its case study through the card-to-article morph.
5. **Since 2018.** The Benji ledger with the Story ruler card on desktop. One "New" marker, on the Rust rebuild.
6. **Contact.** "Have something to build?", one sentence on what helps him reply (the goal and the timeline), the email address and Copy.
7. **Footer.** "<time> in Kufstein, Austria" as plain text, GitHub, LinkedIn, Discord, X, CV, and the theme icon.

Removed from all three variants: the four-up stats band, the clock card, weather, the skills chip wall, experience accordions, "The details" tabs, the standalone Webby card (the Webby moves into the Netflix proof line and case study), and the variant dock.

Secondary routes that exist:
- `/work/hydra`, `/work/soundcloud` and `/work/hey-netflix`, built on Chase McCoy's grammar.
- `/cv`, the existing page with PDF, JSON Resume and Markdown, linked from the hero and footer.

Routes that explicitly do not exist:
- `/story` and `/about`: their content is the Since 2018 chapter.
- `/writing` and `/notes`: none until the first real post ships, then a Benji-style dated list.
- `/now`: the homepage block covers it.
- `/uses`, `/projects`, `/guestbook` and `/lab`: `/lab` stays on the preview worker only.

One divergence from MERGE point 6: it named Hydra, Netflix and Groovy for case studies. I pick SoundCloud over Groovy:
- Groovy is told fully in the Since 2018 chapter.
- Groovy's only asset is a "has ended its service" screen.
- SoundCloud is the clearest client story: a brand relationship since 2021, a launch, an OAuth 2.1 migration and production in the client's AWS organization.

This is a content call Oskar should confirm, and Netflix needs an approved image.

## Confidence

**7/10.** The core (Antfu proof lines, Kraft cards, Benji ledger under the Story ruler, Chase case studies) is built from captures I looked at, and it resolves all four disagreements without adding a widget.

What would change my mind:

- **No approved artifacts for the case studies.** If Oskar can't show SoundCloud or Netflix screens or decision-level detail, Chase drops out. The case studies would shrink to longer captions on the homepage, and Emil would come back for its pure row list.
- **The ruler doesn't hold up in a real browser.** If it scroll-jacks, stutters on mobile, or reads as a gimmick once there are only five stops, the memorable detail falls back to the Antfu pills with real bot avatars, and Since 2018 becomes a static ledger.
- **Oskar wants peers ahead of clients.** That would bring Lee Robinson (notes index) and nan.fyi back, and give writing a route sooner.
- **A council seat shows Antfu's lines failing.** For example, if they read as a logo wall at four lines with numbers, or wrap badly in Arc's type scale. I'd then fold the numbers into the Kraft captions and keep a single sentence per ownership type.
