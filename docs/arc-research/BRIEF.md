# rxs.to portfolio research: shared brief

## Goal

Oskar Lang is rewriting his personal site, rxs.to, with UI Arc (uiarc.dev), a React component library built for a modern, clean, motion-powered look. Before the next build pass, we want to learn from the best developer portfolios. The research should establish what makes a developer portfolio beautiful and interactive, find the best real sites to take inspiration from, and later decide which Arc components earn a place on the site.

This research is the baseline for that next build pass. Be concrete and opinionated. "Nice typography" is useless. "A 15px Inter body on a 640px measure, with project rows that expand in place on hover" is useful.

## Who the site is for

Oskar is a software engineer and entrepreneur in Kufstein, Austria, self-employed since 2018. Facts the site can use:

- Co-founded Groovy, a Discord music bot. He wrote the original bot at 16. It reached 16M+ servers and $1M+ revenue before YouTube forced it offline in 2021.
- Co-owns Hydra (hydra.bot), a Discord bot on 6.1M servers, since 2020. He leads its 2026 rebuild in Rust.
- Engineer and project lead on the official SoundCloud Discord bot (667K servers) since 2021.
- Built the "Hey, Netflix" Discord bot for Netflix (2022 to 2023). It reached 150K+ servers in its first month and was a Webby Honoree in 2023.
- Current contract roles in 2026: Digital Office 24 (sole engineer of a customer platform), Finaure (tech lead, AI-first wealth management), Top.gg (frontend features, Electron app).
- Skills: TypeScript, Kotlin, Java, Python, Rust. Vue, Nuxt, React, Next.js. AWS, Terraform, Kubernetes, Cloudflare. Multi-agent AI development workflows.
- Volunteers on the camp leadership team of BUNDjugend Bayern.
- The site already serves a CV at /cv with a PDF.

Audiences, in order: potential clients and collaborators who want to hire him for contract work, peers in the Discord and developer community, and recruiters.

## Current state

A live preview with three Arc variants is at https://arc-lab-rxs-to.rxsto.workers.dev. The routes are `/lab/profile` (an editorial single column), `/lab/bento` (a grid with project cards that morph into articles), and `/lab/story` (a scroll-driven career timeline). `/` is an earlier variant. Oskar likes these "a fair bit already". The direction is a full Arc rewrite. Nothing from the old look needs preserving.

Arc's own design rules: sentence case, no em dashes, regular and medium font weights only, Geist and Inter, semantic color tokens with light and dark themes, motion that explains cause and effect, one primary action and one memorable detail per page, no decorative gradients or glows, a reduced-motion branch for every animation.

## Tools you can use

- rs01 is shared with about 30 agent sessions. Judge sites from their HTML (web fetch or curl) first. Run browser captures strictly one at a time, at most 6 in total, and never in a loop, with xargs, with `&` or in the background. shoot.mjs serializes itself under `flock /home/dev/.browser-test.lock nice -n 10`. Wrap any other browser run the same way, with at most 2 Playwright workers. Reuse existing captures in `research/shots/` before taking new ones.
- Screenshot a site with `node /tmp/claude-1001/-home-dev-worktrees-rxs-to-spike-arc/78aea7eb-ff6b-48c1-87f9-61ea89b0174e/scratchpad/research/shoot.mjs <url> <outDir>`. It writes desktop light, desktop dark and mobile captures (the first screen plus three scroll positions) and a `report.json` with title, status, fonts, background color, errors and approximate bytes (script bytes often read 0 because of chunked transfer, so ignore them). Look at the PNGs before you judge a site. A site you only remember is not evidence.
- Arc's full catalog of 381 components and blocks is at `/tmp/claude-1001/-home-dev-worktrees-rxs-to-spike-arc/78aea7eb-ff6b-48c1-87f9-61ea89b0174e/scratchpad/research/arc-catalog.tsv` (kind, id, tier, category, name, description, docs URL, markdown URL). Each item's public docs are in `research/arc-docs/<kind>-<id>.md`. Pro docs there contain no source, by design. Do not try to obtain Pro source.
- Use your web search or fetch tools to find sites. Galleries such as Awwwards, Godly, SiteInspire, Minimal Gallery, and lists of notable engineer portfolios are fine starting points, but verify each site yourself.

## Rules

- Inspect only. Do not change any file in the rxs.to repository or worktree. Write only inside the research folder named in your task.
- No secrets, tokens or credentials are needed. Do not log in anywhere.
- Every site you recommend must be live today, checked with shoot.mjs, and must belong to an individual developer, designer-engineer or small studio whose site is a personal portfolio. Exclude template marketplaces, dead links and parked domains.
- Label each claim as observed (you saw it in a capture or the page source), or recalled (from memory, unverified).
