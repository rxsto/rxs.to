# Independent portfolio research: Sol

Research date: 6 November 2026. Researcher: gpt-6.1-sol through Codex. No other researcher's report or rankings were read.

My recommendation is to use **profile as the foundation, bring bento's project imagery into its reading flow, and give the career story its own optional route**. Oskar already has unusually strong facts. The next improvement should make his contribution to each product tangible rather than add more interface furniture.

## Evidence and limits

The full shared brief was read. I screened **42 candidate URLs**, with current titles, rendered text, links and typography recorded in [sol-inventory.json](sol-inventory.json). This broad screening initially used a browser text extraction, before the coordinator's resource restrictions. Nine external sites completed shoot.mjs; five others produced useful partial captures before captures were stopped. Seventeen sites are shortlisted below. Following the coordinator's stricter instruction, I did not retry incomplete captures or launch further browsers. Three shortlisted sites therefore have HTML evidence only.

**Observed, capture** means I personally looked at the PNG, including desktop/mobile/scroll sheets for the nine complete captures. **Observed, HTML/source** means inspected current extracted text, markup or downloaded CSS/JavaScript, not verified interaction execution. **Recalled** means an unverified remembered or brief-described mechanism. Interaction scores estimate the quality/usefulness of the interaction idea, not a passed functionality or accessibility test. Scores marked * are provisional, because the visual or interaction evidence is incomplete. All numeric scores are my judgments, not measurements.

Preview profile was captured by my own shoot.mjs call. For bento and story I independently inspected existing raw shoot.mjs captures from shots/grok, copied into my preview folders with PROVENANCE.txt after further browser work was prohibited. These are shared images of the same artifact, not another researcher's opinions. I also fetched both deployed routes' HTML with curl, HTTP 200. This reuse avoids duplicate browser work while allowing all three previews to be judged visually.

This is research, not the full Impeccable critique workflow: I used its design assessment guidance, with the supplied brief as product context. No UI was edited, detector was run, or further agents were spawned. Questions skipped: the research brief supplies the scope and requires an independent report.

### Discovery trail and candidate screen

