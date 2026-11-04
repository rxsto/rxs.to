# rxs.to

Oskar Lang's portfolio, ported from `w2` commit `41842b9fb9995d584424562216edb565f35e176b` to vinext and Cloudflare Workers. The source branch is `experiment/portfolio-ideas`. This repository's previous 2024 site remains on the remote `v6` branch.

## Run locally

Use Node 22.12 or newer and pnpm. From the repository root:

```sh
pnpm install --frozen-lockfile
cp .env.example .dev.vars
open -e .dev.vars
```

Set `OPEN_WEATHER_API_KEY` to the existing `w2` OpenWeather key, save the file, then start the app:

```sh
pnpm dev
```

For the production Worker runtime, run:

```sh
pnpm build
pnpm preview --env-file .dev.vars
```

KV stays local during development and preview. Both use `.wrangler/state`. Without a cached value or API key, `/api/weather` returns 502 and the footer shows only the copyright line.

## Check the port

```sh
pnpm build
pnpm typecheck
pnpm lint
pnpm test
```

`tools/compare.ts` compares a running Nuxt baseline on port 4300 with the built Worker on port 4301. It saves six screenshot pairs and browser results in the gitignored `.compare/` directory. Weather is fixed to `Kufstein, 18° clear` in both browsers for these captures. The live API is checked separately.

With those servers running:

```sh
pnpm exec playwright install chromium
pnpm compare
```

Set `BASELINE_URL` and `TARGET_URL` to use other ports. The comparison checks desktop and phone layouts, light and dark themes, keyboard focus, reduced motion, metadata, structured data, link targets, browser errors, and overflow.

## Deploy the new Worker

Use the Cloudflare account containing `w2` and KV namespace `0e441d7fec3e4b848dbf6937e263f450`. The new Worker is `rxs-to`. Its configuration enables `workers_dev` and declares no routes or custom domains.

Authenticate from the repository root:

```sh
pnpm exec wrangler login
```

After authentication completes, run:

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm typecheck
pnpm lint
pnpm test
pnpm run deploy
```

This builds and deploys `rxs-to` through vinext's Cloudflare command using `dist/server/wrangler.json`. It does not move the domain or update `w2`.

Set the new Worker's weather secret. The command waits for the existing `w2` OpenWeather key:

```sh
pnpm exec wrangler secret put OPEN_WEATHER_API_KEY --name rxs-to
```

Check the workers.dev URL printed by deployment, including `/api/weather`, `/robots.txt`, and `/sitemap.xml`. Move `rxs.to` to the new Worker only after those checks pass. Canonical and social URLs deliberately remain `https://rxs.to/` on workers.dev previews.

The existing `KV` namespace is reused without migration. Weather uses the same `weather` key, JSON value, and 3600-second TTL. The key is configured as a server secret instead of retaining the source's checked-in default credential.

See [PORT.md](PORT.md) for the component mapping, verification evidence, and remaining differences.
