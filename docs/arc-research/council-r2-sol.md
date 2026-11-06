# Council round 2: Sol

Read in full: ROUND2.md, all three round-1 rulings, both complete Arc evaluations, and BRIEF.md. I also read the saved public docs for ruler-slider, card-to-article and toc-progress. Observed below means evidence in those documents; I did not independently rerun the evaluators' browser or repository checks. Design votes are recommendations. No new captures or live-site claims. This is the requested inspection-only council ruling, using the supplied brief rather than creating product documentation or running a separate interface audit.

## 1. Settled in round 1

**Accept all settled decisions.** Remove the stats band, weather, variant dock, skills wall, experience accordions and details tabs. Keep numbers attached to their projects with explicit periods; never imply that Groovy had 16M+ servers in 2018. Keep Hydra and Hey Netflix case studies and the stated exclusions on routes and features.

**Accept cutting Brittany.** This changes my round-1 vote: Opus's division of dated rows between Benji and Jakub persuades me that her narrow contribution no longer needs a separate reference. I still do not endorse the claim that borrowing any of her evidence structure necessarily looks junior; redundancy is sufficient reason to cut.

**Third case recommendation: Groovy**, for the original-at-16 founding decision, ownership and shutdown; SoundCloud keeps a visible, attributed homepage summary, while Oskar makes the final content call. Its shutdown image is historical evidence, not a substitute for a working-product screenshot.

## 2. Final inspiration set

**Accept the five; choose portfolio.chsmc.org for slot six.**

- Paco: reading measure, whitespace and prose contact.
- Jakub: compact name, role and outcome rows.
- Antfu: precise ownership labels and linked project names.
- Samuel Kraft: wide project media with readable captions underneath.
- Benji: the dated Now stamp and slim year index.
- Chase McCoy: case-study structure with personal ownership, decisions and captioned product evidence.

This changes my round-1 cuts of Benji and Chase. Benji earns a slot for the small index and dating discipline, without bringing back a full experience ledger on the homepage. Opus's description of Chase's ownership paragraph and decision-level captions answers an unmet need I reduced too narrowly to device framing in round 1. Borrow those relationships, not phone frames, a heavy page or a second visual system.

Muse's question-led engineering explanation is a good writing principle, but nan.fyi need not occupy the case-study slot to apply it. Chase is the closer structural reference for a client deciding what Oskar personally built. Emil's Now contribution is covered by Paco plus Benji. Lee stays out because I do not vote for the bio toggle.

## 3. Story placement

**Accept /story plus the slim five-line “Since 2018” homepage index.** This strengthens my round-1 /story position; Muse persuades me that five dated links give the narrative a more discoverable entrance than my single optional link. Each should reach its corresponding chapter on /story. Keep the full chapters there and full résumé detail on /cv.

Observed in the blocks evaluation: the existing pattern uses a nested 480 to 600px scroll viewport. That strengthens the case against embedding it in the homepage. Moving it to /story does not itself repair that behavior: the reading route should use ordinary page scrolling, with the ruler enhancing the chapters rather than enclosing them in a second scroll box. This is a condition on the component choice, not an objection to the route.

## 4. Memorable detail

**Rank: C > A > B. Yes, prototype C and A and compare them in a browser during the next build pass.** This round remains inspection only.

**C, first: Hydra media/title continuity into /work/hydra.** Keep my round-1 interaction intent, but explicitly reject card-to-article as its implementation. Observed in its public doc: it is a modal with trapped focus and locked page scroll; the doc directs independently addressable articles to normal page links. Use a real case-study link with a view transition as an enhancement where supported. Direct visits, ordinary navigation and reduced-motion navigation must reach the same page. Do not build a modal/URL synchronization layer to rescue the component.

C spends the detail on the client's path from artifact to ownership and decisions. The motion itself is not uniquely Oskar's. Its specificity comes from a real Hydra surface and his explanation of it; it must not be sold as a signature merely because a card moves.

**A, second: the year ruler.** Opus persuades me that the at-16 founding arc is the strongest personal subject among the three. The components evaluation also provides a plausible control whose docs explicitly leave vertical page scroll alone. That makes A worth a fair comparison. It does not prove the proposed month-by-month tape is appropriate for five chapters: months with no new event must not imply extra historical precision. Keep chapter dates and each metric's own period distinct.

For the homepage prototype, A should enhance the existing slim index, not add the full Story chapter or another metric panel. With C chosen, the ruler remains /story's detail. If A wins, avoid repeating the same showpiece on both pages; /story retains its chapters and quiet year navigation.

**B, third: reject for this pass.** Muse's audience-depth argument is valid, but /story and the case studies already supply that depth. Another short/long biography on the homepage repeats the narrative and asks clients to choose a reading mode before seeing the work. Neither tabs nor expandable-text makes that information architecture more necessary.

