# Arc components for rxs.to: evaluation of all 241

Evaluator: Claude Opus 5.5, research sub-agent, inspect only. Sources: `arc-catalog.tsv`, `arc-docs/component-*.md` (public docs; Pro docs contain no source), the lab code in `/home/dev/worktrees/rxs.to/spike-arc` (`components/lab/`, `components/arc/`, `app/lab/`, `package.json`), `BRIEF.md` and `MERGE.md`. I used no browser. Every claim about a component comes from its doc (observed). Every claim about the lab comes from reading the code (observed). Anything about Oskar's data that I have not seen, such as whether a live Hydra server count or a growth series exists, is marked as a condition.

**Result: 7 use, 17 maybe, 217 skip.** Most of Arc is product, dashboard and AI-app UI. A personal editorial site needs very little of it. The site's interactivity should come from a handful of precise pieces, plus one memorable detail chosen from section 3.

Method: I triaged all 241 from the catalog descriptions. I then read the full docs of all 24 use and maybe items, and the when-to-use and when-not-to-use sections of 30 borderline skips (theme-switch variants, icon-morph, action-swap, button-group, expanding and floating button groups, tooltip, popover, dialog, breadcrumb, toggle-group, timeline, activity-heatmap, sparkline, carousel, metric-ticker, now-playing, branch-graph, ai-command, tldr-toggle, json-viewer, dock, morph-nav, multi-region-failover, data-flow, holo-card, cover-flow, image-trail, keycap-keyboard, sticker-peel, live-visitors, dot-grid, sand-text, ink-fluid, gravity-well, glass-card, page-curl, race-bar-chart, slope-chart, avatar-group, toast).

How this maps to the agreed MERGE points:

| MERGE point | Arc components |
| --- | --- |
| Editorial column, one large headline | text-reveal (use); avatar (maybe) |
| Project rows: name plus one sentence of outcome | Plain semantic HTML; badge (use) for one marker at most; hover-card (maybe) for previews |
| One wide media card per flagship project | card (use) |
| One memorable detail | Section 3: ruler-slider, hover-card, time-dial, agent-timeline, animated-counter, typewriter-terminal (all maybe) |
| Dated Now block | Plain list plus badge (use); no Arc component carries this better |
| Case-study pages | toc-progress (use); code-block, image-compare, line-chart, lightbox-gallery, typewriter-terminal, agent-timeline (maybe) |
| Closing contact block | copy-button (use); in-view-title (maybe) for its heading; time-dial (maybe) |
| No skills chip wall | Skip chip-group, radar-chart, tag-input; badge stays at two or three per page |
| Short or long bio (disputed) | tabs or expandable-text (maybe) |

Note on the docs: several Arc docs point to components that are not in this catalog of 381: `scroll-highlight`, `word-rotate`, `stat-card`, `hover-image-list`, `depth-cards`, `git-branches`, `scroll-progress-ring`, `log-stream`, and `command-palette` as a component (it exists only as a block). Don't plan around any of them. `hover-image-list` would have been the obvious fit for Dennis-style row previews, and hover-card is the closest thing in the catalog.

## 1. Verdict table

Grouped by catalog category. Use and maybe verdicts are in bold.

### Actions

| id | tier | verdict | where on rxs.to | reason |
| --- | --- | --- | --- | --- |
| action-button | free | skip | n/a | Toolbar button with pending and success states; the site has no toolbar or async saves. |
| action-swap | free | skip | n/a | Cycles a control through states like Follow and Following; nothing on a portfolio cycles state. |
| button | free | **maybe** | Real buttons only, such as a bio toggle or case-study controls | Native button with no href, so Email me and Read my CV stay anchors styled to match. |
| button-group | free | skip | n/a | Joined action segments; the contact row has one primary action, which the doc says to keep separate. |
| confirm-morph | free | skip | n/a | Destructive confirmation; there is nothing to delete. |
| context-menu | free | skip | n/a | Right-click actions on selected objects; there are none. |
| copy-button | free | **use** | Closing contact block, beside the email address | Installed; confirms Copied in place, announces it, never shifts the row. |
| dropdown-menu | free | skip | n/a | Command list on a trigger; a handful of destinations needs no menus. |
| expanding-button-group | free | skip | n/a | Icon action bar for one object; footer links are navigation and their labels should stay visible. |
| floating-button-group | free | skip | n/a | Canvas toolbar; it would bring back the lab dock that MERGE wants gone. |
| hold-to-confirm | free | skip | n/a | Destructive confirmation by holding. |
| icon-morph | free | skip | n/a | Two-state icon toggles; copy-button and theme-switch already swap their own icons. |
| reactions | free | skip | n/a | Likes with rolling counts; no posts and no backend. |
| split-button | free | skip | n/a | One action with close variants; none exist. |
| swipe-actions | free | skip | n/a | Row actions behind a swipe; project rows are links. |
| theme-switch | free | **use** | Footer, one quiet light and dark toggle | Installed; reports the change so a view transition can run from the button. |
| theme-switch-eclipse | free | skip | n/a | Dramatic sweep that competes for the one memorable detail. |
| theme-switch-rise | free | **use** | Same control as theme-switch with variant="rise" | The calm variant the docs recommend for everyday chrome. |
| theme-switch-split | free | skip | n/a | Center-seam variant meant for centered buttons, and louder than rise. |
| user-menu | free | skip | n/a | Account menu; there are no accounts. |

### Data

