# Final set

Independent Sol ruling, 6 November 2026. Six references, ranked for Oskar's clients first. No additions to MERGE.md's 16-site candidate list.

Evidence convention: **Observed** means HTML fetched in this review or existing shoot.mjs images personally viewed; **Recommendation** means my design judgment. No recommendation depends on recalled interaction behavior. I read BRIEF.md, MERGE.md and all three reports in full. This is an inspection-only council pass, using the supplied product brief rather than creating Impeccable product documentation.

All six selected sites returned HTTP 200 in this review and have existing completed shoot.mjs reports with 200 responses. I inspected their captures in `shots/grok/{paco,samuelkraft,jakub,emil}`, `shots/muse/antfu` and `shots/sol/brittany`. I also inspected Lee's capture, Nanda's capture, and the existing Grok preview images, including mobile Bento and Story. No new captures were needed. Python/web fetch hit access errors on the preview and nan.fyi; curl successfully fetched all four with HTTP 200. Stills do not establish animation behavior, keyboard behavior or performance.

1. **https://paco.me — the document.**
   - **Observed:** a narrow centered reading column; short linked descriptions grouped under Building, Projects and Writing; prose Now and Connect sections (`shots/grok/paco/desktop-light-scroll25.png`, fresh HTML).
   - **Take, recommendation:** a prose measure near 640px, 16px body with generous line height, and larger gaps between sections than within lists. Let contact be an ordinary, legible part of the document. Use Arc's Geist/Inter, regular/medium weights and semantic light/dark tokens throughout.
   - **Must not take:** three parallel indexes when Oskar has no writing inventory; faint/blurred entrance states visible in the captures; a command palette merely because Paco authored cmdk.
   - **Informs:** the whole homepage's measure and rhythm, plus its quiet closing contact section.

2. **https://samuelkraft.com — product evidence.**
   - **Observed:** a compact personal introduction followed by a single wide project image, then its title and explanatory text; the same sequence repeats down the page (`shots/grok/samuelkraft/desktop-light-fold.png`, fresh HTML).
   - **Take, recommendation:** one wide Hydra web-app image with its name, Oskar's responsibility and outcome immediately below. Keep captions outside the image so the artifact remains visible. Additional imagery must earn its space through information, not completeness.
   - **Must not take:** a long gallery of equally weighted projects or decorative app-icon posters in place of evidence. Bento's Groovy image is visibly a shutdown notice, not a working bot interface; it belongs in historical context, not as proof of product functionality.
   - **Informs:** the flagship selected-work presentation and case-study media.

3. **https://antfu.me — ownership language.**
   - **Observed:** separate Working at, Creator of, Recent work, Core team of and Maintaining lines, with compact linked project names (`shots/muse/antfu/desktop-light-fold.png`, fresh HTML).
   - **Take, recommendation:** preserve the distinction between co-founder at Groovy, co-owner at Hydra, project lead on SoundCloud and contract roles. Put the responsibility beside the name, rather than making a client infer ownership from a logo. Small linked names can stay inline when listing current contracts.
   - **Must not take:** his entire ecosystem sitemap, affiliation density or icon navigation. Do not turn seven roles into another pill wall or imply Oskar founded Hydra.
   - **Informs:** project bylines and the current-work paragraph.

4. **https://jakub.kr — compact work rows.**
   - **Observed:** a role in the opening line and project rows consisting of a small square icon, linked name and subordinate purpose; the inspected dark capture retains the same structure (`shots/grok/jakub/desktop-light-fold.png` and `desktop-dark-fold.png`, fresh HTML).
   - **Take, recommendation:** use a consistent name/role/result row for work below the Hydra feature. For example, SoundCloud must say official bot, engineer/project lead, and 667K servers in the visible row. Essential evidence stays outside disclosures.
   - **Must not take:** the newsletter, additional Notes index or an icon for every sentence. Not every row needs a media card.
   - **Informs:** the compact Netflix, Groovy and SoundCloud work summaries and their deeper links.

