# rxs.to portfolio research (grok)

Screened about 60 live personal sites on 6 Nov 2026. Twenty were judged from `shoot.mjs` captures in `shots/grok/` (desktop light, desktop dark, mobile). The rest were judged from fetched HTML. No further captures were taken after the machine-wide browser limit. A claim is **observed** when it comes from a capture or from page source fetched this session, and **recalled** only when it is a memory I did not recheck.

Field, so the shortlist is not the five sites everyone names: Rauno Freiberg, Emil Kowalski, Paco Coursey, Lee Robinson, Brian Lovin, Jakub Krehel, Samuel Kraft, Henry Heffernan, Benji Taylor, Gavin Nelson, Shu Ding, Nanda Syahrasyad (nan.fyi), Maggie Appleton, Josh Comeau, Christopher Igweze, Jhey Tompkins, Lynn Fisher, Antoine Wodniack, Pedro Duarte, Chase McCoy, Vlad Moroz, Itay Dreyfus, Jacob (jacob.energy), Cormac Hayden, Anish Shobith, Chánh Đại, João Inácio (birobirobiro), Sasidharan, Glenn Hitchcock, Colm Tuite, Brent Jackson, Trys Mudford, Ethan Muller, Raf V., Delba de Oliveira, Max Stoiber, Guillermo Rauch, Karri Saarinen, Brittany Chiang, Maxime Heckel, Cassidy Williams, Adam Wathan, Jim Nielsen, Pavle Lucic, Ritesh Bucha, JB Eudeline, Mery Kaftar, Mariana Castilho (uilabs), Anmoldeep Singh, Arik Chakma, Benjamin Akar, Sanyam Punia, Harsh Singh (client-rendered shell, almost no HTML), Bruno Simon, Cassie Evans (the page is a retirement note), Josh Wootonn, Sam Selikoff, Linus Rogge, Mitul Shah, Dan Abramov (overreacted).

Cassie Evans is live and is not a portfolio anymore. Cormac Hayden and Linus Rogge are live and too thin to hire from. uilabs is a component lab. Those three are out of the shortlist on purpose.

## Principles

1. **A column near 640px, body near 16px, regular weight, one large name.** Observed. Emil’s page is a warm white column (`rgb(253, 253, 252)`, font reported as Sans, page height 1854, zero running animations) with “Today” and then projects. Paco, Jakub (Inter, `rgb(252, 252, 252)`), Benji (Inter, page height only 1020), Samuel Kraft (Inter), and Brian Lovin (Inter) do the same. The preview profile already matches this: Geist Variable for the name, Inter Variable for the body, background `lab(100 0 0)`.

2. **A project is a name plus one sentence.** Observed. Emil: “Sonner” / “An opinionated toast component for React.” Jakub adds a small icon and the same shape (“oklch.fyi” / “A guide to OKLCH colors”). Gavin Nelson drops the sentence and keeps the year (“Linear Search” / “2025”). That row is the right unit for Groovy, Hydra, SoundCloud, and the Netflix bot.

3. **The proof number sits in the sentence or in one band of four, then stops.** Observed. The preview’s `16M+`, `6.1M`, `667K`, and `$1M+` each have a two-line caption. That is enough. Chánh Đại’s HTML stacks “2.4K GitHub stars”, “1.5M+ downloads”, and “80K+ downloads” in the hero. Anish’s HTML adds “Open to full-time roles”, “Accepting side quests”, and “Will ship for ice cream” above the work. The number should be the work, not the decoration.

4. **One primary action. The rest are text.** Observed. Christopher Igweze gives three text links (“see the work / the experience / read the writing”) and a quiet “download the cv (pdf)”. Emil has no button. The profile variant gives Email me, Copy email, and Read my CV equal weight. For a client, one filled “Email me” is the action. Copy and CV can be text.

5. **One memorable detail, and it should be a fact about the person.** Observed. Lee Robinson puts a full-height illustration in Iowan Old Style next to the column, with a Default / Long control on the bio. The capture report counted 107 running animations, so the drawing is alive, not a flat PNG. Jhey Tompkins spends the detail on a signature and a live line, “50.5°F · 10:37” in Bedford. Lynn Fisher spends it on a contents page numbered I–VI, “v.XIX”, and a sun. The preview’s clock and “12° cloudy” is the right kind of fact. The bento variant then gives that clock its own card, which spends the budget twice.