| id | tier | verdict | where on rxs.to | reason |
| --- | --- | --- | --- | --- |
| activity-heatmap | free | skip | n/a | Contribution grid; his contract work sits in private repos, so it would undersell him, and it is the most generic portfolio widget. |
| animated-counter | free | **maybe** | Hydra row or case study, only with a live server count | Rolling digits explain change only when the number really changes. |
| avatar | free | **maybe** | Portrait beside the name in the intro | Blur-in and an initials fallback; a small step up from the plain img. |
| avatar-group | free | skip | n/a | Several people; the site is about one person. |
| badge | free | **use** | Now block dates and the Webby Honoree marker | Installed; two or three per page, never a chip wall. |
| bar-chart | free | skip | n/a | Per-day comparison; there is no daily series to show. |
| brush-chart | free | skip | n/a | Dense time series zoom for dashboards. |
| card | free | **use** | One wide media card per flagship project | Installed; media, title, one-line outcome and a link to the case study. |
| card-stack | free | skip | n/a | Swipe-to-decide deck; the wrong gesture for reading work. |
| carousel | free | skip | n/a | Hides slides behind a drag; MERGE wants one wide card per project, all visible. |
| chat-thread | free | skip | n/a | Messaging interface. |
| code-block | free | **maybe** | Case study pages, one real snippet such as the Hydra Rust rebuild | Copy and collapse built in; its regex highlighter may handle Rust thinly. |
| comment-thread | free | skip | n/a | Threaded comments; no backend. |
| data-grid | pro | skip | n/a | Spreadsheet editing. |
| donut-chart | free | skip | n/a | Share of a whole; no such data. |
| empty-state | free | skip | n/a | Nothing on the site should be empty; MERGE rules out empty routes. |
| filter-toolbar | free | skip | n/a | Collection filters; too few items to filter. |
| funnel-chart | pro | skip | n/a | Conversion funnels. |
| gauge | free | skip | n/a | A value against a range; nothing fits. |
| image-compare | free | **maybe** | Case study, with real same-crop screenshots of two states | Dragging the divider shows what changed, which is the point of a before and after. |
| json-viewer | free | skip | n/a | Payload inspector; tempting for the JSON Resume behind /cv, but clients never need it. |
| line-chart | free | **maybe** | Groovy case study, servers from 2018 to the 2021 shutdown | Only with real numbers; the drop at the YouTube shutdown is the cause and effect. |
| metric-card | free | skip | n/a | Dashboard number tile; MERGE wants numbers inside sentences or rows. |
| metric-ticker | pro | skip | n/a | Live KPI marquee; the doc warns against values that change once a day. |
| pagination | free | skip | n/a | No long collections. |
| presence-stack | pro | skip | n/a | Live presence avatars. |
| race-bar-chart | pro | skip | n/a | Animated ranking; autoplay competes with reading and there is no ranking data. |
| radar-chart | pro | skip | n/a | A skills radar would be the chip wall in another shape. |
| realtime-stream | pro | skip | n/a | 60fps live stream; no live feed. |
| reorderable-list | free | skip | n/a | Drag to reorder. |
| ridgeline | free | skip | n/a | Statistical distributions. |
| sankey-flow | pro | skip | n/a | Flow volumes between stages. |
| slope-chart | free | skip | n/a | Two-period rank change; no such data. |
| sortable-data-table | free | skip | n/a | Record comparison. |
| sparkline | free | skip | n/a | Per-row charts would turn text rows into a dashboard and need history he may not have. |
| split-bar | pro | skip | n/a | Shares of 100 percent. |
| streamgraph | free | skip | n/a | Layered volume streams. |
| sunburst | pro | skip | n/a | Hierarchy rings. |
| timeline | free | skip | n/a | Day-grouped feed with relative times; the Now block and experience run on months and years. |
| treemap | free | skip | n/a | Hierarchical sizes. |
| tree-table | free | skip | n/a | Nested tables. |
| tree-view | free | skip | n/a | Folder navigation. |
| waffle-chart | free | skip | n/a | Percent units. |

### Disclosure

| id | tier | verdict | where on rxs.to | reason |
| --- | --- | --- | --- | --- |
| accordion | free | **maybe** | Only for an earlier-work tail if the experience list runs long | Installed; the doc frames it for FAQs, and hiding dated rows works against the visible-rows grammar. |
| bottom-sheet | free | skip | n/a | Mobile sheet for secondary tasks; none. |
| breadcrumb | free | skip | n/a | Case studies sit one level deep; a back link is enough. |
| confirm-popover | pro | skip | n/a | Destructive confirmation. |
| dialog | free | skip | n/a | Interrupting decisions; none. |
| drawer | free | skip | n/a | Side panel for focused work; none. |
| expandable-card | free | skip | n/a | Single plan or order summary; project rows link to real pages instead. |
| expandable-text | free | **maybe** | Long bio under the hero, clamped to three lines | Plainest form of the short and long bio; the clamp opening shows the cause. |
| hover-card | free | **maybe** | Previews on project names in the hero sentence or project rows | Strong memorable-detail candidate; check what a tap does on touch. |
| mega-menu-morph | pro | skip | n/a | Site header with section menus; a handful of destinations. |
| popover | free | skip | n/a | Interactive anchored panel; nothing needs one. |
| resizable-panels | free | skip | n/a | Pane splitting. |
| scroll-area | free | skip | n/a | Fixed-height scroll box; the editorial column scrolls with the page. |
| share-access | pro | skip | n/a | Sharing permissions. |
| tabs | free | **maybe** | Short and long bio toggle (Lee Robinson pattern) | Installed; the docs choose tabs when options swap content, and the height spring shows the swap. |
| toc-progress | pro | **use** | Case study pages, sticky aside on wide screens | Reading line, jumps and time left for write-ups with four or more headings. |
| tooltip | free | skip | n/a | Icon labels that vanish on touch; theme-switch already has an aria-label. Adds @radix-ui/react-tooltip. |

### Feedback

| id | tier | verdict | where on rxs.to | reason |
| --- | --- | --- | --- | --- |
| alert | free | skip | n/a | Persistent recovery message; nothing fails. |
| announcement-bar | free | skip | n/a | Rotating banner with countdowns reads as marketing; MERGE forbids invented availability dates. |
| cookie-consent | free | skip | n/a | Only needed with tracking cookies; better to skip the tracking. |
| countdown | free | skip | n/a | Launch countdown; never invent a date. |
| onboarding-checklist | free | skip | n/a | Workspace setup. |
| progress | free | skip | n/a | Task completion; no tasks. |
| skeleton | free | skip | n/a | Static content needs no loading placeholders. |
| stepper | free | skip | n/a | Multi-step flows. |
| toast | free | skip | n/a | copy-button already confirms in place. |
| toast-stack | free | skip | n/a | App notifications. |
| undo-toast | pro | skip | n/a | Undo for row deletion. |
| usage-meter | free | skip | n/a | Allowance meter. |