5. **https://emilkowal.ski — current context.**
   - **Observed:** Today precedes Projects and explains current status in prose; project names have one factual description (`shots/grok/emil/desktop-light-fold.png`, fresh HTML).
   - **Take, recommendation:** a two-sentence Now block, explicitly dated November 2026, after the introduction: Hydra's Rust rebuild, followed by the three contract engagements with their actual roles. Keep it shorter than the selected work.
   - **Must not take:** the course promotion or his particular employment status. Dating the block is my recommendation, not an observed feature of Emil's Today. Do not invent availability or copy his light-only captured theme behavior.
   - **Informs:** Now, not a separate /now destination.

6. **https://brittanychiang.com — attributed, dated evidence.**
   - **Observed:** dated roles with concrete responsibility descriptions, project-specific metrics, supporting links and an in-flow full-résumé link. Desktop captures retain identity while the record advances; mobile becomes a normal document (`shots/sol/brittany/desktop-light-scroll25.png`, `mobile-fold.png`, fresh HTML).
   - **Take, recommendation:** role/date alignment and one explicit contribution sentence per compact experience entry on /cv; attach metrics and supporting links to their actual projects on the homepage. End the work section with a quiet full-CV link.
   - **Must not take:** the desktop split shell, navy/teal identity, spotlight, all-caps section styling or technology-chip density. These would dilute the selected single-column direction and conflict with parts of Arc's rules.
   - **Informs:** work metadata and /cv, not the homepage's overall layout.

# Cuts

These are cuts from MERGE.md's council candidate list, not judgments about the owners' overall work.

- https://leerob.com — observed Default/Long control is useful, but a short homepage plus /story already separates reading depths; a second biography mechanism adds little.
- https://nan.fyi — observed illustrated, question-led engineering publication is a good future writing reference, but the next pass needs actual project cases rather than a publication structure.
- https://benji.org — a year-grouped log would duplicate the dated evidence and /cv; chronology is secondary to Oskar's selected outcomes.
- https://dennissnellenberg.com — fresh HTML confirms the inquiry invitation, but Story already supplies one; the existing Sol image is a loader and the proposed cursor preview remains unverified, so neither earns another design reference.
- https://rauno.me — oversized horizontal presentation supplies no necessary role in this client-first outline; motion quality cannot be established by stills alone.
- https://jhey.dev — weather/time/status machinery makes peripheral information more prominent than the work, as the preview's mobile clock already demonstrates.
- https://ped.ro — contextual biography buttons add another disclosure layer when project summaries and direct links already suffice.
- https://portfolio.chsmc.org — device framing is not an unmet need for Discord/web products; Kraft supplies the relevant media sequence without borrowing the frame metaphor.
- https://maggieappleton.com — a garden/editorial identity would need a substantial authored body of material; not needed to present the verified portfolio.
- https://vladmoroz.com — specific contribution sentences are desirable, but Antfu and Brittany already cover attribution and responsibility; the merged evidence is HTML-only.

# Rulings

## Stats band: cut it

**Observed:** Profile's intro already carries Groovy's scale/revenue and Hydra's scale, then repeats them in a large four-cell block. Bento repeats the band before project cards repeat the counts again. Profile's captured email action is already visibly primary; the reports' claim that all three contact controls have equal visual weight is too strong.

**Recommendation:** retain Story's scale headline, remove the four-counter band, and attach each exact metric to its project once. Groovy's servers and revenue are historical; Netflix's first-month reach and 2023 recognition belong together. Current counts need a real as-of date, not an invented live feed. No count-up animation. This improves attribution and reaches work sooner; the objection is repetition and hierarchy, not that stats are inherently forbidden “SaaS grammar.”

## Memorable detail: keep one project-to-case expansion

