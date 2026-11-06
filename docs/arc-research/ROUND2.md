# Council round 2: proposed convergence

Round 1 rulings: `council-r1-opus.md`, `council-r1-sol.md` and `council-r1-muse.md`. Arc evaluations: `arc-eval-components.md` (241 components: 7 use, 17 maybe, 217 skip) and `arc-eval-blocks.md` (140 blocks: 2 use, 9 maybe, 129 skip). All files are in this folder.

The lead proposes the converged position below. Accept each item, or object with a reason that changes the outcome. "I'd phrase it differently" is not an objection. Scope stays fixed: an inspiration set, a page outline and an Arc shortlist. No new features.

## 1. Settled in round 1 (no vote unless you object)

- **Stats band removed.** Each number lives once, attached to its project with its time frame. Unanimous.
- **Brittany Chiang cut.** Her dated-row grammar comes through Jakub and Benji instead. Two of three cut her, and Sol kept her only for that same row grammar.
- **Factual fix.** The Story year view must not show "16M+" at 2018. Each figure carries its own period, such as "16M+ by 2021". Unanimous.
- **Removed:** the weather card, the variant dock, the skills chip wall, experience accordions and the "details" tabs. Unanimous.
- **Hydra and Hey Netflix get case studies at /work/<slug>.** Unanimous. The third is Oskar's content call between SoundCloud (Opus: clearest client story, real assets) and Groovy (Sol, Muse: the founding story). Give your one-line recommendation.
- **No /writing, /now, /uses, guestbook, newsletter or booking flow in this pass.** Unanimous.

## 2. Proposed final set (vote)

Unanimous: paco.me, jakub.kr, antfu.me, samuelkraft.com. Two votes: benji.org (Opus, Muse).

Proposal: those five plus **one case-study reference**, chosen from portfolio.chsmc.org (Opus) and nan.fyi (Muse). Emil, Lee Robinson and Brittany drop out. Their single contributions are covered (Emil by Jakub and Paco, Lee only if the bio toggle wins in item 4, Brittany as above).

Vote: chsmc or nan.fyi for slot 6, and accept or object to the five.

## 3. Story placement (vote)

Two to one in round 1 for: **a /story route** carrying the five chapters and the year ruler, plus **a slim "Since 2018" index on the homepage** (five one-line year entries linking to /story). Opus wanted it as a homepage chapter with no /story route.

New evidence: the blocks evaluation found that the installed scroll-story uses a nested 480 to 600px scroll viewport, which "traps skimmers" on a homepage. Accept the /story route, or object.

## 4. The memorable detail (the real split)

- **A. The year ruler on the homepage** (Opus). The components evaluation independently ranks `ruler-slider` as its first choice for the detail.
- **B. A short/long bio toggle on the homepage** (Muse), via `tabs` or `expandable-text`. The year ruler would be /story's detail.
- **C. The Hydra media card opening into its case study** (Sol), with title and image continuity. New evidence against it: the `card-to-article` doc says long articles that need their own URL should be real pages, and both evaluators demote it to "maybe". A cross-document view transition from the card to /work/hydra would keep the continuity without card-to-article.

Rank A, B and C, and say whether the next build pass should prototype your top two and compare them in a browser instead of deciding now. An experiment can settle how it feels. It can't settle what's distinctively Oskar's.

## 5. Arc shortlist (review)

Union of both evaluations' use picks:

- Components: `text-reveal` (hero headline), `card` (wide media card per flagship), `copy-button` (contact close), `badge` (Now dates and the Webby marker only), `theme-switch` with variant `rise` (one footer toggle), `toc-progress` (Pro, case-study pages).
- Blocks: `cta-section` (homepage close), `site-footer` (every route, minimal variant).

Maybes worth a decision: `ruler-slider` (only if 4A wins), `tabs` or `expandable-text` (only if 4B wins), `hover-card` (previews on project names; new `@radix-ui/react-popover` dependency, and tap behaviour on touch is unverified), `avatar`, `site-header` (case-study pages only), `scroll-story` (Pro, /story only), `line-replay` (Pro) and `line-chart` (case studies, only with real server-count history), `image-compare`, `code-block`, `lightbox-gallery` (Pro) (case studies, only with real assets), `time-dial` (Pro, contact close), `testimonial-stage` (Pro, only with real quotes).

Drop from the lab: `stats-band`, `card-to-article` (Pro; at most a maybe), `in-view-title` in heroes (its docs reserve it for headings below the fold), `accordion` for experience.

For each item: agree, or disagree with a reason. Flag anything both evaluators missed that the agreed page outline needs.

## 6. Licence fact for the record

The branch holds Pro source (card-to-article, scroll-story, a byte-identical copy of the scroll-story stylesheet, and CareerStory.tsx derived from it) without the Arc notice. The branch is local and unpushed. No vote is needed. It goes to Oskar.