### Inputs

| id | tier | verdict | where on rxs.to | reason |
| --- | --- | --- | --- | --- |
| avatar-upload | pro | skip | n/a | Photo upload and crop. |
| billing-toggle | free | skip | n/a | Pricing switch; he does not publish rates. |
| calendar | free | skip | n/a | Date browsing; a booking link does the job if wanted. |
| checkbox | free | skip | n/a | Form control; no forms. |
| chip-group | free | skip | n/a | Facet filters; too few items, and chips invite the skills wall back. |
| color-picker | free | skip | n/a | Color picking. |
| combobox | free | skip | n/a | Searchable select. |
| date-picker | free | skip | n/a | Date entry. |
| date-range-picker | free | skip | n/a | Date range entry. |
| elastic-slider | free | skip | n/a | Rubber-band slider; a toy without a value to set. |
| emoji-picker | pro | skip | n/a | Emoji search. |
| expanding-search | free | skip | n/a | Nothing to search on a handful of pages. |
| file-dropzone | free | skip | n/a | File upload. |
| inline-edit | free | skip | n/a | Rename in place. |
| input | free | skip | n/a | Contact stays mailto plus copy; no form. |
| mention-input | free | skip | n/a | Mentions in a composer. |
| money-input | free | skip | n/a | Currency entry. |
| morph-select | free | skip | n/a | Select field. |
| multi-select | free | skip | n/a | Multiple choice field. |
| number-field | free | skip | n/a | Bounded number entry. |
| password-field | free | skip | n/a | Auth. |
| password-strength | free | skip | n/a | Auth. |
| phone-input | free | skip | n/a | Phone entry. |
| radio-cards | free | skip | n/a | Selectable plan cards; hire-me-for options would be inputs with no form behind them. |
| radio-group | free | skip | n/a | Form choice. |
| range-histogram-slider | free | skip | n/a | Price range filter. |
| rating | free | skip | n/a | Opinion capture. |
| rich-text-editor | free | skip | n/a | Editor. |
| ruler-slider | free | **maybe** | Year tape from 2018 to 2026 that drives the career caption | Off-label but a real slider; scrubbing his years is cause and effect. |
| scrub-input | free | skip | n/a | Figma-style number scrubbing. |
| search-field | free | skip | n/a | Nothing to search. |
| segmented-control | free | skip | n/a | Installed as a stats-band dependency; for the bio toggle the docs point to tabs. |
| select | free | skip | n/a | Form choice. |
| shortcut-recorder | free | skip | n/a | Key binding capture. |
| signature-pad | free | skip | n/a | Ink capture; a replayed signature would be a generic flourish. |
| slider | free | skip | n/a | Value entry. |
| switch | free | skip | n/a | Settings toggle. |
| tag-input | free | skip | n/a | Tag entry. |
| textarea | free | skip | n/a | No form. |
| time-picker | free | skip | n/a | Time entry. |
| toggle-group | free | skip | n/a | Formatting toolbar toggles. |

### Special