6. **Role, place, and current work in the first three lines.** Observed. Jakub: “Jakub Krehel / Founding Design Engineer at Interfere”, then one sentence. Nelson: “Gavin Nelson / Designer at OpenAI”. Samuel: “Design Engineer at Raycast currently working on desktop app builder Glaze.” The profile variant repeats “Software engineer and entrepreneur” as the subtitle and again as the first words of the paragraph. The story variant’s line is the one to keep: “I build software for millions of Discord servers, and have since I was 16.”

7. **Every work row has a date. Writing is grouped by year.** Observed. Benji groups rows under 2026, 2025, and 2024, with `31/10` on the right and a single pink “New” on Stageshow. Lee’s posts are “How we teach AI models” / “July 2026”. Rauch’s HTML is a year list with view counts (“Pure UI” / “709,361”). The profile experience rows already have ranges (“Hydra, 2020 to now”) but they are closed accordions, so the date is the only fact on the row.

8. **A Today or Now paragraph, two sentences, dated.** Observed. Emil’s “Today” says he is taking a break and names Linear and Vercel. Paco’s “Now” is two sentences under the columns. Maggie’s nav has a Now item next to The Garden and About. Oskar’s now is the Hydra rebuild in Rust plus Digital Office 24, Finaure, and Top.gg. None of the three lab routes say what this month is.

9. **Show the product once, large, with a caption under it.** Observed. Samuel’s first project is a wide black still, then “Shape Calendar” and one paragraph. Chase McCoy puts a phone frame beside a paragraph about Era, under a stacked-paper intro set in martinaPlantijn and Inter. The bento variant has the right instinct (Hydra, SoundCloud, Groovy screenshots) and then shows three at once, cropped by the lab dock.

10. **Navigation is a few words, not a bar of modes.** Observed. Shu Ding’s left rail is “about, thoughts, projects, guestbook”. Igweze uses “work, experience, writing, principles, trajectory, about”. Lynn is a table of contents. The floating Profile / Bento / Story dock is lab chrome. A client should land on one page.

11. **Motion is a change of state you can name.** Observed. The story variant puts 2018–2026 on a ruler next to “16M+ servers”, so the number belongs to a year. I saw the control. I did not drag it. Lee’s Default / Long is a labeled state. Rauno’s page is a horizontal strip: a tick mark at the top, a yellow disc over the intro, then an orange disc beside the word “Craft”, with a plus cursor on the type (page height 6108). Henry Heffernan’s page is a black viewport (height 900) whose only control is START. That motion hides the work. Do not copy it.

12. **Dark mode is the same layout with the ink swapped.** Observed. The profile dark capture is the same column on `lab(6.2 0 0)`, with the dock icon changed to a moon. Jakub’s report goes from `rgb(252, 252, 252)` to `rgb(16, 16, 16)`. Paco goes from white to `rgb(26, 26, 26)`, with 7 animations running. Emil’s dark capture stayed `rgb(253, 253, 252)`. Wodniack stayed `rgb(244, 12, 63)`. Follow the preview, not those two.

13. **Contact is a sentence and an address, or one copy button.** Observed. Benji ends with email and a footer that read “6:33am in Los Angeles, California” in the capture. Jakub offers email, GitHub, and an ask link in the intro. The profile “Copy email” is the right interaction. Itay Dreyfus’s HTML adds “Book a call”. JB Eudeline’s HTML says he scopes and prices the engagement. A calendar link is the client version of Copy email. A guestbook (Shu’s nav, Anish’s HTML, Mitul Shah’s HTML) is a peer toy.

14. **Writing is a different list from the work.** Observed. Paco splits Building, Projects, and Writing into three columns. Lee puts a Notes topic index above a dated blog. Maggie splits Essays and Notes. nan.fyi is the whole homepage as an index of interactive posts (serif headlines, sans body, `rgb(237, 237, 237)`). Oskar has a CV and no notes. Peers and recruiters use the notes. Clients use the work.

## Archetypes

