# Council round 2 ruling: Muse Wonder Full

Seat: muse-wonder-full-1.0. I read ROUND2.md, all three round-1 rulings, arc-eval-components.md, arc-eval-blocks.md and BRIEF.md in full. I took no new captures; no vote below needs one.

Three of my round-1 positions change. Each change names the seat or evidence that persuaded me.

## 1. Settled in round 1

**Accept all six bullets. No objection.**

One-line recommendation on the third case study: **SoundCloud, not Groovy.**

This changes my round-1 pick (/work/groovy, SoundCloud as media block only). Opus persuaded me: SoundCloud is the clearest client story (brand relationship since 2021, launch, OAuth 2.1 migration, production in the client's AWS organization) and it has a real asset already in the bento. Sol's own observation finishes the argument against my old pick: the Groovy image is a shutdown notice, not a working interface, so a Groovy case study would be short of product evidence. Groovy's founding story is already carried in full by the headline, the homepage Since 2018 index and /story. The three case studies are therefore /work/hydra, /work/hey-netflix and /work/soundcloud. Netflix still needs an approved image (Opus); that is Oskar's content check, not a reason to swap the slot back.

## 2. Proposed final set

**Accept the five. Vote for portfolio.chsmc.org in slot 6.**

The five (paco.me, jakub.kr, antfu.me, samuelkraft.com, benji.org) were all in my round-1 seven, so acceptance costs nothing. Emil, Lee Robinson and Brittany dropping out is correct on the lead's redundancy grounds.

Slot 6 changes my round-1 position: I kept nan.fyi and cut chsmc.org. I now vote chsmc.org. Two arguments persuaded me:

- Opus verified chsmc in captures and HTML and extracted a grammar the next pass can build immediately: company heading, date pill, one first-person ownership paragraph, media with a side caption naming one decision, and sub-project blocks for large engagements. That maps directly onto Hydra (web app, Kotlin backend, Rust rebuild) and SoundCloud (OAuth move, Terraform setup). My round-1 evidence for nan.fyi was HTML titles only; its interactive behaviour was not verified by any seat.
- Sol cut nan.fyi for the right reason: it is a good future writing reference, but this pass needs actual project cases, not a publication structure. The Arc evaluations confirm the cost: nan-style explanation depends on conditional pieces (line-replay, line-chart, image-compare, lightbox-gallery), each gated on real data or same-crop assets that may not exist. Building the case-study baseline on nan.fyi risks stalling on bespoke interactives. Chsmc's grammar ships with one screenshot and honest prose.

My round-1 objections to chsmc (device frames, heavy page) are answered inside Opus's own terms: take the grammar only, replace phone frames with Discord or browser frames, and refuse the stacked-paper card, serif, chip marquee and green pill. Nan.fyi should be named as the later reference if Oskar writes the Rust rebuild note. It does not hold a baseline slot in this pass.

## 3. Story placement

**Accept: a /story route with the five chapters, plus a slim Since 2018 index on the homepage linking to it.**

This was my round-1 position and I hold it. The blocks evaluation's new evidence (scroll-story scrolls inside its own 480 to 600px viewport and traps skimmers) strengthens it and answers Opus's homepage chapter: putting Story mid-homepage either imports that trap into the hiring path or requires rebuilding it as page-scroll content to save one route. Neither is worth it.

Opus's real concern was that the memorable detail must sit where the traffic is. Item 4 below resolves that without moving the chapters: the homepage index carries the detail, the chapters carry the depth. Clients get current work, Now and contact before chronology; peers get a shareable URL for the founding arc. The homepage keeps the Story headline and five one-line year entries, nothing more.

## 4. The memorable detail

**Rank: A first, B second, C third. Decide now; do not prototype the top two as a runoff.**

This reverses my round-1 ruling (B on the homepage, the ruler on /story). Three things persuaded me:

- Opus: the Default/Long toggle is Lee Robinson's borrowed signature, and it solves a problem the agreed outline no longer has. The long version now exists as routes (/story, the three case studies, /cv). Keeping Lee's signature as the one detail after item 2 drops Lee from the set would be incoherent.
- Sol, independently: a short homepage plus /story already separates reading depths, so a second biography mechanism adds little. Two seats reached the redundancy objection without seeing each other's ruling.
- The components evaluation ranks ruler-slider first for the detail and, decisively, separates it from the scroll-story trap in item 3. A visitor-driven year tape under a fixed needle is not a nested scroll viewport. It is Arc-native, keyboard-operable as a real slider, and it is the only candidate no other engineer could ship unchanged, because the ticks are Oskar's years and the stops carry his decisions.

How A and item 3 fit together: the homepage Since 2018 index **is** the ruler. One compact tape (2018 to 2026), one caption line per stop with its own correctly dated figure (the item 1 factual fix applies here: "16M+ by 2021", never at 2018), and each caption links to its /story chapter anchor. /story then needs no second ruler and no scroll-story viewport; its chapters run as plain page-scroll dated entries. One detail per page is preserved, and there are not two competing rulers to build and keep in sync.

B stays second, but only as a fallback. It is cheap, accessible and already installed via tabs. If the ruler fails in a real browser, B is the replacement detail. It should not be built alongside A in this pass, because a homepage with both has two details.

C is third. The lead's rescue (a cross-document view transition from the Hydra card to /work/hydra) is worth having as ordinary navigation polish if it is cheap, with a plain navigation or fade under reduced motion. It is not a memorable detail: any portfolio with cards could ship it, it singles out one card asymmetrically, and both evaluators demote card-to-article to maybe on its own doc's warning that long articles needing a URL should be real pages. Continuity in service of reading is good chrome. It does not answer "what is distinctively Oskar's".

On prototyping: no A-versus-B comparison. The lead is right that an experiment settles feel, not distinctiveness, and distinctiveness is what separates A from B. A runway of two would likely crown B, the familiar pattern, for the wrong reason. Prototype A only, against kill criteria taken from Opus's own fallback condition and the components evaluation: it must not scroll-jack or stutter, taps and arrows must step it on a phone, the caption must update on commit or through a restrained live region so it does not flood, empty years must resolve to the latest earlier chapter, and reduced motion must remove coasting while degrading to the plain five-line dated index. If A fails those checks, fall back to B without reopening the ranking.

## 5. Arc shortlist

**Agree with the use list, with one condition. Decisions on the maybes below. Agree with the drop list, and I would drop one maybe outright.**

Use picks: agree on text-reveal (hero headline only), card (one wide media card per flagship; make the action link or wrapped media unmistakably the click target, since the card's hover lift otherwise implies the whole card clicks), copy-button (contact close), badge (Now dates and the Webby marker only, two or three per page), theme-switch with variant rise (one quiet footer toggle), cta-section (centered, homepage close, never the default note text) and site-footer (minimal variant, newsletter and status off).

Condition on toc-progress: agree it is the right case-study aside where a study has four or more real headings (below that, a plain anchor list, per its own doc). But it is Pro, and ROUND2 item 6 records that the branch already holds Pro source without the Arc notice in a public repo. The union list loses that gate. No new Pro item, toc-progress included, should be installed until Oskar picks the licence path (private package with notice, private repo, or free-only). The free-only fallback for toc-progress is a composed anchor list, so case studies are not blocked either way. The same gate applies to every Pro maybe below.

Maybe decisions:

- **ruler-slider: promote to use.** Its condition ("only if 4A wins") is met by my item 4 vote. Homepage Since 2018 index only, built to the kill criteria above.
- **tabs or expandable-text: do not build in this pass.** Their condition (4B wins) is not met. Keep tabs named as the fallback implementation if A fails; pick one, not both.
- **hover-card: object; skip this pass.** It is the only pick needing a new dependency (@radix-ui/react-popover), its tap behaviour on link triggers is unverified (a tap may toggle the card instead of navigating to the case study), the card must stay read-only with no link inside, and it previews screenshots the homepage already shows at full size in the Samuel Kraft cards directly below. Revisit only for media-less rows, and only after a touch test shows taps still navigate.
- **avatar: skip.** The components evaluation itself calls the gain small, and beside a visible name its role="img" label reads the name twice. A plain decorative img next to the name does the job. Not worth a shortlist slot.
- **site-header (case-study pages only): accept as maybe.** Simple variant on /work/*, /story and /cv to give a way back. The homepage stays a header-less column.
- **scroll-story: object, even on /story.** Move the content (headline, five chapters) but not the block. The nested viewport traps readers wherever it sits, its doc frames it as a product walkthrough, item 4 gives /story no detail slot to fill, and dropping the block and its derived CareerStory pattern also removes the largest piece of the item 6 Pro exposure. /story chapters should be plain page-scroll dated entries with anchors.
- **line-replay and line-chart: accept as conditional maybes, at most one per case study.** Only with real server-count history, shown in full before anyone presses play, never interpolated or smoothed from endpoints. If only two or three data points exist, write a sentence instead. Both evaluators state this condition; it should be treated as a hard gate, not a preference.
- **image-compare, code-block, lightbox-gallery: accept as conditional maybes for case studies only**, on the evaluators' own conditions: same crop and size for image-compare pairs, a check that code-block's regex highlighter handles Rust acceptably before relying on it, and five or more real screenshots before lightbox-gallery earns its place over plain figures.
- **time-dial: object; skip this pass.** The contact close sits on the homepage, where A already spends the one-detail budget. Time-dial is also the generic option (any remote freelancer could ship it, per the components evaluation's own ranking note) and it carries real extra cost in DST-correct offset and city mapping code. Benji's one plain line of footer text ("<time> in Kufstein, Austria", degrading to a static CET line without JavaScript) does the honest version of this job.
- **testimonial-stage: accept as conditional maybe, later only.** Only with real, permissioned quotes and real portraits. Do not solicit quotes to fill the block in this pass; if none exist today, it simply does not appear.

Drop list: agree on stats-band, in-view-title in heroes (text-reveal owns the hero; in-view-title at most once, on the closing contact heading below the fold) and accordion for experience (visible dated rows). On card-to-article I go one step further than "at most a maybe": **drop it outright.** Item 4C's cross-document view transition to real /work/* routes gives the continuity people liked in the bento without the modal article its own doc warns against, so the maybe no longer has a job.

Anything both evaluators missed that the agreed outline needs: no missing Arc component. One non-Arc piece is easy to overlook precisely because it is not in either catalog evaluation: the cross-document view transition in 4C and the button-styled anchors for Email me and Read my CV (Arc's button is a native button with no href, as the components evaluation notes). Both are plain CSS and semantic HTML work with their own reduced-motion handling. The build pass should list them as hand-built items next to the shortlist, or they will be assumed to come from Arc and quietly dropped.

Score: 8 out of 10 for the baseline as it stands with my votes applied.

Satisfied: yes.