| id | tier | verdict | where on rxs.to | reason |
| --- | --- | --- | --- | --- |
| action-morph | pro | skip | n/a | Floating quick-action button for apps. |
| activity-rings | pro | skip | n/a | Daily goal rings. |
| agent-cursor | pro | skip | n/a | AI co-editing demo. |
| agent-handoff | pro | skip | n/a | Support chat handoff. |
| agent-loop | pro | skip | n/a | Generic agent loop explainer, not his work. |
| agent-plan | pro | skip | n/a | Agent plan editor. |
| agent-status | pro | skip | n/a | Live agent pill; it would fake a running agent. |
| agent-timeline | pro | **maybe** | How-I-work section or case study: one real multi-agent run, replayed | Matches his multi-agent workflow claim if fed a real run with real numbers. |
| ai-command | pro | skip | n/a | AI command palette for a handful of destinations; Sol's objection holds, and answers would be simulated. |
| ai-mascot | pro | skip | n/a | AI assistant character. |
| ai-spark | pro | skip | n/a | AI status mark. |
| ai-translate | pro | skip | n/a | AI translation card. |
| ai-workflow | pro | skip | n/a | Automation builder. |
| ask-your-data | pro | skip | n/a | Natural language to chart. |
| black-hole | pro | skip | n/a | Delete transition. |
| booking-pill | pro | skip | n/a | Reservation flow. |
| branch-graph | pro | skip | n/a | Merge strategy picker; a career as a git graph would be a gimmick. |
| card-to-article | pro | **maybe** | A /work index, only if case studies stay in-page | Installed Pro; the doc says long articles that need a URL should be real pages. |
| charge-session | pro | skip | n/a | EV charging card. |
| code-suggestion | pro | skip | n/a | AI diff review. |
| connector-setup | pro | skip | n/a | App connections. |
| context-window | pro | skip | n/a | AI context explainer. |
| control-center | pro | skip | n/a | Quick settings tiles. |
| cover-flow | pro | skip | n/a | Showpiece depth rail; three or four images need no rail. |
| cube-mascot | pro | skip | n/a | AI assistant character. |
| data-flow | pro | skip | n/a | Generic sources-to-destinations illustration. |
| date-reel | pro | skip | n/a | 3D date picker. |
| dictation-button | pro | skip | n/a | Voice input. |
| dns-resolution | pro | skip | n/a | Network explainer. |
| dock | pro | skip | n/a | Tool dock; the lab dock is what MERGE wants removed. |
| dot-grid | pro | skip | n/a | Decorative reactive background. |
| enrich-column | pro | skip | n/a | AI table enrichment. |
| generation-stats | pro | skip | n/a | LLM stream stats. |
| ghost-mascot | pro | skip | n/a | AI assistant character. |
| ghost-text | pro | skip | n/a | AI autocomplete. |
| glass-card | pro | skip | n/a | Glass and tilt effect, decorative. |
| glass-menu | pro | skip | n/a | Glass action menu. |
| glass-segmented | pro | skip | n/a | Glass control. |
| glass-tabbar | pro | skip | n/a | App tab bar. |
| gravity-well | pro | skip | n/a | Decorative cursor field. |
| holo-card | pro | skip | n/a | Foil membership card; tempting for the Webby, but loud and a gimmick. |
| image-generation | pro | skip | n/a | Image studio. |
| image-reveal | pro | skip | n/a | Image generation reveal. |
| image-trail | pro | skip | n/a | Photo trail on pointer move; competes with reading and he has no photo set. |
| ink-fluid | pro | skip | n/a | Decorative fluid background. |
| install-snippet | pro | skip | n/a | SDK quick start. |
| keycap-keyboard | pro | skip | n/a | Generic keyboard easter egg. |
| lightbox-gallery | pro | **maybe** | Case study screenshot sets | Photos fly from their slot into a viewer; only worth it with five or more real screenshots. |
| link-unfurl | pro | skip | n/a | Composer link previews. |
| liquid-tab-bar | pro | skip | n/a | App section switcher. |
| live-visitors | pro | skip | n/a | Vanity realtime analytics. |
| llm-cost-calculator | pro | skip | n/a | Pricing calculator. |
| meeting-summary | pro | skip | n/a | AI meeting notes. |
| mixture-of-experts | pro | skip | n/a | ML explainer. |
| model-card | pro | skip | n/a | Model pricing card. |
| model-training | pro | skip | n/a | ML explainer. |
| morph-loader | pro | skip | n/a | Loading shapes. |
| morph-nav | pro | skip | n/a | Rich menus for many destinations; a plain header is enough. |
| multi-region-failover | pro | skip | n/a | Infrastructure explainer; reconsider for the Hydra case study only if it matches Hydra's real topology. |
| now-playing | pro | skip | n/a | Music-bot homage would be a fake player with no real audio. |
| orbit-logos | pro | skip | n/a | A client logo wall on orbits. |
| orbit-menu | pro | skip | n/a | Hold-to-open action menu. |
| page-curl | pro | skip | n/a | Magazine page turns; a CV gimmick. |
| payment-flow | pro | skip | n/a | Payments explainer. |
| photo-grid | pro | skip | n/a | Photo library. |
| pii-redaction | pro | skip | n/a | AI guardrail demo. |
| pixel-mascot | pro | skip | n/a | AI assistant character. |
| prize-wheel | pro | skip | n/a | Promo wheel. |
| product-gallery | pro | skip | n/a | Shop gallery. |
| prompt-cache | pro | skip | n/a | AI explainer. |
| provider-keys | pro | skip | n/a | API key settings. |
| provider-status | pro | skip | n/a | Provider status page. |
| reasoning-block | pro | skip | n/a | AI reasoning display. |
| reasoning-tree | pro | skip | n/a | AI explainer. |
| referral-card | pro | skip | n/a | Referral program. |
| reply-draft | pro | skip | n/a | AI email drafting. |
| response-feedback | pro | skip | n/a | AI reply feedback. |
| sand-text | pro | skip | n/a | Headline gimmick; the doc warns against headings people must read. |
| share-sheet | pro | skip | n/a | Share panel. |
| sheet-stack | pro | skip | n/a | Nested sheets. |
| skeleton-morph | pro | skip | n/a | Loading placeholders. |
| slot-text | free | skip | n/a | Slot reels for changing values; nothing on the site changes. |
| smart-form-fill | pro | skip | n/a | AI form fill. |
| social-proof-toast | pro | skip | n/a | Fake-feeling social proof toasts. |
| source-cards | pro | skip | n/a | AI citations. |
| speculative-decoding | pro | skip | n/a | ML explainer. |
| speech-player | pro | skip | n/a | Read-aloud player. |
| starter-prompts | pro | skip | n/a | AI empty state. |
| sticker-peel | pro | skip | n/a | Playful sticker surface; decorative and competes for the one detail. |
| stretch-refresh | pro | skip | n/a | Pull to refresh. |
| team-switcher | pro | skip | n/a | Workspace switcher. |
| ticket-router | pro | skip | n/a | Support routing demo. |
| time-dial | pro | **maybe** | Contact block: when Kufstein working hours overlap with the visitor's city | Useful to remote clients and grows out of the existing local-time line. |
| tldr-toggle | pro | skip | n/a | AI summary simulation; the tabs bio toggle is the honest version. |
| tone-tuner | pro | skip | n/a | AI tone rewrite. |
| tool-call | pro | skip | n/a | Agent transcript row. |
| training-run | pro | skip | n/a | Fine-tuning card. |
| trial-banner | pro | skip | n/a | SaaS trial banner. |
| typewriter-terminal | pro | **maybe** | Hydra case study: a scripted session of the Rust rebuild | Must be labelled a simulation; a common dev-tool trope. |
| upgrade-prompt | pro | skip | n/a | SaaS upsell. |
| vector-search | pro | skip | n/a | AI search explainer. |
| voice-orb | pro | skip | n/a | Voice mode. |
| voice-recorder | pro | skip | n/a | Voice notes. |
| wallet-stack | pro | skip | n/a | Payment cards. |

### Text

| id | tier | verdict | where on rxs.to | reason |
| --- | --- | --- | --- | --- |
| in-view-title | free | **maybe** | Closing contact heading only | Installed; animated headings in every section would compete with the one detail. |
| text-morph | free | skip | n/a | Short state labels; nothing changes state. |
| text-reveal | free | **use** | Hero headline on load | Installed; CSS-only entrance, readable before scripts load. |
| text-shimmer | free | skip | n/a | Signals ongoing work; nothing is loading. |

## 2. Use and maybe detail

Each entry covers: the job, the props, the motion and whether it explains cause and effect, accessibility and reduced motion, the doc's own when-not-to-use warning as it applies here, and what it replaces in the lab.

### Use