**Editorial column.** Emil, Paco, Benji, Jakub, Brian, Samuel, Nelson, Igweze, and, from HTML, Vlad Moroz, Glenn Hitchcock, Karri Saarinen, Max Stoiber, Mery Kaftar, Delba de Oliveira. Strength: a client can read it in a minute, and it matches Arc (sentence case, Geist and Inter, one action, almost no color). Fit: this should be the site. Oskar’s material is sentences and four numbers, not a campaign.

**Bento.** The lab bento. From HTML, Chánh Đại’s overview grid and birobirobiro’s tiles (projects, about, setup, shop, changelog, newsletter, a GitHub graph). Strength: stats and screenshots share the first screen. Weakness: every cell is a request. Fit: one stats band and one row of product stills inside the editorial page. Not the page itself.

**Scroll story.** The lab story. Rauno’s horizontal frames. From HTML, Sasidharan’s career as a chat log with timestamps (“Jun 14, 2019 at 9:30 AM”, then Aave, then Poseidon). Henry’s terminal is a story behind a gate. Strength: 2016 to 2026 is a real arc, and the story variant already has the best sentence on the site. Fit: one chapter on the homepage, the Groovy-to-Hydra line with the year ruler. The contracts can stay in a plain list.

**Playful or game-like.** Bruno Simon’s HTML tells you to drive (WASD, H to honk, Enter to interact, “I’m stuck” to teleport). Henry’s capture is a START screen. Wodniack’s capture is a red poster (`rgb(244, 12, 63)`, page height 21944) with “CREATIVE DEVELOPER” and a hire link. Jhey is a one-screen experiment index (height 900, 14 animations). Pedro Duarte’s capture sets PEDRO, RAYCAST, BARCELONA, and X in pills over blurred sentences, with “R0/15” in the corner. Lynn is a poster contents page. Strength: you remember it. Fit: poor as the homepage for someone selling contract work. A client who wants a CV should not have to find the brakes.

**Index or list.** nan.fyi, Nelson’s year list, Benji’s year log, Rauch’s view-count list, jacob.energy’s writing list, Anmoldeep Singh’s writing-plus-shortcuts page. Strength: recruiters and peers can scan. Fit: the lower half of the editorial page, under a short intro. Not a homepage by itself, or the work disappears.

## Shortlist

Scores are aesthetics, interaction, and relevance to Oskar, each out of 10. Relevance means “a client, a Discord peer, or a recruiter can use this pattern on rxs.to”, not “this is the most famous site”.

