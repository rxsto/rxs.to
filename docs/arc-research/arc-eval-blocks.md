# Arc blocks for rxs.to: evaluation of all 140

Evaluator: Claude Opus 5.5 (research sub-agent), 2026-11-06. Sources: `arc-catalog.tsv`, `arc-docs/block-*.md`, the lab code in `/home/dev/worktrees/rxs.to/spike-arc` (read only), `BRIEF.md` and `MERGE.md`. I did not use a browser. I read no Pro source, apart from the two Pro files already committed in the lab, which I opened only to check their imports and sizes.

Design target (MERGE.md consensus): an editorial column (about 640px, 16px body), project rows with one outcome sentence each, one wide media card per flagship project, one memorable detail that belongs to Oskar, a dated Now block, two or three case-study routes, a closing contact block, and no skills chip wall.

## Headline

Arc's blocks are almost all SaaS and app screens. **Only 2 blocks earn a clear place (cta-section, site-footer). Another 9 are maybes that depend on a council decision, on real data, or on content that comes later.** Nearly all of the editorial column should be built from Arc components (the second evaluator's area), not blocks. Two of the three blocks or Pro items in the lab should go or change: drop stats-band from the homepage, replace card-to-article with linked case-study routes, and move scroll-story off the homepage.

**Licence warning, read before any push:** `spike/arc` already commits Pro source (`components/arc/card-to-article/*`, `components/arc/blocks/scroll-story/*`), plus `components/lab/story/arc-story.module.css`, which is a byte-identical copy (13,439 bytes) of the Pro scroll-story stylesheet, and `CareerStory.tsx`, which is derived from it. None of these files carries an Arc notice. `git ls-remote` shows no `spike/arc` branch on origin, so the source does not appear to have been pushed yet. rxsto/rxs.to is a public repo. See section 4.

Catalog note: all 140 blocks have category `Blocks` in the catalog, so the table below groups them by job (site sections, content, data visualisation, account, commerce, workspace, AI) to make it easier to scan.

---

## 1. Verdict table

Counts: **use 2, maybe 9, skip 129.**

### A. Marketing and site sections (21)

| id | tier | verdict | where on rxs.to | reason |
|---|---|---|---|---|
| cta-section | free | **use** | Homepage close ("Have something to build?") | The centered variant is exactly the agreed closing contact block: one primary action, one secondary, nothing invented |
| site-footer | free | **use** | Every route, below the close | The minimal variant is one quiet row of links and socials. Turn off the newsletter and status |
| contact-section | free | maybe | `/work-with-me` or a contact route, if one is added | The channels variant (email, Discord, LinkedIn with detail panels) suits a hire page. The form variant needs a real send backend |
| faq-section | free | maybe | `/work-with-me`, under "what I take on" | An accordion of client questions (engagement types, time zone, NDAs) answers a client's next question without a call |
| site-header | free | maybe | Secondary routes only (case studies, CV) | The simple variant gives a way back from a case study. The homepage column needs no bar |
| scroll-story | pro | maybe | Already installed. Move it to `/story` or a case-study walkthrough | **Change.** The Story headline and year ruler are strong, but a nested 480 to 600px scroll viewport on the homepage traps skimmers |
| testimonial-stage | pro | maybe | Homepage or case study, only with real quotes | Portrait-led quotes from Hydra, SoundCloud or Netflix contacts would be strong client proof. Never use placeholder quotes |
| stats-band | free | skip | Remove from homepage (currently used in Profile and Bento) | **Drop.** A four-counter count-up is SaaS hero grammar, repeats the bio, and competes for the one memorable detail. Put the numbers on project rows |
| hero-section | free | skip | None | 100svh SaaS heroes over a mesh gradient, which breaks "no decorative gradients". Story's headline works best as plain type |
| hero-signup | pro | skip | None | Waitlist hero, so nothing to collect |
| newsletter-signup | free | skip | None for now | There is no newsletter. Revisit only if writing builds an audience |
| logo-marquee | free | skip | None | A decorative loop with no cause and effect, and showing the Netflix and SoundCloud marks needs permission. Name clients in proof sentences instead |
| feature-bento | pro | skip | None | Six-cell product bento. The consensus moved away from bento tiles |
| spotlight-grid | pro | skip | None | Pointer-light feature cards with sample dev-tool demos. Glow-adjacent, and every card needs a bespoke rebuild |
| exploded-view | pro | skip | None | A 3D layered phone showpiece. Heavy, needs custom layer art, and competes with any other detail |
| layout-morph | pro | skip | None | A 24-card gallery that flies between six layouts. Spectacle with no story |
| team-showcase | pro | skip | None | Introduces a team. Oskar is one person |
| comparison-table | free | skip | None | Us-versus-them matrix |
| plan-comparison | free | skip | None | Pricing tiers |
| pricing-calculator | pro | skip | None | Seat pricing |
| usage-pricing | pro | skip | None | Usage pricing calculator |