#### text-reveal (free, installed)
- **Job:** the homepage `h1`. It carries Story's line, "I build software for millions of Discord servers, and have since I was 16." (MERGE point 9). The name moves to a smaller line above it, as Story already does.
- **Props:** `as="h1"`, `text`, `id` for `aria-labelledby`. `delay` stays at 0.
- **Motion:** each word rises out of a clip and sharpens from blur, once on mount, in pure CSS. It isn't cause and effect. It is the single entrance on the page, which Arc allows for hero copy. Keep everything below it static on load.
- **Accessibility:** the heading carries the full text as `aria-label` with the animated words `aria-hidden`, so crawlers read one sentence. Reduced motion drops the clip and rise and does a quick fade. The text is never left hidden when scripts are slow.
- **Doc warning:** "Use in-view-title for section titles further down the page." This applies: the hero only. The element caps at 24ch. Story's `.title` is already 18ch, so the cap does no harm.
- **Replaces:** the `InViewTitle variant="word"` hero in `StoryVariant.tsx` and the `InViewTitle variant="blur"` name in `BentoVariant.tsx`, both off-doc for an above-the-fold heading. Profile's `TextReveal` on the bare name moves to the headline.

#### card (free, installed)
- **Job:** one wide media card per flagship project, under its text row, Samuel Kraft style (MERGE point 3): Hydra, SoundCloud, Groovy and the Netflix bot. Each has a screenshot, the title, a one-sentence caption with the outcome, and an action link, "Read the case study", to `/work/<id>`.
- **Props:** `title`, `description` (the outcome sentence), `media` (an `<img>` with real alt, cropped wide), `action` (an `<a>` to the case study), and `meta` for role and years ("Co-owner since 2020"). Leave `details` unset. The case study is a real page, and the doc says to add details "only when there is real extra content".
- **Motion:** a 2px lift and a slow media zoom on mouse hover only. This is an affordance, not cause and effect. Because only the action link is clickable, the lift suggests that the whole card clicks. Make the action link visually clear, or wrap the media in the same link.
- **Accessibility:** it renders an `article` with an `h3`, which fits under an `h2` "Work" section. Media needs alt text. Reduced motion drops the lift and zoom. Touch and pen never lift.
- **Doc warning:** "Use expandable-card for inline disclosure without a dialog... Use dialog when the content has no card to grow from." Neither applies. The quick look dialog shouldn't be used when a real route exists.
- **Replaces:** the three-up `CardToArticle` grid in `BentoVariant.tsx` ("right assets, wrong shape"). It reuses `/lab/hydra.jpg`, `/lab/soundcloud.jpg` and `/lab/groovy.jpg`, recropped wide.

#### badge (free, installed)
- **Job:** at most two or three per page: a date or "Own venture" marker on each Now row, and "Webby Honoree 2023" on the Netflix row.
- **Props:** `size="sm"`. `tone="success" dot` only for something actually live (Hydra as his own venture). `color="amber"` for the Webby, as the lab already does.
- **Motion:** the label morphs only when its children change. On a static page it never animates, which is right.
- **Accessibility:** a plain inline span. The label must state the status without relying on tone color.
- **Doc warning:** "Use chip-group when people toggle the values." Not relevant. The bigger risk is overuse. The lab's outline-badge skill rows are the chip wall MERGE cuts (point 8).
- **Replaces:** keeps the Now and award badges in `ProfileVariant.tsx` and `BentoVariant.tsx`. Removes every skills and languages `Badge outline` map.

#### copy-button (free, installed)
- **Job:** in the closing contact block, beside the visible email address and the primary "Email me" link.
- **Props:** `value={email}`, `label="Copy email"`, `variant="outline"`.
- **Motion:** the icon and word crossfade to Copied and the check draws in. This is cause and effect: your click put the address on the clipboard.
- **Accessibility:** a native button and a polite status region ("Copy email: Copied"). The label reserves its widest state, so nothing shifts. Reduced motion uses an instant fade.
- **Doc warning:** "Use split-button when copying has alternatives." None here.
- **Replaces:** the copies in all three variants. Keep one, in the contact block. The hero then holds a single primary action (Email me) plus the CV link, per Arc's one-primary rule.

#### toc-progress (Pro)
- **Job:** a sticky aside on case-study pages (`/work/hydra`, `/work/netflix`, `/work/groovy`), with sections such as Context, What I owned, Decisions, Outcome and What I would change. On phones it goes above the article.
- **Props:** `items` (heading ids, levels 1 and 2 only), `offset` set to the header height plus 16 to 32px (the same value as `scroll-margin-top` on the headings), `readingTime` when known, `title="On this page"`, `showTimeLeft` on.
- **Motion:** a line fills as you read and a marker rides to the current heading. Choosing a heading glides there. This is cause and effect: the line is your reading position.
- **Accessibility:** a nav landmark of real anchor links that work before hydration. `aria-current="location"`. Focus moves to the target heading. Reduced motion follows the scroll directly and jumps.
- **Doc warning:** "Skip it for pages with fewer than four headings." Each case study needs at least four real sections, or it gets a plain anchor list.
- **Replaces:** nothing in the lab. Case studies are new (MERGE point 6).

#### theme-switch, with variant `rise` (free, installed)
The catalog lists theme-switch and theme-switch-rise separately. They are one component.
- **Job:** a quiet icon toggle in the footer or the small top line. It is not the memorable detail.
- **Props:** `theme`, `onThemeChange(next, variant, trigger)`, `variant="rise"`, `iconOnly`. Apply the theme inside `document.startViewTransition` from the trigger's rect, and skip the transition when `prefers-reduced-motion` is set.
- **Motion:** sun and moon trade places. The page rises into the new theme. This is cause and effect: the button changes the page.
- **Accessibility:** a native Button with `aria-pressed`. The label names the next theme. A theme that arrives during hydration swaps without motion.
- **Doc warning:** "Use theme-switch-rise for quiet product chrome, or theme-switch-eclipse for a dramatic showcase change." Rise fits. Eclipse and split compete for attention.
- **Replaces:** the `ThemeToggle` (from `components/default/ThemeToggle.tsx`) inside the lab `Switcher`, which rotates rise, eclipse and split per page. The variant dock itself is lab-only and goes.