| URL | Owner | Archetype | One thing worth stealing | How it maps to Oskar | Shots | Aes | Int | Rel |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| https://emilkowal.ski | Emil Kowalski | Editorial column | Project row is a name and one sentence on a warm white column | Groovy, Hydra, SoundCloud, Netflix, then the three 2026 contracts, each one line | shots/grok/emil | 8 | 4 | 9 |
| https://leerob.io | Lee Robinson | Editorial column | Default / Long bio, a notes index, dated posts, one illustration | Short bio for clients, long bio for peers. Notes can be Hydra-in-Rust, Discord bots, multi-agent work | shots/grok/leerob | 9 | 7 | 8 |
| https://benji.org | Benji Taylor | Index, by year | Year groups, one pink “New”, a local-time footer | A log of shipped bots and contracts. “New” marks the Hydra rebuild | shots/grok/benji | 8 | 5 | 9 |
| https://samuelkraft.com | Samuel Kraft | Editorial with stills | One wide product image, then a title and a paragraph | The bento screenshots, but one at a time: Hydra, then SoundCloud, then Groovy | shots/grok/samuelkraft | 8 | 6 | 8 |
| https://paco.me | Paco Coursey | Editorial index | Three columns (Building, Projects, Writing) and a Now paragraph. Body is Sohne, headings Inter | Building = contract roles. Projects = bots. Writing = notes he does not have yet. Now = Rust rebuild | shots/grok/paco | 8 | 6 | 8 |
| https://jakub.kr | Jakub Krehel | Editorial list | Icon, name, one line. Role and company in the first line. Dark theme actually swaps (`rgb(16, 16, 16)`) | Four bots as four rows. First line: “Software engineer in Kufstein. Rebuilding Hydra in Rust.” | shots/grok/jakub | 8 | 4 | 8 |
| https://www.christopherigweze.com | Christopher Igweze | Display editorial | Huge lowercase name, one rust dot, JetBrains Mono body on `rgb(234, 231, 224)`, text links plus a CV | The story headline set this large, then “see the work” and the existing /cv | shots/grok/igweze | 8 | 3 | 8 |
| https://portfolio.chsmc.org | Chase McCoy | Case study | Stacked-paper intro, then a job with a phone and a paragraph of what he actually made | One deep case: the Netflix bot (150K servers, Webby) or the Hydra rebuild. Not seven equal jobs | shots/grok/chsmc | 8 | 5 | 7 |
| https://nelson.co | Gavin Nelson | Year index | Title and year only, after “Designer at OpenAI” | A 2018–2026 index when the sentences would repeat the stats band | shots/grok/nelson | 7 | 3 | 7 |
| https://brianlovin.com | Brian Lovin | Editorial | Writing listed above projects, avatar, almost no chrome | Peers hit a note first. Clients scroll one screen to the bots | shots/grok/brianlovin | 7 | 3 | 7 |
| https://rauno.me | Rauno Freiberg | Horizontal story | One frame at a time, one flat color, a tick strip, type so large it is the layout | A single chapter, not the site. The yellow disc is the memorable detail, used once | shots/grok/rauno | 9 | 8 | 5 |
| https://jhey.dev | Jhey Tompkins | Playful index | One screen: role line, a signature, a list of experiments, a live place-and-weather footer | Steal the footer fact (Kufstein, the clock he already has), not the grid or the signature | shots/grok/jhey | 8 | 8 | 5 |
| https://vladmoroz.com | Vlad Moroz | Prose case study | A job written as specific sentences (editor layout, theming, color picker), not a tag | The Hydra rebuild and Finaure, each a short case: what he owned, what shipped | html only | 8 | 3 | 8 |
| https://sasi.codes | Sasidharan | Chat log | Career as timestamped messages, one job per bubble | A lighter story than the year ruler. Easy to overdo. One or two bubbles, not the whole CV | html only | 7 | 5 | 6 |
| https://karrisaarinen.com | Karri Saarinen | Notes list | “Notes on building” as one-line beliefs, plus “I work on Linear” | Four lines on how he takes a contract: small team, one owner, what he will not build | html only | 8 | 2 | 7 |
| https://glenn.me | Glenn Hitchcock | Prose resume | One paragraph, years in brackets, the current thing first (“Today: … at Vakna”) | Replaces the chip tray. Poolside, Vercel, and Sketch are named in passing, which is the tone | html only | 8 | 2 | 7 |

## Interaction and motion moments

- **leerob.io.** A Default / Long control changes how much bio is on the page. The illustration beside it is animating (107 running animations in the capture report). Observed.
- **Lab story.** A year ruler from 2018 to 2026 sits next to a giant figure. At the captured scroll the selection is 2018 and the figure is `16M+` with the word “servers”. Observed the control. Not observed as a drag, because the capture does not move the pointer.
- **Lab profile.** “Copy email” is a button next to “Email me”. The dark capture swaps the page to near-black and the dock icon to a moon. Observed.
- **rauno.me.** Frames move sideways. The top of the viewport is a row of ticks. The first frame is a yellow circle over the intro. The next captured frame is an orange circle beside “Craft”. A plus sign sits on the letters. Observed.
- **jhey.dev.** The footer is a live status line: place, weather, time, and “NO RECENT GAME”. A drawn signature overlaps the experiment list. Red underlines mark phrases in the bio. Observed.
- **benji.org.** The newest row gets one pink “New”. Other rows do not. The footer prints the local time. Observed.
- **henryheffernan.com.** The whole viewport is black. A box says “Click start to begin” and offers START. Nothing else is on screen. Observed. This is the interaction to refuse.
- **ped.ro.** Four facts are outlined pills (PEDRO, RAYCAST, BARCELONA, X) and the surrounding sentences are blurred. A counter reads “R0/15”. Observed the frame. I did not confirm a hover, so I will not describe one.
- **lynnandtonic.com.** The first screen is a contents list, I through VI, and a sun icon under “v.XIX”. The dark capture turns the paper from `rgb(228, 226, 215)` to `rgb(17, 17, 17)`. Observed.
- **wodniack.dev.** The top band says “Available for freelance work → Hire me” next to a QR code. The field is flat red with a line portrait. Observed the first screen only. The page is 21944px tall.
- **chanhdai.com.** HTML contains a command palette labeled with ⌘K and Ctrl K, and the line “30° follows your cursor, click for a sound”. Observed in HTML, not in a capture.
- **anmoldeep.dev.** HTML lists shortcuts: Home `G H`, Writing `G W`, theme `T`, shortcuts `?`. Observed in HTML.
- **anishshobithps.com.** HTML has Theme and Sound toggles, Ctrl K, a guestbook, and “Drag the robot one station at a time”. Observed in HTML.
- **bruno-simon.com.** HTML is the control list: WASD or arrows to drive, H to honk, Enter to interact, L to mute, an “I’m stuck” teleport. Observed in HTML.
- **itaydreyfus.com.** HTML offers Grid and List as two views of the same projects, plus “Book a call”. Observed in HTML.
- **birobirobiro.dev.** HTML has a PT/EN switch, a GitHub contribution graph, a setup page, and a newsletter. Observed in HTML.
- **sasi.codes.** The career is the interaction: each job is a chat message with a clock time. Observed in HTML.