The comparison should settle discoverability, reading flow, touch/keyboard behavior and reduced motion using the same content and outline. It cannot establish whether Oskar identifies more with the founding story or present product work. My baseline vote stays C unless the comparison or Oskar's preference overturns it; this is not a request to ship both.

## 5. Arc shortlist

### Proposed use picks

| Item | Vote | Outcome-changing condition or reason |
| --- | --- | --- |
| text-reveal | Agree | Hero headline only, no delayed blank first screen and no entrance cascade below it. |
| card | Agree | Wide real media, caption outside the image, ordinary case-study link; no quick-look dialog. Match the clickable affordance to the actual link. |
| copy-button | Agree | Contact close, visible address and in-place confirmation. |
| badge | Agree | Restrict to Now dates and the Webby marker as proposed; ownership belongs in readable text. |
| theme-switch, rise | Agree | One quiet footer control with reduced motion. It is utility chrome. |
| toc-progress | Disagree with unconditional use; make conditional | Observed in its doc: skip below four headings. Use only for a genuinely substantial case, never lengthen a case to justify a TOC. Otherwise plain anchors or no TOC. |
| cta-section | Agree | Homepage close, honest copy and real mailto link; remove sample faces and marketing notes. Copy email can sit alongside without forking the block. |
| site-footer, minimal | Agree | Every route; newsletter and status off. |

### Proposed maybes

| Item | Vote | Decision for this baseline |
| --- | --- | --- |
| ruler-slider | Disagree with “only if 4A wins” as a global restriction | Conditional for the A homepage prototype, and still a candidate for /story's ruler when C wins. Its documented vertical-scroll behavior is preferable to the nested story viewport. Select time precision from actual content. |
| tabs | Agree with the dependency on B | B loses my vote, so omit from this pass. |
| expandable-text | Agree with the dependency on B | Same: omit. No second biography disclosure. |
| hover-card | Disagree; skip this pass | Visible summaries and linked media already provide the evidence. A new dependency and an unresolved tap-versus-navigation behavior buy little here. Keep direct project links. |
| avatar | Agree as optional | A plain image is sufficient; the component is not a required upgrade. |
| site-header | Agree as optional on case pages | Simple variant with a clear way home. No menu inventory for nonexistent routes; a plain back link may suffice. |
| scroll-story | Disagree with keeping the installed block as-is on /story | The nested viewport remains the wrong reading model there. Retain chapters and ruler through a page-scrolling composition; shortlist the block only if it can meet that requirement without a substantial fork. |
| line-replay | Agree as conditional | Real historical series and verified event dates only; user-started, no fabricated intermediate samples. Do not imply that an annotated event proves causation. |
| line-chart | Agree as conditional | Same evidence requirement. Choose it or line-replay for a given series, not both. A sentence is enough when only endpoint counts exist. |
| image-compare | Agree as conditional | Real comparable crops that explain a consequential change. |
| code-block | Agree as conditional | One relevant real excerpt when it explains the decision; check Rust rendering rather than assuming the highlighter supports it well. |
| lightbox-gallery | Agree as conditional | Only an actual screenshot set that benefits from enlargement; otherwise ordinary figures and captions. |
| time-dial | Disagree; skip this pass | It introduces a second contact interaction, working-hours content and DST handling without an established scheduling need. Quiet location/time text is sufficient. |
| testimonial-stage | Disagree with automatically promoting it when quotes exist | Real quotes are necessary, but do not by themselves justify a portrait/tab stage or a new homepage section. If relevant quotes are available, a static quotation inside an existing case is enough for this baseline. |

### Proposed drops and gaps

- **stats-band: agree.** Keep each metric once in its project context with its period.
- **card-to-article: agree, drop for these cases.** C is real navigation with optional continuity, not a reason to retain this Pro modal as a maybe.
- **in-view-title in heroes: agree, drop.** The hero use is contrary to its documented role. No need to add it to every lower heading either.
- **accordion for experience: agree, drop.** Keep the relevant dated evidence visible; /cv holds the full record.

**No missing Arc item needs promoting.** The outline needs semantic text rows for Now and SoundCloud, dated chapter anchors, case-study prose, figures/captions and a way home. Both evaluations largely recognize that these are composition, not additional blocks. The missing implementation capability for C is optional navigation continuity, which is not supplied by choosing card-to-article. Nothing here reopens a playground, palette, extra route, live-data service or new content section.

Score: **8/10** for the baseline with these votes applied. The outline and evidence hierarchy are ready for a build pass; the remaining uncertainty is the felt quality of C versus A, not missing scope.

Satisfied: **yes**.