### Maybe

#### hover-card (free, new: needs `@radix-ui/react-popover`)
- **Job:** previews behind project names. Either inline in the hero sentence (Antfu-style pills: "Groovy", "Hydra", "SoundCloud", "Netflix") or on project rows (Dennis-style). The card holds the wide screenshot, the role and years, and the one number that matters ("6.1M servers, co-owner since 2020").
- **Props:** `content` (a custom node; `HoverCardProfile` is for people, not projects), `side="bottom"`, `align="start"`, default `openDelay` 500 and `closeDelay` 140.
- **Motion:** the card grows from the trigger edge. Moving between triggers within 300ms opens the next after 80ms with a fade. This is cause and effect: the card belongs to the name you are pointing at.
- **Accessibility:** `role="tooltip"` and `aria-describedby`. Focus never enters the card, so it must stay read-only, with no links inside. Keyboard focus opens it immediately. Reduced motion keeps a short fade.
- **Doc warning:** "Use popover when the content has buttons or inputs." So no "Visit site" link inside the card. Also: "On touch, a tap toggles the card instead of relying on hover." If the trigger is a link to `/work/hydra`, check during the build whether a tap on a phone navigates or only toggles. If it only toggles, either the inline-sentence pattern needs non-link triggers on touch, or the rows keep plain links on touch.
- **Replaces:** nothing directly. It's an alternative to rows with a plain arrow link.

#### tabs (free, installed)
- **Job:** the disputed short and long bio toggle (Lee Robinson pattern). Two triggers, "Short" and "Long", over the intro paragraph.
- **Props:** `defaultValue="short"`, `TabsList aria-label="Bio length"`, two `TabsTrigger`, and two `TabsContent`.
- **Motion:** a pill glides between triggers. The panel slides 8px the way the selection moved, while the height springs from the old panel. This is cause and effect: the text you chose grows or shrinks in place.
- **Accessibility:** Radix tab roles. The outgoing panel is inert. Reduced motion crossfades in place with no height animation.
- **Doc warning:** "Use segmented-control for a compact value toggle not tied to panels." Here each option swaps a panel, so tabs is the documented choice. Triggers have a 5.5rem minimum width, which is fine for two.
- **Replaces:** the Story `Tabs` (Experience, Skills, Education), whose content returns to visible rows. The Skills tab is cut.

#### expandable-text (free)
- **Job:** the simpler alternative to the bio toggle. The long bio is clamped to three lines under the headline, with Read more.
- **Props:** `lines={3}` and the default labels.
- **Motion:** height, fade mask and chevron move on one progress value, and closing scrolls the start back into view. This is cause and effect.
- **Accessibility:** the full text stays in the accessibility tree while clamped. The toggle has `aria-expanded`. Reduced motion opens it at once.
- **Doc warning:** "Do not clamp content people must read." The first three lines must carry the hire-me message on their own.
- **Replaces:** Profile's full `summary` paragraph. Pick this or tabs, not both.

#### ruler-slider (free)
- **Job:** the strongest memorable-detail candidate (section 3). A year tape from 2018 to 2026 under a fixed needle. The readout rolls the year, and a caption beside it shows that year's chapter from `chapters` in `content.ts`.
- **Props:** `label="Year"`, `min` and `max` in months since January 2018, `step={1}` (a month), `majorEvery={12}`, `format` that returns the year, and `onValueChange` to update the caption. `defaultValue` is the newest month.
- **Motion:** drag moves the tape 1:1, a flick coasts onto a tick, and the ends rubber-band. This is cause and effect: you move time and the story answers.
- **Accessibility:** a real `role="slider"` with `aria-valuetext`. Arrows step a month and PageUp and PageDown a year. The caption should sit in a polite live region, or update only on `onValueCommit`, so it doesn't flood. Reduced motion removes coasting and glides.
- **Doc warning:** it is documented for measurement input ("height, weight, temperature"), so this is off-label. Its own guidance is "Use number-field when people know the exact number." Visitors don't, so the slider fits. Empty years (2023 to 2025) show the latest earlier chapter.
- **Replaces:** the custom year ruler in `components/lab/story/CareerStory.tsx`, which is hand-built Motion code tied to scroll. The replacement is an Arc-native control that the visitor drives directly.

#### time-dial (Pro)
- **Job:** in the contact block, "When can we talk?". Kufstein plus the visitor's city (from `Intl.DateTimeFormat().resolvedOptions().timeZone`), with his working hours shaded.
- **Props:** `cities` (2 to 5, `offset` in minutes), `homeId` set to the visitor's city, `workingHours` set to his real day, `hourCycle={24}` for European readers or derived from the locale.
- **Motion:** drag with quarter-hour detents, rolling digits, and sun and moon turning at the day boundary. This is cause and effect: you move the hour and see who is at work.
- **Accessibility:** a focusable slider with spoken `aria-valuetext` and a live region. Reduced motion removes the coasting.
- **Doc warning:** "Offsets are fixed per city; there is no time zone database, so pass DST-correct offsets yourself." Mapping an IANA zone to a city name and a DST-correct offset is extra code.
- **Replaces:** the `Here` and `BentoClock` local-time line, if chosen as the detail. Otherwise `Here` stays as a quiet text line.

#### agent-timeline (Pro)
- **Job:** a "How I work" section or a case study that replays one real orchestrated multi-agent run, for example the run that built this site: the orchestrator plus executors and reviewers, with real time, tokens and cost.
- **Props:** `run` (`agents`, `spans`, `handoffs`) built from a real trace, `title`, `autoPlay` false (the default with data), and `speeds`.
- **Motion:** a playhead replays spans, and handoffs draw between rows. This is cause and effect: it shows parallelism and handoffs as they happened.
- **Accessibility:** spans are buttons with a roving tab index, the scrubber is a slider, and failures never rely on color. Reduced motion starts on the finished run.
- **Doc warning:** "Brand marks are sample content, never implied endorsements." Use only marks for tools he really used, and never ship `sampleRun`.
- **Replaces:** nothing. It backs up the "multi-agent AI development workflows" skill with evidence instead of a chip.

