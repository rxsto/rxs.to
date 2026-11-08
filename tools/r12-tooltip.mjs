import { mkdir, writeFile } from 'node:fs/promises';
/* global fetch */
const response = await fetch('https://uiarc.dev/r/tooltip.json');
if (!response.ok) throw new Error(`Arc registry: ${response.status}`);
const item = await response.json();
if (item.meta.tier !== 'free') throw new Error('Only free Arc components are permitted');
await mkdir('components/arc/tooltip', { recursive: true });
for (const file of item.files) {
  const name = file.path.split('/').at(-1);
  await writeFile(`components/arc/tooltip/${name}`, file.content);
}