Starting sources: [Arche developer portfolios](https://arche.directory/personal-portfolios/developers), [Gitstar's engineer portfolio list](https://github.com/Gitstar-OC/Developer-Portfolio), [Minimal Gallery's Jakub entry](https://minimal.gallery/jakub-krehel/), and searches of Awwwards, SiteInspire and Godly. The Godly URL redirected to recent.design and could not be fetched by the search tool; a Minimal Gallery category URL also failed. These failures did not count as site evidence. Arche entries were followed to resolve less familiar names, including Julien Thibeaut, Luis Bizarro, Lorenzo Dossi and Harry Atkins. Candidate sites themselves, not directory descriptions, ground the findings.

The 42 screened candidates, all individually attempted:

- Shortlisted: paco.me, rauno.me, emilkowal.ski, jakub.kr, ibelick.com, shud.in, leerob.com, mxstbr.com, maggieappleton.com, joshwcomeau.com, brittanychiang.com, dennissnellenberg.com, lochie.me, nan.fyi, antfu.me, ped.ro, bizar.ro.
- Also inspected in current extracted HTML/text: steipete.me, julian.digital, rauchg.com, adamwathan.me, swyx.io, sive.rs, sindresorhus.com, kentcdodds.com, jhey.dev, tobiasahlin.com, tania.dev, danmall.com, p5aholic.me, heydonworks.com, andy-bell.co.uk, chloeyan.me, glenn.me, uilabs.dev, pham.codes, lorenzodossi.com, harryjatkins.com.
- Special cases: henryheffernan.com loaded a BIOS/START experience rather than an immediately readable portfolio; bruno-simon.com returned almost no text, so HTML did not justify judging the 3D experience; caferati.me returned 200 but resisted DOM extraction; iljavaneck.com failed DNS at the attempted spelling. I did not treat those as verified visual recommendations.

All 17 shortlisted sites returned HTTP 200 during the initial direct inspection. That verifies availability at research time, not every outbound link. The inventory contains timestamps indirectly through this session; shoot reports contain capture status, fonts and error details. No performance conclusions are based on this overloaded machine.

## Principles

1. **Observed, capture: use a reading measure, not an arbitrary centered box.** Paco's measured body is 16px/28px over 640px; Jakub's is 17px/27.625px over 644px. These make the same column work for biography, project descriptions and writing. Oskar can use roughly 640px for prose and break wider only for product evidence. A giant hero is unnecessary to make this feel deliberate.
2. **Observed, capture: give every repeated row the same grammar.** Jakub pairs a small square icon, project name and subordinate purpose; Brittany pairs dates, role and company with descriptive copy. Repeated alignment makes different projects comparable. Oskar's row grammar should be project, personal role, result, then a deeper link.
3. **Observed, capture: whitespace should separate decisions.** Emil's Today, Projects and Writing have generous gaps; rows within each section are much closer. This makes the grouping readable without a card around every item. Keep Oskar's contact and positioning together; put breathing room before selected work, not between every sentence.
4. **Observed, capture: a static identity can anchor moving depth.** Brittany's left identity/navigation remains visible in desktop scroll captures while the right column advances. On mobile the identity becomes part of the normal document. This fits Oskar's substantial experience without forcing clients to re-find contact details.
5. **Observed, HTML: distinguish kinds of responsibility.** Anthony Fu explicitly separates creator, recent work, core team and maintaining. Those categories say more than a wall of logos. Oskar should distinguish founder, co-owner, project lead and contract engineer rather than let seven company names imply equal involvement.
6. **Observed, capture: establish one memorable graphic idea.** Rauno uses oversized presentation panels, including an acid-yellow disk overlapping the biography; Maggie uses an editorial headline, warm ground and small colorful identity. Their visual character survives without reading all the text. Oskar needs one personal detail with a relationship to his work, not a collection of unrelated effects. Arc's no-gradient/no-glow constraint is compatible with a single vivid flat color or a small bot interaction.
7. **Observed, capture: let artifact images break up abstraction.** Brittany's project thumbnails and Maggie's illustrated/book imagery interrupt text without turning every paragraph into a card. Oskar's bots need actual interface crops, a Discord conversation, or an infrastructure diagram. Server counts alone do not show what he built.
8. **Observed, capture and HTML: let expertise become content people can use.** Nanda's index pairs article names with concrete problems; Josh offers tutorials with readable summaries and topic navigation. Oskar could show a small, usable explanation of bot state or Rust migration tradeoffs. It would demonstrate technical judgment more effectively than another animated number.
9. **Observed, capture: personality can live in factual copy.** Paco's Now section discusses interests; Max's plain list includes Austrian origins, hobbies and working beliefs; Shu connects interests with a concise career account. Oskar's BUNDjugend work and Kufstein location are more distinctive than generic claims about passion.
10. **Observed, HTML and capture: progressive disclosure should change useful depth.** Lee visibly offers Default and Long biography choices; Oskar's profile visibly offers collapsible experience rows. The valuable distinction is a quick hiring assessment versus optional detail. Keep at least the role and outcome outside any expansion.
11. **Observed, source: make the visual response point back to its trigger.** Anthony's theme source calculates a reveal radius from the click position; Brittany's CSS gives hovered rows coordinated changes. Both provide local cause and effect. Apply that to a project expanding from its own card, rather than moving unrelated page elements.
12. **Observed, source and capture: design the non-spectacle path.** Anthony's theme code skips the view-transition effect for reduced motion; Brittany's mobile capture becomes a normal single-column document. Oskar's memorable detail must remain optional, and content must read immediately without scrolling through a performance.

## Archetypes

| Family | Examples and evidence | Strength | Fit for Oskar |
|---|---|---|---|
| Editorial column | Paco, Emil, Jakub, Shu; observed captures | Clear identity, compact work index, good mobile reading, inexpensive content growth | **Best foundation.** Pair a short hiring statement with 3 selected projects; give the full CV its existing route. |
| Split identity and evidence | Brittany; observed desktop/mobile captures | Contact/identity stay available beside deep experience | Good if retaining substantial experience on the homepage. On a narrow screen it must collapse to one document. |
| Visual essay / digital garden | Maggie, Nanda, Josh; observed captures | Distinct voice, reusable expertise, deep links that circulate independently | Borrow case-study structure and visual explanations. A large publication is premature if Oskar does not want to maintain it. |
| Portfolio index / credits list | Luis in current HTML, Max in captures, Anthony in HTML | Fast verification, role attribution, makes substantial history legible | Excellent for a secondary work archive and for separating active contracts from owned businesses. Needs selected depth to avoid becoming a CV duplicate. |
| Single-screen playground | Rauno, Julien, Lochie; observed captures, some partial | Makes the site itself a craft sample and creates recall | Use only as one bounded moment. Oskar sells engineering ownership beyond motion design; an entire experimental shell could obscure that. |
| Agency-like portrait and work sequence | Dennis; current HTML plus captured loader only | Personal confidence, clear Work/About/Contact paths, explicit invitation to inquire | Borrow the inquiry clarity. Do not adopt the long entrance or assume the unobserved main-page presentation was verified. |
| Scroll career narrative | Current story; observed shared captures and deployed HTML | Connects age 16, Groovy, Hydra and current leadership into a memorable account | Strong optional /story or /about route. Hiring should not require reading a timeline chronologically. |
| Bento overview | Current bento; observed shared captures and HTML | Parallel scanning, product imagery, compact mix of work and facts | Attractive on desktop. Mobile currently gives a large clock card priority over project proof. Use an intentional reading order rather than shrinking the desktop arrangement. |
| Game / simulated desktop | Henry; observed extracted loading/start UI only; Bruno's deeper experience unverified | Can itself prove unusual creative engineering skills | Poor primary fit for busy contract clients. A toy is suitable as an optional project, not the only route to the work. |

## Shortlist

All scores are /10. A = aesthetics, I = interaction, R = relevance. An asterisk means provisional. “HTML” folders below intentionally have no screenshot claim. Partial captures are retained as evidence, not presented as a completed capture suite. Relative folder paths resolve from this research folder.

| URL | Owner | Archetype | The one thing worth stealing | Mapping to Oskar | Shots folder / evidence | A | I | R |
|---|---|---|---|---|---|---:|---:|---:|
| https://jakub.kr | Jakub Krehel | Editorial index | Icon, title, one-line purpose as a repeatable row | Groovy/Hydra/SoundCloud as crisp, comparable evidence | shots/sol/jakub; complete, viewed | 9 | 7* | 10 |
| https://brittanychiang.com | Brittany Chiang | Split identity + evidence | Persistent identity beside dated, attributed work | Substantial experience with visible contact and CV | shots/sol/brittany; complete, viewed | 9 | 8* | 9 |
| https://paco.me | Paco Coursey | Editorial column | Calm 640px reading measure and humane Now section | Straightforward hiring read with optional personality | shots/sol/paco; complete, viewed; fold timing caveat | 8* | 7* | 9 |
| https://emilkowal.ski | Emil Kowalski | Editorial index | Today before Projects, then useful writing | Clearly separate 2026 priorities from Groovy history | shots/sol/emil; complete, viewed | 9 | 7* | 9 |
| https://nan.fyi | Nanda Syahrasyad | Illustrated technical publication | Each entry promises a specific technical explanation | Explain one real scaling or migration problem visually | shots/sol/nanda; partial desktop captures, viewed | 9 | 8* | 8 |
| https://maggieappleton.com | Maggie Appleton | Visual essay / garden | Personal point of view expressed through hierarchy and imagery | An about/writing layer about systems and AI workflows | shots/sol/maggie; complete, viewed | 9 | 7* | 7 |
| https://leerob.com | Lee Robinson | Personal editorial publication | Default/Long bio choice plus browsable notes | Quick client pitch with deeper career context | shots/sol/leerob; complete, viewed | 8 | 7* | 8 |
| https://shud.in | Shu Ding | Sidebar editorial | Four quiet navigation destinations with no card scaffolding | Keep projects, writing and personal context separable | shots/sol/shud; complete, viewed | 8 | 5* | 8 |
| https://mxstbr.com | Max Stoiber | Plain founder index | Credible founder/operator facts with almost no ceremony | Say founder/ownership/revenue clearly before listing tools | shots/sol/mxstbr; complete, viewed | 6 | 2 | 8 |
| https://rauno.me | Rauno Freiberg | Experimental presentation panels | One unmistakable graphic composition | A bounded identity moment, not the hiring navigation model | shots/sol/rauno; complete, viewed | 9 | 8* | 6 |
| https://ibelick.com | Julien Thibeaut | Single-screen playground | Three compact groups: Building, Writing, Everyday | Group shipped products, technical notes and personal interests | shots/sol/ibelick; partial desktop, viewed | 8 | 7* | 6 |
| https://lochie.me | Lochie Axon | Minimal full-screen playground | Full-screen statement contrasted with tiny persistent credits | One optional demo, with real project links always accessible | shots/sol/lochie; partial desktop, viewed | 8 | 7* | 5 |
| https://joshwcomeau.com | Josh W. Comeau | Illustrated teaching publication | Personality surrounding readable technical material | Warmth and illustrative demos without obscuring proof | shots/sol/josh; partial desktop light/dark, viewed fold | 9 | 8* | 6 |
| https://antfu.me | Anthony Fu | Maintainer profile / project index | Explicit distinctions between creator, maintainer and team member | Separate Oskar's different kinds of ownership | HTML + current theme source; no completed capture | 8* | 8* | 9 |
| https://ped.ro | Pedro Duarte | Interactive prose biography | Named concepts in the biography are actual buttons | Inline supporting detail about Groovy, Hydra and Netflix | HTML + button/popover markup; no capture | 8* | 8* | 8 |
| https://bizar.ro | Luis Bizarro | Creative technologist credits index | A dated work ledger with client/studio attribution | Give official bot work and collaborators precise credit | Current extracted HTML; no capture | 8* | 7* | 8 |
| https://dennissnellenberg.com | Dennis Snellenberg | Freelance studio portfolio | Work/About/Contact and a conspicuous inquiry invitation | Make contract inquiry explicit instead of relying on social links | shots/sol/dennis; loader-only PNG, main-page HTML | 8* | 7* | 7 |

Asterisks are meaningful: I would not select a visual direction solely from the three HTML-only rows or Dennis's captured loader. They are specific content/interaction references. The five final choices below have visual evidence I inspected.

## Interaction and motion moments

| Site | Evidence | Exactly what happens / what is established | Copy judgment |
|---|---|---|---|
| Anthony Fu | **Observed, source**, sol-source-antfu-0.txt | Theme handler takes click coordinates, computes the distance to the farthest viewport corner, changes the theme in a view transition, and animates a circular clip. Without view-transition support or with reduced motion it changes the theme directly. | Good optional theme treatment; proves cause and effect and includes a quieter branch. |
| Brittany Chiang | **Observed, CSS and markup**, sol-source-brittany-0.txt and HTML | Hover/focus classes change project/experience row backgrounds and title color; navigation rules lengthen the associated marker. | Copy the coherent emphasis and focus equivalent, adapting colors to Arc tokens. |
| Brittany Chiang | **Observed, application source**, sol-source-brittany-5.txt | A pointer handler updates x/y motion values; a 600px translucent radial spotlight follows them on desktop, with updates disabled below 1024px. | Understand the craft but **do not copy**: Arc excludes decorative glows, and it adds little hiring information. |
| Pedro Duarte | **Observed, HTML**; deeper result **recalled/unverified** | Project/place/name terms are semantic buttons with dialog-style popover triggers. I did not exercise them; the remembered behavior is contextual media/detail appearing from words in the biography. | Worth a small prototype for “wrote Groovy at 16,” but never make essential facts hover-only. |
| Lee Robinson | **Observed, capture + HTML**; state change not exercised | “Default” and “Long” buttons sit beside Bio. The intended useful interaction is selecting biography length while remaining on the same page. | Strong model if Oskar wants to preserve detailed history without overwhelming clients. |
| Rauno Freiberg | **Observed, capture comparison** | The first view shows the biography/yellow disk panel; the midpoint capture shows oversized Projects and Field Notes panels. The changed position is observed; precise drag/scroll physics were not tested. | Borrow the memorable framing, not assumed interaction physics. |
| Paco Coursey | **Observed, captures**, timing uncertain | Initial desktop frame is almost empty, mobile has faint biography text, and later scroll frames show legible content. This establishes a capture-time visibility issue, not its cause. | Content should be visible before optional entrance effects; do not reproduce the blank state. |
| Nanda's interactive essays | **Observed, HTML titles/promises**; mechanics **recalled/unverified** | The site explicitly offers interactive explanations of arrays, SVG paths and animation. Remembered articles let readers manipulate examples alongside the explanation; those controls were not exercised here. | Best transferable idea: a small real engineering explanation, not a decorative cursor. |
| Current profile | **Observed, capture + brief** | Experience rows show collapsed chevrons; summary, statistics and contact remain outside the disclosure. Expansion animation was not exercised. | Keep the compact overview but show one meaningful result before expanding. |
| Current bento | **Recalled from supplied brief, not exercised** | Project cards are described as morphing into articles. Static captures verify the cards, not the morph or its dismissal behavior. | Potentially the best Arc moment. Validate back behavior, keyboard focus and mobile reading before selecting it. |

No command palette, hover preview, drag physics or live statistic is claimed to work merely because it is famous or because a library is bundled. A command palette is unnecessary for a site with a handful of destinations. Bot counts should have an as-of date; they should not be animated to suggest a live feed unless one exists.

## Content ideas

These are recommendations, not claims that Oskar has approved new facts. Absence refers to the three lab pages inspected, not every page that may exist elsewhere on rxs.to.

- **Highest priority for clients: three compact case studies.** For Hydra, SoundCloud and Groovy, show context, exact personal ownership, one concrete technical/business decision, a real artifact and outcome. Anthony's responsibility distinctions and Brittany's role copy supply the pattern. Include collaborators by name where approved. Distinguish historical scale from current scale.
- **Highest priority for clients: state what someone can hire him to do now.** The current pages establish credibility but do not plainly describe the next engagement: platform ownership, bot/platform engineering, product/frontend work or technical leadership. Oskar must choose the emphasis; five current teams must not accidentally imply either guaranteed availability or no capacity. Do not invent an availability date.
- **High priority for clients: a direct inquiry path with useful context.** Keep email. Add a short invitation stating which project details help him reply, such as objective and timeline, without requiring a large form. Dennis's inquiry emphasis is the reference. The current copy-email button is already useful.
- **High priority for clients and recruiters: proof adjacent to the claim.** Link the Webby recognition, official client/product pages, appropriate public launches and the CV. Label Oskar's role separately from the client's brand. A huge customer count is stronger when its date and source are visible.
- **High priority for peers: one strong engineering note before a “blog.”** A Rust rebuild decision, Discord operational lesson or a concrete AI workflow would establish a voice. Jakub, Nanda and Peter Steinberger's current HTML show the value of a specific topic. Do not create empty Writing navigation or promise a cadence.
- **Medium priority for peers/collaborators: a Now section.** Emil and Paco make current priorities easy to find. Oskar already has “Working on now”; make it about the actual problems he is pursuing, not just employment badges.
- **Medium priority for everyone: a compact human layer.** Kufstein, BUNDjugend and one real interest can distinguish him. Max's facts, Maggie's voice and Anthony's photography links show alternatives to a generic “outside of work” paragraph. No invented hobby or artificially whimsical mascot is needed.
- **Conditional: two attributed testimonials.** Useful for client trust if someone can specifically describe Oskar's ownership or collaboration. No testimonials were verified in this sample, so this is a recommendation rather than an observed best-site pattern. Do not fabricate endorsements or ask anyone during research.
- **Lower priority: Uses, live stats, newsletter, guestbook.** Anthony has uses/photography links; Shu has a guestbook destination; Maggie has Now. Uses helps peers, but is less valuable to a client than outcomes. Live server stats bring maintenance and disclosure questions. A newsletter needs a sustained writing practice. None is needed for the next build.

## Anti-patterns

1. **Observed: forcing a performance before the content.** Henry's extracted page offered BIOS/loading/START; Dennis's partial capture still showed its greeting loader. Under this machine's load I cannot infer normal timing, but the content dependency is enough reason to avoid that structure for clients.
2. **Observed: aesthetics based solely on extreme restraint.** Max's current page is useful and honest, but browser-default-looking typography and nested lists do not supply much visual craft or interaction. Copy its informational confidence, not its entire presentation.
3. **Observed: a huge canvas with little evidence in the first frame.** Lochie's statement and small footer links are memorable; they delay understanding of the projects. Julien's sparse star-field has the same tradeoff. Oskar's commercial achievements deserve more immediate visibility.
4. **Observed: the quietest text can become too quiet.** Some captured secondary copy is very faint; Paco's first frame is particularly inconclusive. This was not a measured contrast audit. Still, legibility must survive the actual mobile capture, not just a designer's large monitor.
5. **Observed: one striking metaphor can become a navigation tax.** Rauno's panels are distinctive, but a client evaluating technical leadership has more work to do than on Jakub or Brittany. Interactive uniqueness and relevance are separate scores for a reason.
6. **Observed in preview: dashboard decoration can outrank portfolio evidence.** Bento gives its clock an entire mobile card before the work. Local time is useful as small contact context, not more important than Hydra or a case study.
7. **Observed in preview: statistics can repeat the same argument.** The biography and the metrics both emphasize scale, while much of the “what I personally did” appears deeper down. One supporting visual and a specific ownership sentence can add more information than a fourth big number.
8. **Recommendation derived from the sample:** avoid stacking cursor effects, particles, animated counters, a command menu and scroll choreography just because the component library offers them. None of the strongest readable references needs all of those to feel crafted.

## Preview critique

### Profile

**Observed in my full shoot captures.** The strongest baseline: clear identity, contact at the point of introduction, a readable column and graceful mobile reflow. It already competes with the quiet design-engineer sites on restraint. Unlike a generic template it has real, impressive outcomes. The 2x2 metric block is readable but gives the page a résumé/dashboard flavor; collapsed experience and a skills-badge cluster do less to demonstrate craft than Jakub's compact project purposes or Brittany's attributed, visible work. The mobile fold has no product artifact. The next gain is selected work with one visual and one judgment, not a more elaborate introduction.

### Bento

**Observed in reused raw desktop/mobile/scroll captures, plus deployed HTML.** Strongest immediate overview and strongest product proof of the three: actual Hydra, SoundCloud and Groovy surfaces appear in the project cards. The Webby card adds useful third-party credibility. However, nearly everything has the same rounded-container treatment, so identity, weather/time, accomplishments and substantive work compete as equal objects. The screenshots are darkened enough that some card text/image detail is difficult to distinguish at overview scale. Mobile gives the clock a large early slot. The card-to-article idea is promising but untested here. Prioritize project reading order and visible artifacts before adding more widgets.

### Story

**Observed in reused raw captures and deployed HTML.** Strongest headline: it turns age 16 and massive reach into a clear narrative. “Eight years of building in public” makes the career legible. The detailed experience copy below also communicates ownership much better than a technology cloud. The cost is a longer lead-in and repeated history: the introduction, timeline and details tell overlapping facts. “Five teams at once” can suggest execution capacity, but can also make a prospective client wonder about attention and availability. Use this narrative to earn an optional deeper read; do not make it the only way to assess current work.

### The three biggest gaps

1. **Evidence of judgment and contribution.** The variants communicate who, how many and when. They show less of why a decision was difficult, what Oskar owned, and what changed because of his work. Build 2–3 artifact-led project stories; a metric should support each story rather than substitute for it.
2. **A distinctive personal idea.** The clean Arc vocabulary is coherent, but many elements could describe another engineer after swapping the nouns. Use the actual Discord/product material for one memorable detail: for example, a tiny controllable bot conversation that reveals a real feature or a compact before/after system view. This is a proposed direction, not an observed capability or approved product feature.
3. **A clear commercial proposition and next step.** Email and CV are accessible, but “what should I hire Oskar for?” remains implicit. Replace some repeated scale copy with his chosen engagement focus and a concise invitation. Keep time/location subordinate. Do not imply current availability without his input.

Ranking for the next build: **profile for the document, bento for the selected-work presentation, story for the optional biography**. Prefer one considered project expansion to simultaneous effects across all three layers. Arc's regular/medium Geist/Inter, semantic light/dark colors and reduced-motion requirement already support this direction; there is no need to borrow the references' serif fonts, glows, or heavy entrance sequences.

## Top 5

1. **https://jakub.kr** — Best overall translation to Oskar: a precise introduction, compact attributed project rows and a natural path into deeper knowledge. The icon/summary grammar gives the existing profile more substance without adding boxes everywhere. Observed in full captures and extracted typography.
2. **https://brittanychiang.com** — Best evidence layout: identity stays available while roles, outcomes and project artifacts do the persuading. Borrow the scanning structure and focus/hover coherence, not its recognizable palette or spotlight. Observed in full desktop/mobile/scroll captures and current source.
3. **https://paco.me** — Best reference for a calm, humane single column. The Now and Connect sections make the engineer feel like a person without hijacking the work. Adopt its measure and rhythm, not an entrance whose captured timing was inconclusive. Observed in full captures and extracted typography.
4. **https://nan.fyi** — Best way to make engineering itself visually interesting: a concrete question, an illustration and an explanation worth opening. Oskar can apply this to one case study without becoming a full-time blogger. Observed in current HTML and partial desktop captures; deeper interactive controls are not reverified.
5. **https://emilkowal.ski** — Best restraint and ordering: current status, shipped projects, then useful writing. It demonstrates how to look deliberate using a small set of typographic decisions. Observed in full desktop/mobile/scroll captures and extracted typography.
