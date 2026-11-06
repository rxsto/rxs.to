# Council round 2: Opus ruling

Seat: claude-opus-5-5. Read in full: ROUND2.md, all three round-1 rulings, and the detail sections of both Arc evaluations. Re-read BRIEF.md.

New evidence I checked this round (no browser):

- **Observed, capture:** `shots/grok/nan/desktop-light-scroll25.png` (nan.fyi is a dated index of interactive blog posts with no case studies on it) and `shots/grok/chsmc/desktop-light-scroll50.png` (employer heading, date pill, one ownership paragraph, then two-up sub-projects with title, sentence and media).
- **Observed, docs:** `arc-docs/block-scroll-story.md` ("Takes no props", sample data is inline, and "The story scrolls inside its own viewport of clamp(480px, 74vh, 600px), not the page"). `arc-docs/component-ruler-slider.md` (it has a controlled `value`, `onValueCommit`, and "vertical scrolling is left to the page"). `arc-docs/component-toc-progress.md` ("Skip it for pages with fewer than four headings").
- **Observed, code:** `node_modules/vinext/dist/check.js:1228` flags React's `ViewTransition` as a canary API that vinext "auto-shims with a passthrough fallback, view transitions won't animate". The repo uses `document.startViewTransition` only for the theme toggle (`components/default/ThemeToggle.tsx:47`).

## 1. Settled items

Accept all six.

**Third case study: SoundCloud.** Now that /story wins (item 3), Groovy's founding story is told in full on /story, so /work/groovy would tell it a second time. Its only product asset is the shutdown notice, which Sol's own round-1 ruling observed "is visibly a shutdown notice, not a working bot interface". SoundCloud is the one current client relationship, with a launch, the OAuth 2.1 move and production in the client's AWS organization. It's still Oskar's content call.

## 2. Final set

**Accept the five.** paco.me, jakub.kr, antfu.me, samuelkraft.com and benji.org each supply something the others don't. Benji's ledger now has a concrete home: the slim "Since 2018" index from item 3 is exactly a Benji year-gutter list. His "Updated <month year>" stamp dates the Now block, and his local-time sentence becomes the footer line. Sol cut Benji for duplicating /cv. That doesn't hold once the index is five lines on the homepage rather than a full log.

**Slot 6: portfolio.chsmc.org.** I keep my round-1 vote, and the evidence moved further my way:

- The nan.fyi capture shows a publication index. Its case-study value ("one question per page, visuals carry the explanation") lives inside articles that no seat captured. Muse's take is a copy rule, and Muse's own cut of Vlad Moroz already folds that copy rule into the case studies.
- The Chase McCoy capture shows the actual page grammar the three /work routes need: employer, date pill, a first-person ownership paragraph, and sub-projects with a decision caption.
- Both cuts of Chase were about the device frames and the page weight. We borrow grammar, not frames or code. Add to its must-not-take: the gradient grounds behind the media (Arc bans decorative gradients) and the wavy divider. Case-study media is a plain `<figure>` on `--surface` with the caption beside or below it.

## 3. Story placement

**Accept the /story route. I'm changing my round-1 position.** Muse persuaded me, and the new evidence added to that:

- My round-1 version (a ledger as the homepage base, with the ruler card as a desktop enhancement) is close to what the proposal already puts on the homepage: the slim Since 2018 index. What I actually lose is the five full chapters, and Muse is right that they lengthen the hiring path and give peers nothing to share.
- My argument that "a client would never click /story" now cuts the other way. The client doesn't need to click, because the index carries the dated facts.

**One condition that changes the build:** /story uses page scroll, not scroll-story's nested viewport. The skimmer trap that the blocks evaluation found doesn't depend on which page the viewport sits on. A 480 to 600px inner scroller on a page whose whole purpose is that story still gives you two scroll contexts, and on phones the pinned card still covers half the screen. scroll-story also takes no props and ships sample data, so using it means forking Pro source anyway, which is what CareerStory already is. Build /story as ordinary document flow:

- the chapters as sections with anchors;
- a `position: sticky` year marker driven by page scroll;
- below 700px, no sticky card. Each chapter carries its own year and figure inline.

## 4. The memorable detail

**Ranking: A, then C, then B.**

**A, the year ruler on the homepage, on `ruler-slider`.** The new evidence removes my main worry about A. The objection to Story on the homepage was the nested scroll viewport. `ruler-slider` has none: the doc says vertical scrolling stays with the page, and the visitor moves the tape directly. A runs on the free tier, needs no new package, and has a controlled `value`.

- **The form:** the five Since 2018 rows stay visible as plain text, and the ruler sits above them as their header. Dragging or using the arrow keys moves the needle through 2018 to 2026, the readout rolls the year, and the matching row is highlighted. Gap years (2019, 2023 to 2025) land on the latest earlier row.
- **What it adds over the list:** proportional time. Eight years of spacing become visible, and "since I was 16" becomes something you can scrub. No fact hides behind the interaction. Without JavaScript or under reduced motion, you get the list.
- **One motif across two pages:** the same `ruler-slider` can run controlled by page scroll as /story's sticky marker, and dragging it jumps to that chapter. That gives one detail per page, the same visual language on both pages, and an Arc-native replacement for the hand-built ruler in CareerStory. It also clears that file of Pro-derived ruler code.
- It is still the only candidate that no other engineer could ship unchanged.

