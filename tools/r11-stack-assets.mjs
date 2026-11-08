import { mkdir, writeFile } from 'node:fs/promises';
/* global fetch */
const directory = 'public/stack';
const names = ['typescript', 'nuxtdotjs', 'kotlin', 'terraform', 'amazonaws', 'bun', 'hono', 'nextdotjs', 'vuedotjs', 'rust', 'kubernetes'];
await mkdir(directory, { recursive: true });
for (const name of names) {
  const url = `https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/${name}.svg`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url}: ${response.status}`);
  await writeFile(`${directory}/${name}.svg`, await response.text());
}
const license = await fetch('https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/LICENSE.md');
if (!license.ok) throw new Error('Missing icon licence');
await writeFile(`${directory}/LICENSE.md`, await license.text());
await writeFile(`${directory}/README.md`, `# Stack icons

Paths from [Simple Icons 11.15.0](https://github.com/simple-icons/simple-icons/tree/11.15.0/icons), distributed under [CC0-1.0](LICENSE.md). The SVGs are unmodified upstream assets; the site uses them as monochrome CSS masks. Product names and marks belong to their respective owners.

Files: ${names.join(', ')}.

Run node tools/r11-stack-assets.mjs to fetch the pinned sources again. Stack labels remain in the existing project data, including the Digital Office 24 stack derived from the CV. Unrecognised technology names remain plain text.
`);