## Content ideas

Judged for the three audiences, in Oskar’s order: clients and collaborators, Discord and developer peers, recruiters.

- **A dated note, even two of them.** Lee, Paco, Brian, Benji, nan.fyi, Maggie, Karri’s notes, Rauch’s year list, and Jim Nielsen’s blog all treat writing as the proof that the person can explain a decision. Clients skim. Peers and recruiters stay. The missing pieces are a note on the Hydra Rust rebuild and a note on what the Netflix bot had to do in its first month. A blog grid is the wrong shape. Benji’s year list is the right shape.
- **A Now paragraph on the homepage, not a separate brand.** Emil and Paco already do this in two sentences. Maggie has a real Now destination. Oskar’s version is one paragraph: Hydra’s 2026 rebuild, and the three contracts with a single clause each. A /now page is optional and mostly for peers.
- **One case with an outcome, not seven job titles.** Vlad’s Paper section names the parts of the editor he built. Delba’s HTML lists Next.js Docs, Next.js Learn, and the diagram system as things she made. Mery Kaftar’s HTML gives Vercel, Hypermode, and Clerk each a responsibility. The lab’s experience rows hide that text behind a chevron. Open Hydra and the Netflix bot by default. Leave Top.gg and Digital Office 24 as one line each unless a client needs them.
- **A uses or setup page is optional and last.** Adam Wathan’s HTML points at a uses page. birobirobiro has Setup. Peers like it. Clients do not hire from a keyboard list. The lab’s skill chips already cover the recruiter version, and they are too prominent.
- **Live data only if the number is the work.** Weather and a clock are already on the lab and they are the weaker live fact. Jhey’s weather is charming because the site is an experiment index. A live Hydra or SoundCloud server count would mean more, and only if it cannot go stale or fake. A GitHub contribution graph (chanhdai, birobirobiro, bucharitesh) says “I commit”, which is a weak signal next to 6.1M servers.
- **One quote, if a client will say it.** uilabs shows a quote from Mariana Castilho. Pavle’s HTML names Toptal, Basecamp, Société Générale, and TomTom. Raf’s HTML names Walmart and Coinbase. Oskar’s Webby Honoree line is already in the bento and is the public version of a testimonial. A sentence from Digital Office 24, Finaure, or Top.gg would help the hiring audience more than another stat. Do not invent one.
- **Contact stays on the first screen.** Copy email is the peer and recruiter path. “Book a call” (Itay) is the client path, if he wants a calendar. Skip guestbooks.

## Anti-patterns