#### typewriter-terminal (Pro)
- **Job:** on the Hydra case study, a short scripted session of the Rust rebuild, such as a build and a rollout with real command names.
- **Props:** `steps` (2 to 4 commands with 2 to 4 output lines each), `title`, `loop={false}`, `copyable` only if the commands are real, `caption` saying it is a replay.
- **Motion:** typing with a human cadence, then streamed output with a scrubber. Cause and effect is weak: it's a show.
- **Accessibility:** a hidden transcript list, a real slider scrubber, and no loop announcements. Reduced motion shows the finished session.
- **Doc warning:** "Use code-block for commands and source that people need to read and copy without waiting," and "Everything shown is a simulation. Say so."
- **Replaces:** nothing. On the homepage it would read as a generic dev-tool hero, which is why it stays off the homepage.

#### code-block (free)
- **Job:** a case-study snippet, one real excerpt per study at most.
- **Props:** `code`, `filename`, `language="rust"` or `"ts"`, `maxLines={12}`.
- **Motion:** the height springs on Show all. This is cause and effect.
- **Accessibility:** a labelled section with a focusable `pre`. Copy feedback comes from copy-button (installed). Reduced motion snaps.
- **Doc warning:** "Use a full highlighter library when you need many languages." The built-in highlighter is a small regex pass with no language bundles, so check how Rust looks before relying on it.
- **Replaces:** nothing.

#### image-compare (free)
- **Job:** a case study with two same-crop screenshots of one surface, such as a hydra.bot page before and after the rebuild, or groovy.bot before and after the 2021 shutdown.
- **Props:** `before`, `after` (images with alt text), `labels={["2020", "2026"]}` or similar, `aspectRatio` to match.
- **Motion:** the divider follows the pointer and settles with velocity. This is cause and effect.
- **Accessibility:** the handle is a slider. On touch it waits for a sideways drag, so the page still scrolls. Reduced motion jumps.
- **Doc warning:** "Both images should share the same crop and size." Only use it if such pairs exist.
- **Replaces:** nothing.

#### line-chart (free)
- **Job:** the Groovy case study. Servers over time from 2018 until YouTube forced it offline in 2021.
- **Props:** `data`, one `series`, `label="Discord servers running Groovy"`, `formatTick` compact, and `curve="linear"` for an honest drop.
- **Motion:** draws in on view, with a gliding crosshair. The trend shape is the story.
- **Accessibility:** a slider plot with full value text and a hidden data table. Reduced motion skips the draw.
- **Doc warning:** "Use sparkline for a tiny inline trend." Here the shape is the content, so line-chart is right. It needs real numbers. Don't interpolate a curve from two endpoints.
- **Replaces:** nothing.

#### lightbox-gallery (Pro)
- **Job:** a case-study screenshot set, five or more real images.
- **Props:** `images` with real `width`, `height`, `alt` and `caption`, plus `label`.
- **Motion:** the photo flies from its slot to the stage and drags away. This is cause and effect.
- **Accessibility:** a modal dialog with a focus trap and a live counter. Reduced motion fades.
- **Doc warning:** "Use carousel for a single inline row without a viewer." With fewer than five images, plain figures are better.
- **Replaces:** nothing.

#### card-to-article (Pro, installed)
- **Job:** only if the council keeps case studies inside the homepage instead of on routes. Then it is the `/work` grid.
- **Props:** `items`, `aspectRatio`, and `onValueChange` synced to the URL.
- **Motion:** the card becomes the article and drags back into its slot. This is cause and effect, and it was the most liked interaction in Bento.
- **Accessibility:** a modal dialog, with focus returned to the card.
- **Doc warning:** "Use a normal link to a page when articles are long or need their own URL and SEO." Case studies are meant to rank and be shared, so this warning points to real routes and card. That is why it is only a maybe.
- **Replaces:** it would keep Bento's `CardToArticle`. Otherwise remove it from the build.

#### accordion (free, installed)
- **Job:** only for an "Earlier" tail if the experience list grows past about eight rows.
- **Props:** `items`, `defaultOpen={-1}`.
- **Motion:** the height springs without overshoot, and the chevron turns. This is cause and effect.
- **Accessibility:** Radix wiring. Triggers sit inside headings.
- **Doc warning:** it is framed for FAQs and settings, and "Use tabs when sections are peer views." Experience rows read better visible and dated (Brittany, Emil).
- **Replaces:** the Profile experience `Accordion`, which goes back to visible rows.

#### in-view-title (free, installed)
- **Job:** the closing contact heading, "Have something to build?", and nowhere else.
- **Props:** `as="h2"`, `variant="blur"`, `once`.
- **Motion:** reveals at 45% visible. It isn't cause and effect. Used once at the end of the page it signals the close. Used on every heading, it is noise that competes with the one detail.
- **Accessibility:** `aria-label` on the heading. Reduced motion shows it instantly.
- **Doc warning:** "Use text-reveal for hero copy that animates on load." This is why the Story and Bento heroes should switch.
- **Replaces:** the `InViewTitle` on "The details", the section headings and the hero in Story and Bento.

#### animated-counter (free)
- **Job:** a live Hydra server count inside the Hydra row or case study, only if a real source exists, such as a Hydra stats endpoint behind a Worker with caching.
- **Props:** `value`, `decimals`, `suffix`, `animateOnView`.
- **Motion:** odometer digits. This is cause and effect only when the value actually updates. Rolling up from zero on view is decoration.
- **Accessibility:** a hidden formatted copy. No announcements, which is right for a passive number.
- **Doc warning:** "Use metric-card or stat-card when the number needs a card around it." It doesn't. The number sits in a sentence (Muse's MERGE position).
- **Replaces:** the counters inside the `StatsBand` block (the blocks evaluator covers the band itself).