**C, the Hydra card opening its case study, second.** It's good craft and it serves clients, but any portfolio could ship it, so it doesn't settle "what's distinctively Oskar's". The new fact cuts against its cost too. vinext shims React's `ViewTransition` to a passthrough (observed, `check.js`). So continuity needs either a plain full-document `<a>` with CSS `@view-transition { navigation: auto; }`, or a hand-wrapped `document.startViewTransition` around client navigation. Cross-document support is Chromium and Safari only, which I'm recalling, not verifying. Either way, a plain link to /work/hydra ships regardless. A quiet crossfade on that link is acceptable chrome as long as nobody calls it the detail.

**B, the bio toggle, last.** With /story accepted, the long bio is /story. A toggle on the homepage gives you a second, shorter copy of the same narrative a link away. Sol rejected it for the same reason, so it has two votes against it. It's also Lee Robinson's signature, not Oskar's.

**Prototype?** Don't run a two-way bake-off. Decide A now on identity grounds, and prototype only A, since it's cheap: one free component and no dependencies. Agree its veto test in advance:

- At 390px, the drag doesn't fight vertical page scroll.
- Keyboard and screen readers get one announcement per commit, using `onValueCommit` and a polite live region.
- In a 30-second skim, it doesn't read as a toy above five lines.

If A fails, fall back to C, not B. That way the experiment only settles feel, which is the part an experiment can settle.

## 5. Arc shortlist

Use picks:

- `text-reveal`: agree. Hero H1 only.
- `card`: agree, as a link to /work/<slug>. Don't use its quick-look dialog, because a real route exists.
- `copy-button`: agree.
- **`badge`: object to "Now dates".** The Now date is Benji's plain muted "Updated <month year>" line. Wrapping a date in a chip is chip-wall grammar. Put the badge on the one "New" marker (Hydra Rust rebuild, in the Since 2018 index), on the Webby marker, and on the case-study date pill (Chase's "2024 – 2026"). That's at most two per page.
- `theme-switch` with `rise`: agree. The build must delete the eclipse and split paths in the current ThemeToggle, not just stop passing them.
- `toc-progress`: agree, conditionally. Its doc says to skip it below four headings. The SoundCloud and Netflix case studies may have only three, so they get a plain anchor list.
- `cta-section` (centered): agree. Use `faces={[]}`, never the default "No credit card required" note, and reuse it as /story's close.
- `site-footer` (minimal): agree. The Benji local-time sentence goes in `tagline`.

Maybes:

- `ruler-slider`: promote to use (item 4 A), on the homepage index and as /story's marker.
- `tabs` and `expandable-text`: drop with B.
- **`hover-card`: drop rather than keep as a maybe.**
  - It's a new dependency.
  - Its touch behaviour on a link trigger is unverified.
  - Its only job, previews on project names, would put a second interactive moment on the homepage beside the ruler, and the preview would repeat the Kraft cards a scroll below.
- **`avatar`: promote to use.** The outline needs it twice and both evaluators missed the second: the portrait in the identity line, and the 16px bot avatars inside the Antfu proof pills (Groovy, Hydra, SoundCloud, Hey Netflix). The initials fallback covers a missing bot image.
- `site-header` (simple): agree. Case studies, /story and /cv.
- **`scroll-story`: drop**, per item 3. It's a Pro fork with no props and a nested viewport. /story is document flow plus `ruler-slider`.
- `line-replay`, `line-chart`, `image-compare`, `code-block`, `lightbox-gallery`, `testimonial-stage`: agree as data-gated maybes. Default to none until the real data or assets exist.
- `time-dial`: drop. The footer's local-time sentence already answers "what time is it there", and a draggable dial in the contact close would be a second detail on the homepage.

Drops: agree with all four (`stats-band`, `card-to-article`, `in-view-title` in heroes, `accordion` for experience).

Missed by both evaluators, and needed by the agreed outline:

- The proof-line pill (avatar plus name, as an inline link) has no Arc component. It's plain semantic HTML plus `avatar`. Say so in the build brief, so nobody misuses `badge` or `chip-group` for it.
- Case-study media has no Arc frame component either. Use `<figure>`/`<figcaption>` on `--surface`.

## 6. Licence

Noted for Oskar. Adopting my items 3 and 5 removes the scroll-story fork and the Pro-derived CareerStory ruler from the shipped site, which shrinks what needs a notice or removal before any push.

## Score

**8/10** with my votes applied. What's left is content: Oskar's hire-focus sentence, an approved Netflix asset, and real decision-level material for three case studies. No baseline decision can supply those.

## Satisfied

**Yes.** If item 4 goes to B instead, the smallest change that keeps me at yes is to make the homepage detail C and leave the ruler on /story. B on a homepage that sits a link away from /story is the one outcome I'd still object to.