- **A gate in front of the work.** Henry’s capture is a START button and nothing else. Bruno’s HTML asks you to drive before you can read. Both prove craft to other creative developers. Both fail a client who has four minutes.
- **A poster instead of a page.** Wodniack’s first screen is a red field, a line portrait, and “CREATIVE DEVELOPER”, and the document is about 22,000px tall. The hire link is real. The CV is not readable. Pedro’s pills are beautiful and the sentences under them are illegible in the capture.
- **Availability slogans and metric confetti.** Anish: “Will ship for ice cream”, four status lines, a robot. Chánh Đại: “Creating with code. Small details matter.” plus star counts, a cursor angle, and a click-for-sound. Bucha repeats “Creating with code. Small details matter.” Pavle: “Companies hire me to ship AI products 2-3x faster.” The lab does not do this. It should not grow into it.
- **The tool tray as a personality.** Profile and bento both end in chips (TypeScript, Kotlin, Java, Python, Rust, AWS, Terraform, Kubernetes). Emil, Benji, Vlad, and Glenn name the work and let the tools appear inside a sentence. Recruiters can get the list from the CV.
- **Three equal buttons, and a dock on top of the content.** Profile gives Email, Copy email, and Read my CV the same shape. The lab switcher covers the `667K` cell in the profile fold and the project captions in the bento fold.
- **Dark mode that ignores the request.** Emil and Wodniack rendered the same background in the dark capture. Igweze stayed on paper `rgb(234, 231, 224)`.
- **A component gallery as a personal site.** uilabs is a set of toolbar experiments with a testimonial. It is a good motion reference and a bad model for rxs.to. Comeau’s homepage is a magazine (Wotfard, a 3D figure, category pills, “Popular content”). Useful if Oskar becomes a publisher. He is not one yet.
- **Thin on purpose, past the point of evidence.** Cormac Hayden’s HTML is a name, “FOUNDER, OASIS COMPANIES”, and a few links. Linus Rogge’s HTML is a name, “Design Engineer at SPACING”, and four social links. Restraint without a single shipped thing does not help a hire.

## Preview critique

All three routes are already in the family of the shortlist. They use Geist and Inter, a near-white page, a real dark theme, sentence-case copy, and the numbers that matter. That is ahead of the red posters and the START screens. Oskar liking them is justified. The gap is that the three variants split one good site into three partial ones, and a lab dock sits on top of all of them.

**Profile** is the closest to Emil, Paco, and Benji. One column, a portrait, email, four numbers, then selected work and experience. The bio repeats the subtitle. The experience rows are closed, so “Hydra, 2020 to now” never says that he leads the Rust rebuild. The skills tray is the weakest block on the page. The dock cuts through the stats.

**Bento** is the most complete first screen and the noisiest. The four numbers, the three product shots, the Webby card, “Working on now”, and the tool chips all compete. Samuel Kraft shows why the screenshots are worth keeping, and also why three at once is too many. The clock card is the memorable detail promoted into furniture. “Working on now” is the right content in the wrong box: it should be the Emil “Today” paragraph.

**Story** has the best writing and the only interaction that earns a place. The headline is specific. The year card ties `16M+` to 2018, which is the cause-and-effect motion Arc asks for. Under that, “The details” falls back to the same experience and skills tabs as profile, so the story stops. The page height is 2937, most of it a list the other variants already have.

**The three biggest gaps against the best sites**

1. **Nothing to read after the pitch.** Lee, Paco, Benji, Brian, Karri, and Vlad all have notes or a case written in sentences. The lab has a CV and collapsed rows. Peers and recruiters get no evidence that he can explain a technical decision. Clients get no evidence of what he did on Finaure or the Hydra rebuild beyond a title.
2. **The work is either hidden or cropped.** Emil and Jakub would give each bot a sentence. Samuel and Chase would give one bot a large still and a paragraph. The profile hides the paragraph in an accordion. The bento shows the stills three-up, under the dock. Neither variant does both.
3. **The memorable detail is split across three layouts and a switcher.** Lee, Jhey, and Lynn each spend it once. Here the clock, the theme button, the variant dock, and the `16M+` line share the first screen. Ship one page: the story headline, Emil’s rows, one Samuel still, Benji’s dates, and Copy email. Keep the year ruler as the single interaction.

## Top 5

1. **https://emilkowal.ski.** The column, the type size, and the project grammar Arc is already built for. Four bots and three contracts become a list a client can finish.
2. **https://leerob.io.** Shows how to add one memorable detail, a short-versus-long bio, and a notes index without leaving the editorial page.
3. **https://benji.org.** The career log. Dates, one “New”, almost no chrome. This is the shape of the lower half of rxs.to, and of any writing he adds later.
4. **https://samuelkraft.com.** Permission to use the Discord screenshots, one at a time, with a caption. That is the piece the bento almost gets right.
5. **https://paco.me.** The information architecture: Building, Projects, Writing, and a Now paragraph. It is the map for clients, peers, and recruiters on a single page.