#### avatar (free)
- **Job:** the portrait next to the name.
- **Props:** `name="Oskar Lang"`, `src="/avatar.png"`, `size="lg"` or `"xl"` (88px).
- **Motion:** blur-in while loading. Quiet.
- **Accessibility:** `role="img"` with the name as its label. Beside a visible name this is read twice, so consider wrapping it as decorative.
- **Doc warning:** none that applies.
- **Replaces:** the plain `<img src="/avatar.png" alt="">` in all three variants. The gain is small. A plain img is fine.

#### button (free, installed)
- **Job:** real buttons only. A native `button` with no href, so "Email me" (mailto) and "Read my CV" stay anchors, styled with the same tokens.
- **Doc warning:** "Use one primary action per surface." That holds in the hero and the contact block.
- **Replaces:** nothing directly.

## 3. Memorable-detail candidates, ranked

MERGE point 4: exactly one detail, and it should belong to Oskar. Whichever is chosen, the clock, the stats band, the variant dock and dramatic theme switches stop competing.

1. **ruler-slider as a career year tape (free).** Drag or arrow through 2018 to 2026. The needle sits on a year and the caption changes: "2018. Wrote Groovy at 16. 16M+ servers", then Hydra, SoundCloud, Netflix, and the 2026 Rust rebuild. *Specific because* the ticks are his years and the readout his milestones. It shows "since I was 16" literally, right under the headline that says it. It's the Arc-native form of the Story year ruler that Grok favoured, and Oskar already likes Story. *What would make it generic:* a ruler of arbitrary numbers, or captions that repeat the CV. Each stop should name one decision he made that year.
2. **hover-card previews on the project names in the headline sentence (free).** "I build software for millions of Discord servers" plus inline names that open a screenshot and one number. *Specific because* it uses his own product screenshots and real counts, and it turns the best line on the site into an index (Antfu pills meet Dennis previews). Risk: touch behaviour (section 2). It's quieter than the ruler and serves clients directly.
3. **time-dial in the contact block (Pro).** "When can we talk?" Kufstein against the visitor's city. *Specific because* it grows out of the existing Kufstein clock and answers a real contractor question: are our working hours compatible? Still generic in form, since any remote freelancer could ship it. It needs the DST and city mapping.
4. **agent-timeline replaying the run that built rxs.to (Pro).** *Specific because* it is evidence for a 2026 skill only a few contractors can show, with real numbers. Risk: it reads as an AI-product demo, and it belongs on a "How I work" page rather than the homepage.
5. **animated-counter with a live Hydra server count (free).** *Specific because* it's his live product right now. It needs a real, cached data source, and it's only memorable if the number visibly moves while someone watches, which at daily granularity it won't.
6. **typewriter-terminal of the Hydra Rust rebuild (Pro).** It belongs to his current work, but terminal heroes are the commonest developer-portfolio trope, and it must be labelled a simulation.

Rejected despite the temptation: now-playing (a music-bot homage with no real audio is a fake player), holo-card (a Webby foil card is loud and a gimmick), sticker-peel (bot logos as stickers is decorative), image-trail, dot-grid, ink-fluid, gravity-well and sand-text (decorative motion with no cause), keycap-keyboard (a generic easter egg), activity-heatmap (generic, and it undersells private contract work), and ai-command (a palette for a handful of destinations, with simulated answers).

## 4. Cost notes

Installed today (from `package.json` and `components/arc/`): `motion` ^14.9, `lucide-react`, `@radix-ui/react-accordion`, `@radix-ui/react-dialog`, `@radix-ui/react-tabs`. Installed Arc items: accordion, badge, button, card, card-to-article, copy-button, in-view-title, segmented-control, tabs, text-reveal, theme-switch, plus `lib/motion-tokens.ts` and `lib/use-copy-feedback.ts`, and the scroll-story and stats-band blocks.

**New npm packages:**
- **hover-card** needs `@radix-ui/react-popover`. This is the only new package among all 24 use and maybe picks.
- I skipped tooltip partly because it would add `@radix-ui/react-tooltip`. The same goes for floating-button-group, tldr-toggle and others.
- button-group, split-button and dropdown-menu would add `@radix-ui/react-dropdown-menu`. All are skipped.

**No new packages:** text-reveal (CSS only), card (Radix dialog already installed), badge, copy-button, theme-switch (uses the installed button), tabs, accordion, in-view-title, avatar, animated-counter, expandable-text, ruler-slider, code-block (reuses the installed copy-button and `use-copy-feedback`), image-compare, line-chart, toc-progress, time-dial, agent-timeline, typewriter-terminal, lightbox-gallery, and card-to-article (already installed). All of these list only `motion` and `lucide-react`.

**Motion features:** the codebase imports the full `motion` component from `motion/react`. It doesn't use `m` with `LazyMotion`, and it already uses layout animations (`LayoutGroup`, `layoutId` in card, tabs and segmented-control), `AnimatePresence`, `useInView` and `animate`. Drag and pan gestures (ruler-slider, time-dial, image-compare, lightbox-gallery, card-to-article) and the rAF loops (typewriter-terminal, toc-progress, agent-timeline) are part of that same bundle. So no picks pull in a new Motion feature set. The cost is each component's own code.

**Where the weight should live:** keep the homepage to text-reveal, card, badge, copy-button, theme-switch and the one memorable detail. Load toc-progress, code-block, image-compare, line-chart, lightbox-gallery, typewriter-terminal and agent-timeline only on case-study routes, so the homepage stays light.

**Pro items:** toc-progress, time-dial, agent-timeline, typewriter-terminal, lightbox-gallery, and card-to-article (already installed). They install through the licensed `@uiarc-pro` registry. Never reconstruct them. I read only their public docs.

**Runtime notes from the docs:**
- badge, button and expandable-text each run a ResizeObserver per instance. That's cheap at portfolio scale.
- card's quick look uses a 7px backdrop blur. It's moot if `details` stays unset.
- avatar uses a plain img unless next/image is passed through `ArcProvider`.
- time-dial needs DST-correct offsets that you compute yourself.
- hover-card's tap-on-touch behaviour needs a check before it goes on links.