**Recommendation:** spend the homepage's detail budget on the existing Bento direction: the Hydra feature opens its substantive case, with image/title continuity from the clicked surface. Give the case a real /work/hydra URL; ordinary links must reach the same content. Reduced motion uses an immediate navigation or simple fade. Other work links stay quiet. This is a recommendation based on the brief's existing mechanism, not a claim that its current animation passed a behavior test.

This earns its place because it moves from proof to explanation. Do not add a slash-command playground for this pass: no real command/response demonstration was verified, and building one expands the task. Reject the palette for so few destinations, the live count without a verified feed, and the bio toggle because /story supplies depth. Dennis's cursor preview is recalled in the reports, not demonstrated here. Antfu's inline links are useful information styling, not a second spectacle. Theme switching and copy-email remain ordinary utilities; the weather card and variant dock go.

The year ruler can be /story's one detail, not the homepage's. **Observed:** the existing Story capture places “16M+” beside selected “2018.” The brief establishes Groovy's eventual reach before its 2021 shutdown, not that reach in 2018. Correct the temporal implication before reusing it: label the founding chapter as 2018 and the reach as achieved before shutdown, or associate the peak with its supported period. A timeline must clarify facts rather than animate them into a misleading date.

## Brittany Chiang: retain narrowly, rank sixth

Her dated evidence is useful and verified. The full sticky shell would introduce a second layout premise and spend too much width on identity. Borrowing row grammar does not imply copying her portfolio. Her own HTML reports 3k+ forks of v4; that supports recognizability concerns, not a verified “most-forked in the world” ranking or the claim that any borrowing looks junior. Keep her for evidence structure, not as a top-three visual baseline.

## Story: optional /story

Use its headline and closing invitation on the homepage. Keep the career chapters on /story, linked once near the human context. Do not insert the entire timeline mid-homepage or repeat the full CV beneath it. This serves peers interested in the founder arc while clients can inspect present work immediately. The current mobile Story capture also makes the large metric panel precede much of the narrative; that is another reason to keep it out of the hiring path.

# Page outline

1. **Introduction:** Oskar's name, Story's specific headline, Kufstein and a short sentence stating platform engineering/technical leadership as the engagement focus; primary Email me, quiet CV/copy links.
2. **Now, November 2026:** two sentences on the Rust rebuild and current contracts, with accurate ownership labels and no availability promise.
3. **Selected work:** Hydra as the single wide media feature and case expansion; compact Netflix and Groovy case links, plus a visible SoundCloud contribution/result row; metrics stay with each project and the Webby stays with Netflix.
4. **Beyond work:** brief BUNDjugend/Kufstein human context and one optional “Read my story” link, without another biography recap.
5. **Contact:** reuse “Have something to build?” with the email action and a short invitation to describe the project and timeline; a few social text links finish the document.

**Secondary routes:** retain /cv and its PDF; add substantive /work/hydra, /work/netflix and /work/groovy cases with context, personal ownership, one consequential decision, a real artifact and outcome; retain the career narrative as /story. SoundCloud has a homepage summary and external product link for this pass. No separate work index is needed for three cases.

**Explicitly absent from this pass:** /about alongside /story, /now, /uses, /workflow, a blog/notes index without articles, newsletter, guestbook, booking/intake app, services/pricing grid, public variant selector and a standalone contact page. This set does not commit Oskar to new writing, testimonials or live-data infrastructure.

# Confidence

**8/10.** High confidence in the single-column base, ownership labels, project-local evidence and optional Story. Lower confidence in the exact signature transition: only static states and the brief's description were available, so it still needs a real mobile/keyboard/reduced-motion behavior check during implementation. If it cannot improve the reading transition, ordinary navigation should replace it without changing this information architecture.

I would change the ranking if client feedback favored a chronological account, Oskar chose a substantially different engagement focus, or actual product media/case content proved too thin to support the Hydra feature. A working, accurately contextualized bot demonstration could eventually displace the transition as the memorable detail. More gallery votes, remembered motion or fame would not change this ruling.