### B. Content, navigation and publishing (12)

| id | tier | verdict | where on rxs.to | reason |
|---|---|---|---|---|
| blog-grid | free | maybe | `/writing`, later, once at least three real posts exist | The only writing-index block. Pass `getHref` for real routes. Never ship it empty |
| command-palette | free | maybe | Global ⌘K, only if the council picks it as the memorable detail | It works, but the site has a handful of destinations (Sol's objection). Inline only, so it needs a dialog wrapper |
| changelog-feed | free | skip | None (pattern only) | Month-grouped release notes in a fixed-height scroller with no props. The Now block is a short dated list, so compose it |
| help-center | pro | skip | None (pattern only) | Support portal. Its article view with a sticky outline is the case-study pattern, but compose that from `toc-progress` |
| docs-sidebar | pro | skip | None (pattern only) | Docs tree, version switcher and outline. Overkill for a three-page case study |
| page-header | free | skip | None | Project-record header with members and tabs. No props, and it needs its own inner scroller |
| profile-page | pro | skip | None | In-app member profile with an edit sheet. The cover, avatar and stats layout reads as a social app, not a portfolio |
| activity-feed | pro | skip | None (pattern only) | Team activity feed. The day-grouped timeline matches benji.org's log, but it is built for unread state and teammates |
| notification-center | free | skip | None | Bell inbox |
| media-player | pro | skip | None | Tempting nod to Groovy, but the tracks are synthesized, there are rights issues, and it's a gimmick |
| empty-states | free | skip | None (maybe a 404 scene later) | You could extract one morphing scene for a 404 page. Not worth it in v1 |
| onboarding-illustration | pro | skip | None | First-run dialog |

### C. Data visualisation (20)

| id | tier | verdict | where on rxs.to | reason |
|---|---|---|---|---|
| line-replay | pro | maybe | Case-study pages (Netflix bot launch month, Groovy 2018 to 2021, Hydra growth) | The one block that explains engineering outcomes as cause and effect. Real server counts with launch, press and shutdown moments. Only if real data exists |
| uptime-status | pro | skip | None | Status page. Its incident timeline is a pattern only |
| metrics-dashboard | pro | skip | None | Analytics dashboard |
| revenue-explorer | pro | skip | None | SaaS revenue brush chart |
| journey-flow | pro | skip | None | Sankey of user journeys |
| cohort-retention | pro | skip | None | Retention triangle |
| usage-forecast | pro | skip | None | Billing forecast |
| mrr-waterfall | pro | skip | None | MRR bridge |
| metric-explorer | pro | skip | None | KPI cards that open into charts. Dashboard grammar |
| kpi-drilldown | pro | skip | None | KPI drill-down |
| activity-terrain | pro | skip | None | 3D hourly terrain. Spectacle |
| revenue-globe | pro | skip | None | Payment arcs on a globe. Discord servers have no honest geodata for this |
| customer-galaxy | pro | skip | None | Account galaxy |
| semantic-zoom | pro | skip | None | Infinite-zoom org map. A "zoom into my work" idea would be a canvas gate, which the consensus refuses |
| market-terminal | pro | skip | None | Trading terminal |
| budget-variance | pro | skip | None | Budget bullets |
| choropleth-explorer | pro | skip | None | Region map |
| small-multiples | pro | skip | None | Trellis of charts. Too analytic for the audience |
| connected-scatter | pro | skip | None | CAC versus LTV path |
| horizon-chart | pro | skip | None | 8 to 30 series against a baseline |

### D. Auth, account and developer settings (24)

| id | tier | verdict | where on rxs.to | reason |
|---|---|---|---|---|
| signup-form | free | skip | None | No accounts |
| sign-in | free | skip | None | No accounts |
| login-centered | free | skip | None | No accounts |
| login-immersive | pro | skip | None | No accounts |
| login-split | pro | skip | None | No accounts |
| otp-input | free | skip | None | No accounts |
| magic-link | pro | skip | None | No accounts |
| two-factor-setup | pro | skip | None | No accounts |
| security-settings | pro | skip | None | Account settings |
| settings-page | pro | skip | None | Account settings |
| settings-command | pro | skip | None | Settings palette |
| api-keys | pro | skip | None | Developer console |
| env-variables | pro | skip | None | Secrets manager |
| roles-permissions | pro | skip | None | Permissions matrix |
| team-members | pro | skip | None | Members list |
| invite-people | pro | skip | None | Invites |
| seat-manager | pro | skip | None | Seats and billing |
| domain-verify | pro | skip | None | DNS setup |
| webhooks | pro | skip | None | Webhooks console |
| webhook-tester | pro | skip | None (pattern only) | Its signed, sent, 200 OK timeline could show a Discord interaction's lifecycle in a case study, but compose that |
| cancel-flow | pro | skip | None | Churn flow |
| onboarding-survey | pro | skip | None | Post-signup survey |
| multi-step-form | pro | skip | None | A guided project-brief form would be over-built for a solo contractor. Use email |
| file-upload | free | skip | None | Nothing to upload |

### E. Billing and commerce (13)

| id | tier | verdict | where on rxs.to | reason |
|---|---|---|---|---|
| wallet-card | pro | skip | None | Money UI |
| invoice-studio | pro | skip | None | Invoicing |
| billing-overview | pro | skip | None | Billing page |
| usage-billing | pro | skip | None | Billing dashboard |
| checkout-summary | pro | skip | None | Checkout |
| checkout-live | pro | skip | None | Checkout |
| cart-drawer | pro | skip | None | Commerce |
| product-listing | pro | skip | None | Storefront |
| product-detail | pro | skip | None | Product page |
| credit-topup | pro | skip | None | AI credits |
| spend-alert | pro | skip | None | Budget alerts |
| seat-map | pro | skip | None | Event seating |
| delivery-tracker | pro | skip | None | Order tracking. The marker gliding between stops repeats the year ruler the lab already has |

### F. Workspace and productivity (24)

| id | tier | verdict | where on rxs.to | reason |
|---|---|---|---|---|
| support-conversation | pro | maybe | Homepage memorable detail, only if the council picks the Discord slash-command playground | A message thread with quick replies and deterministic canned answers is the closest Arc base for "type /work and the bot answers" |
| release-readiness | pro | skip | None | Launch checklist |
| team-directory | pro | skip | None | People search |
| project-board | pro | skip | None | Workflow board |
| kanban-board | pro | skip | None | Kanban |
| availability-picker | pro | skip | None | Multi-attendee scheduling. Link a booking page instead if Oskar wants calls booked |
| week-calendar | pro | skip | None | Calendar |
| gantt-timeline | pro | skip | None | Editable planner. A career timeline belongs in rows |
| smart-scheduler | pro | skip | None | AI scheduling |
| inbox-triage | pro | skip | None | Inbox |
| inbox-sidebar | pro | skip | None | Mail shell |
| selection-toolbar | pro | skip | None | Batch actions |
| workspace-sidebar | pro | skip | None | App shell |
| sidebar-rail | pro | skip | None | App shell |
| support-widget | pro | skip | None | Help launcher |
| feedback-board | pro | skip | None | Feature requests |
| feature-voting | pro | skip | None | Voting board |
| search-results | pro | skip | None | Faceted search |
| integrations | pro | skip | None | Integrations directory |
| goal-tracker | pro | skip | None | OKRs |
| task-breakdown | pro | skip | None | AI planning |
| call-insights | pro | skip | None | Sales calls |
| lead-scoring | pro | skip | None | CRM |
| account-health | pro | skip | None | Customer success |

### G. AI and agents (26)

| id | tier | verdict | where on rxs.to | reason |
|---|---|---|---|---|
| agent-run | pro | skip | None (maybe a future essay) | Could illustrate Oskar's multi-agent workflow in a writing piece, but a simulated run shown as real would mislead. Not v1 |
| agent-orchestrator | pro | skip | None (maybe a future essay) | Same: a lead splitting work into lanes matches his workflow, but it's an AI-SaaS grammar showpiece |
| ai-composer | pro | skip | None | Prompt box |
| ai-chat | pro | skip | None | An "ask my CV" chatbot is a gate and a liability |
| ai-side-panel | pro | skip | None | Assistant panel |
| research-run | pro | skip | None | Research agent |
| ai-inline-edit | pro | skip | None | AI editing |
| ai-answer | pro | skip | None | AI answer |
| model-picker | pro | skip | None | Model pill |
| model-arena | pro | skip | None | Model comparison |
| prompt-studio | pro | skip | None | Prompt tooling |
| document-extract | pro | skip | None | Extraction |
| agent-memory | pro | skip | None | Memory settings |
| agent-tasks | pro | skip | None | Background agents |
| agent-approvals | pro | skip | None | Approvals |
| agent-routines | pro | skip | None | Scheduled agents |
| mcp-servers | pro | skip | None | MCP settings |
| knowledge-base | pro | skip | None | RAG tooling |
| eval-suite | pro | skip | None | Evals |
| agent-builder | pro | skip | None | Agent setup |
| ai-insight-card | pro | skip | None | KPI explainer |
| catch-up | pro | skip | None | Digest |
| agent-gallery | pro | skip | None | Marketplace |
| ai-feature-launch | pro | skip | None | In-product launch card |
| ai-search-bar | pro | skip | None | AI search |
| ai-setup-wizard | pro | skip | None | Setup wizard |

Total rows: 21 + 12 + 20 + 24 + 13 + 24 + 26 = 140.

---

## 2. Use and maybe detail

### cta-section (free, use)

- **Job:** the homepage close, after Experience. Title "Have something to build?" (Story's line, which the seats liked). The description says what to hire him for in one sentence, for example "Contract engineering in TypeScript and Rust: Discord platforms, customer portals and AI-first products." Primary action "Email me" with `href: mailto:`. Secondary action "Read my CV" (`/cv`) or `null`.
- **Adapt:** `variant="centered"`. Set `note` to an honest line, such as "Based in Kufstein, Austria, working across Europe and US mornings", or to an empty string. **Never leave the default "No credit card required".** Pass `faces={[]}`. Keep the lab's `CopyButton` next to the email, either as a sibling under the block or by passing the email as the primary label. The block has no copy slot, so don't fork it for that. Never add an availability date (consensus point 7).
- **Motion:** the arrow leans forward on hover and buttons press to .97 and morph their width when the label changes. The press is cause and effect. The arrow lean is a small affordance. The split variant's self-completing setup card is decoration, so don't use split.
- **A11y and reduced motion:** a section labelled by its heading. Actions with `href` are real links. Reduced motion removes travel. Headings scale from 30 to 52px with the container, so check that 52px doesn't exceed the column's name size.
- **Doc's when-not-to-use:** "the first screen of a page" and "collecting an email". Neither applies.
- **Replaces:** StoryVariant's hand-built `<section className={styles.contact}>` block. Profile and Bento have no close at all, and should get this.

### site-footer (free, use)

- **Job:** one row on every route: GitHub, LinkedIn, Discord, X, plus CV and a copyright line.
- **Adapt:** `variant="minimal"`, `brand={{ name: "Oskar Lang", href: "/" }}`, `links` for internal routes, `socials` from `content.ts` `links` with `external: true`, `newsletter={null}`, `status={null}`. If the council picks the local-time strip (jhey, benji) as the detail, it can sit beside the copyright through `tagline`. Don't use the `logo` variant: the large fading mark is decoration.
- **Motion:** none in the minimal variant, which is right for a footer.
- **A11y:** footer landmark, labelled groups, and external links get an arrow and open in a new tab.
- **Doc's when-not-to-use:** "use contact-section when the main goal is to start a conversation". The cta-section above it does that job, so the footer stays quiet.
- **Replaces:** ProfileVariant's `<footer className={styles.footer}>`, the Story contact nav, and the Bento links cell.

### contact-section (free, maybe)

- **Job:** only if the council adds a `/work-with-me` or contact route (Dennis-style freelance inquiry). The channels variant would list three channels: Email (detail: what to include in a brief, plus copy), Discord (community server), LinkedIn. Each has a `meta` line that is only there if it's true ("Replies within two working days").
- **Adapt:** use `variant="channels"`. Use the form variant only with a real `onSubmit`. A Cloudflare Worker route that emails Oskar would do, and is a small, realistic backend at a trust boundary (validate and rate-limit). Replace the default topics ("Sales", "Support", "Press") with "New project", "Discord bot", "Something else". **Skip the offices variant:** open/closed office hours read as corporate, and `Here.tsx` already shows Kufstein's local time and weather.
- **Motion:** the form springs into the confirmation and the topic highlight glides. Both are cause and effect.
- **A11y:** labelled fields, errors after the first submit, `role="alert"` on a failed send, and topic chips form a radio group.
- **Doc's when-not-to-use:** account flows. Doesn't apply.
- **Replaces:** nothing yet. It's a new route.
- **Cost:** pulls in the Arc Input, Textarea and Avatar components.

### faq-section (free, maybe)

- **Job:** on `/work-with-me`, five or six real questions: what engagements he takes (fixed scope or retainer), time zone and overlap, whether he works with agencies, NDAs and IP, how Discord bot projects are scoped, and what a first call covers.
- **Adapt:** `variant="accordion"` only. Search and columns are for long FAQs. Use plain-text answers. Pass stable `id`s.
- **Motion:** height and opacity open together and the plus turns, which tells you the item opened. Layout moves on filter don't apply to the accordion variant.
- **A11y:** buttons with `aria-expanded`, plus Arrow, Home and End keys between questions.
- **Doc's when-not-to-use:** "generic collapsible content that is not a question list". Don't use it for Experience; the lab's Accordion component already covers that.
- **Replaces:** nothing. It's new content. Only build it if Oskar writes real answers.

### site-header (free, maybe)

- **Job:** secondary routes only (`/work/hydra`, `/cv`, `/writing`), with brand "Oskar Lang" linking home, items for Work, Writing (once it exists) and CV, and `primaryAction` "Email me" or `null`. The homepage stays a header-less column like Paco's and Emil's.
- **Adapt:** use `variant="simple"`. Mega pulls `next/image` feature panels, which aren't needed. Pass `secondaryAction={null}`. It's a container-query component, so it's safe in a 640px column.
- **Motion:** the background turns solid past `scrollThreshold`, which shows that content is scrolling under it, and the active link glides. Both are cause and effect.
- **A11y:** labelled nav with `aria-current`, and the mobile sheet locks scroll and returns focus.
- **Doc's when-not-to-use:** in-app navigation, and "use morph-nav for single-surface animated nav". Fine here.
- **Replaces:** `components/lab/Switcher.tsx` on secondary routes. The Switcher is a lab tool and goes away anyway.

### scroll-story (pro, maybe; installed, verdict change)

- **Current use:** the Pro block itself isn't rendered on any route. `components/lab/story/CareerStory.tsx` re-implements its pattern on a copy of its stylesheet: five year chapters in a nested scroll viewport, a pinned card with year tabs, a big metric and a year ruler.
- **Against the consensus:** the Story headline is the best line on the site (point 9), and Grok named the year ruler as a memorable-detail candidate. But the block's own responsive note says the story "scrolls inside its own viewport of clamp(480px, 74vh, 600px), not the page". On a homepage, a scroll area inside the page is a trap for a client with four minutes, and on phones the pinned card covers half the viewport. Its doc's when-to-use is "marketing pages that walk through a product". A career isn't a product walkthrough.
- **Recommendation:** keep the headline in the homepage intro. Move the chaptered story to an optional `/story` (or `/about`) route, where it can be the page's purpose, or reuse the pattern on the Hydra case study for "the Rust rebuild in four steps". If it stays on the homepage at all, it should be the one memorable detail, and the stats band must go.
- **Motion:** scroll progress fills the step tabs and drives the ruler marker. That is cause and effect (your scroll moves the marker).
- **A11y and reduced motion:** a focusable labelled viewport, a tablist with roving tabindex, `aria-current="step"`. Reduced motion jumps instead of smooth-scrolling. CareerStory keeps these.
- **Licence:** see section 4. The copied CSS and the derived component are Pro material too.

### support-conversation (pro, maybe)

- **Job:** only if the council picks the Discord slash-command playground (proposed by Sol and Muse) as the one memorable detail. It's the detail that most clearly belongs to Oskar: he builds Discord bots for millions of servers. A small thread where the visitor taps quick replies such as `/work`, `/now`, `/hire`, and a bot answers with short embed-like replies drawn from `content.ts`.
- **Adapt:** replace `replyFor` and `scheduleReply` with deterministic answers. The block already uses canned replies, so the bot never pretends to be live. Remove the PDF attachment and the resolve toggle. Style it as a neutral chat with Arc tokens. **Don't imitate Discord's branding or UI chrome** (licence and impersonation concerns). Wire `onSend` to nothing, or to analytics.
- **Motion:** messages rise on a gentle spring and earlier ones shift by layout. This is cause and effect: your command produces the reply.
- **A11y and reduced motion:** a polite live region for new messages, labelled controls, and reduced motion removes the offsets. Free text input needs a fallback reply for unknown commands, or limit input to the quick replies.
- **Doc's when-not-to-use:** "use ai-composer for a prompt input without a thread". Doesn't apply. The real risk is gimmickry. Keep it to one card, below the intro or in place of the Now block, never as a gate before content.
- **Replaces:** the competing details (the Bento clock cell, the stats band). Leave the Here line as plain text.

### line-replay (pro, maybe)

- **Job:** one replay per case study, only if Oskar has real numbers. Candidates: Hey, Netflix's first 30 days (150K+ servers, with moments for launch day, press and the Webby honour). Groovy from 2018 to the 2021 shutdown, with YouTube's action as an `incident` moment. Hydra's growth to 6.1M servers, with the 2026 Rust rebuild cut-over. This is the "engineering explained visually" pattern from nan.fyi that the seats liked.
- **Adapt:** `data` uses minutes from the start, but `formatTime` and `formatTick` are props, so treat the unit as days or weeks without editing the source. Set `title`, `description`, `seriesLabel` and `valueLabel` ("Servers"). Leave out `baseline` unless there's an honest comparison. Use `defaultPosition="end"` so the whole curve shows before anyone presses play. Keep `autoPlay` false in a reading page.
- **Motion:** the line draws with a playhead and moments annotate as it passes. This is the textbook cause and effect the Arc rules ask for: the doc says "the replay makes cause and effect visible by revealing the line and the moments together".
- **A11y and reduced motion:** the scrubber is a `role="slider"` with value text, a text readout repeats every value, moments are announced through a polite region, and controls are at least 44px. Reduced motion keeps viewer-started playback and makes jumps and callouts instant.
- **Doc's when-not-to-use:** "compare several series at a glance". Doesn't apply. The real one here: **never feed it invented or smoothed data.** The doc's own sample is labelled illustrative. If only two or three data points exist, write a sentence instead.
- **Replaces:** nothing in the lab. It's new case-study content.

### command-palette (free, maybe)

- **Job:** only if the council picks ⌘K as the memorable detail (Muse for, Sol against). Its items would be routes (Work, Hydra, Netflix, Groovy, CV), actions (Copy email, Toggle theme) and outbound links.
- **Adapt:** it renders inline, not in a modal. Wrap it in the installed Radix dialog (or the Arc Dialog component), pass `onClose`, and map `onSelect` to the router. Add a visible trigger with a Kbd hint, because a hidden shortcut does nothing for touch visitors.
- **Motion:** the results frame springs to the list height and the highlight follows the active row. Cause and effect.
- **A11y:** combobox with `aria-activedescendant`, a live result count, and the doc says to provide the dialog semantics yourself.
- **Doc's when-not-to-use:** a short list of actions should be a dropdown-menu. With about eight destinations, that is roughly rxs.to's situation, which is why this is a maybe that leans skip.
- **Replaces:** nothing. If it's chosen, it replaces the variant dock and Switcher as the detail.

### testimonial-stage (pro, maybe)

- **Job:** two to four verified quotes with portraits, for example from Jochen Segner (Hydra), the SoundCloud contact and the Netflix contact. It would sit after Selected work or on the relevant case study. Strong proof for client audiences.
- **Adapt:** replace the `perspectives` array with real, permissioned quotes. Today the block has only `className` and `onPerspectiveChange` props, so the data change happens in the source file. Don't use stock portraits. **Without real quotes, skip it entirely.**
- **Motion:** the portrait and quote crossfade with a directional shift when you pick a person. Cause and effect, user-triggered, no autoplay.
- **A11y:** tablist with arrow keys, and the quote panel is a polite live region.
- **Doc's when-not-to-use:** "use carousel for many short testimonials". Fine with two to four.
- **Replaces:** nothing in the lab.

### blog-grid (free, maybe, later)

- **Job:** the `/writing` index once there are at least three real posts (the consensus says writing comes later and never as an empty route).
- **Adapt:** pass `getHref` so cards link to real post routes with their own URLs (SEO), not the in-place reader. Pass `categories` only if there are at least two real categories. Drive page and category from the URL. On an editorial site, consider a dense list over the three-column card grid. Paco's and Leerob's notes indexes are rows, so this block may lose to a composed list.
- **Motion:** the filter highlight glides on the morph spring and paging slides in the direction of travel. Cause and effect. The 3% hover zoom on images is decoration but harmless.
- **A11y:** one link per card, `aria-pressed` filters, `aria-current` pagination.
- **Doc's when-not-to-use:** "large archives that need sorting". Not relevant soon.
- **Replaces:** nothing yet.

### The three items already in the lab

| Item | Verdict | Why, against the consensus | What to do |
|---|---|---|---|
| **stats-band** (free block) | **Drop** from the homepage | Muse called four counters as a hero SaaS-landing grammar, and Sol said it repeats the bio. It is one of four things competing for the memorable detail (point 4). Its own doc places it "under a hero or between a features section and testimonials", which is landing-page language. Grok's "one band, then stop" is the only defence | Put each number in its project row's meta ("Hydra, co-owner since 2020, 6.1M servers"). That's already in `content.ts` `projects[].meta`. If the council keeps a band anyway: once, `layout="divided"`, directly under the intro, no visuals, never inside a bento cell |
| **card-to-article** (Pro component, judged here because the brief asks) | **Replace** | The consensus wants one wide media card per flagship project (Samuel Kraft) and real case-study pages (point 6). Its doc says: "Use a normal link to a page when articles are long or need their own URL and SEO". It also lays out two columns at 4:3, which is the bento shape the seats rejected, and puts white titles over a photo scrim | Build wide media cards (the Arc Card component, full column width, caption below) linking to `/work/hydra`, `/work/netflix` and `/work/groovy`. If the morph has to stay, keep it only as a quick look that syncs the open article to the URL with `onValueChange`, and that adds state and SEO complexity for little gain |
| **scroll-story** (Pro block, through CareerStory) | **Change** | The headline and ruler are liked, but the nested scroll viewport and pinned product view are a product walkthrough on a page meant for skimming | Move it to `/story` or a case study (see its section above) |

---

## 3. Page-section map

| Section or route | Best block(s) | Notes |
|---|---|---|
| **Intro** (name, Story headline, one paragraph, Email me, CV) | Compose from components | No block fits an editorial intro. hero-section is 100svh SaaS. Use the Text reveal or In-view title already installed, plus Button and Copy button. Keep "I build software for millions of Discord servers, and have since I was 16." |
| **Memorable detail** (council decides; exactly one) | support-conversation (slash-command playground) **or** command-palette **or** scroll-story's ruler on `/story`, otherwise compose | My pick, if the council is undecided: the slash-command playground, because it's the only candidate that is Oskar's own craft. Lee Robinson's bio toggle and hover previews on rows are component work (Segmented control, Hover card), not blocks |
| **Now** (dated: "Updated November 2026") | Compose from components | A short list: org, role, one clause, with a "since" date. Reuse the lab's `current` data. changelog-feed and activity-feed are too heavy. Badge is optional, and one tone is enough |
| **Selected work rows** | Compose from components | Name, one outcome sentence, a meta line with the number (where stats-band's figures go), a link to the case study. Hover image previews (Dennis) would be the Hover card component |
| **Media cards** (one per flagship: Hydra, Netflix, Groovy) | Compose from components (Card, the image assets in `/lab/*.jpg`) | Replaces card-to-article. Full column width, 16:9 or 3:2, caption under it, linking to the case-study route |
| **Experience** | Compose from components | Dated, attributed rows (Brittany's grammar without her layout). The lab's Accordion or the Timeline component. Tools go inside the sentences, so the skills chip wall is dropped (point 8) |
| **Case-study page** (`/work/hydra`, `/work/netflix`, `/work/groovy`) | line-replay (if real data) + optionally scroll-story (for a stepwise rebuild) + site-header (simple) | Compose the body: the `toc-progress` Pro component for the outline, Image compare for before and after (Hydra's old dashboard against the Rust-era one), and plain prose on what Oskar owned and decided. help-center and docs-sidebar have the outline pattern but are app shells |
| **Work with me** (optional route) | contact-section (channels) + faq-section (accordion) | Only if the council wants a separate hire page. Otherwise the cta-section close carries it |
| **Contact close** | **cta-section** (centered) | Title "Have something to build?", Email me, CV, no invented availability |
| **Footer** | **site-footer** (minimal) | Socials, CV, copyright. The local-time line can live here if the Here strip isn't the detail |
| **Writing** (later) | blog-grid with `getHref`, or a composed list | Never ship it empty |
| **/story** (optional) | scroll-story, adapted (today's CareerStory) | Where the chaptered career walkthrough can be the page's purpose |
| **404** | Compose (or extract one empty-states scene) | Low priority |

---

## 4. Cost notes

### New dependencies

Installed today: `motion`, `lucide-react`, `@radix-ui/react-accordion`, `@radix-ui/react-dialog`, `@radix-ui/react-tabs`, and the Arc components accordion, badge, button, card, card-to-article, copy-button, in-view-title, segmented-control, tabs, text-reveal and theme-switch.

| Pick | New npm packages | New Arc components it pulls in |
|---|---|---|
| cta-section | none | none (Button and Segmented control are installed) |
| site-footer | none | none (Button and Segmented control are installed) |
| site-header (simple) | none | none. The mega variant imports `next/image` for feature panels. vinext shims `next/*`, and the installed scroll-story already imports `next/image`, so check that it renders in the Cloudflare build |
| contact-section | none | Input, Textarea, Avatar. The form needs a server endpoint (a Worker route) |
| faq-section | none | SearchField, imported by the search variant. Check whether the import is static |
| command-palette | none | Search, keyboard navigation and action list pieces, plus a Dialog wrapper (Radix dialog is installed) |
| blog-grid | none | Avatar, Pagination |
| line-replay (Pro) | none expected (Motion-based) | none beyond Button and Segmented control |
| support-conversation (Pro) | none expected | Input, Avatar |
| testimonial-stage (Pro) | none expected | Avatar. Uses `next/image` |
| scroll-story (Pro, installed) | none | none. Imports `next/image` |

No pick needs a new runtime library beyond what's installed. The heaviest skipped blocks (activity-terrain, revenue-globe, customer-galaxy, semantic-zoom, layout-morph, hero-section's WebGL mesh) are the ones that would add canvas or WebGL weight.

Removing stats-band also removes about 27 KB of source (`stats-band.tsx`, its CSS, data and world-map files) from the homepage bundle.

### Pro items and the licence

Pro picks and Pro items in the lab: **scroll-story, card-to-article** (installed), and **line-replay, support-conversation, testimonial-stage** (maybe).

The licence lets Pro source ship only inside an end product, with the Arc notice kept. **rxsto/rxs.to is a public repo**, so committing Pro `.tsx` or `.css` files there publishes the source, not just a built product. Current state on `spike/arc`:

- `components/arc/card-to-article/card-to-article.tsx` and its CSS: Pro source, committed, no Arc notice.
- `components/arc/blocks/scroll-story/scroll-story.tsx` and its CSS: Pro source, committed, no Arc notice, and not rendered by any route.
- `components/lab/story/arc-story.module.css`: a verbatim copy of the Pro scroll-story stylesheet (identical 13,439 bytes). `components/lab/story/CareerStory.tsx` is derived from the Pro block.
- `git ls-remote --heads origin spike/arc` returned nothing, so the branch appears to be local only. The deployed preview at `arc-lab-rxs-to.rxsto.workers.dev` ships the Pro code only as a built bundle, which is the end-product case.

Options for Oskar (his call; I changed nothing):

1. Keep Pro source out of the public repo: a private package or git submodule installed at build time, with the Arc Pro token held as a CI secret. Then add the Arc notice to each Pro file.
2. Make the repo private.
3. Use only free blocks. The two **use** picks (cta-section, site-footer) are both free, and the recommended homepage is free-only if the council doesn't pick the slash-command playground and Oskar has no data for line-replay. Dropping card-to-article and moving scroll-story off the homepage, as recommended above, already removes most of the Pro code from the homepage.

Either way, **don't push `spike/arc` to the public origin as it stands.** Point anyone who needs Pro access to the Arc pricing page.

---

## Top 8 picks

1. `cta-section`: homepage close
2. `site-footer`: every route
3. `line-replay`: case studies, with real data
4. `contact-section`: work-with-me channels
5. `scroll-story`: kept but moved to `/story` or a case study
6. `support-conversation`: the slash-command playground, if the council picks it
7. `faq-section`: work-with-me
8. `site-header`: secondary routes only
