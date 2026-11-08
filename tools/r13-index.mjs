import { readdir, writeFile } from 'node:fs/promises';
import process from 'node:process';
const root = process.env.EVIDENCE_DIR;
if (!root) throw new Error('Set EVIDENCE_DIR');
const groups = [
  ['Chevron', 'chevron-options', ['A: After the title — shipped; keeps the cue next to the thing being opened and preserves the full description width.', 'B: At the right edge — more distant from short titles and tightens description wrapping at 390.']],
  ['Now', 'now-options', ['A: Separate paragraph — shipped; current work stays easy to find, with no project singled out by a link.', 'B: Integrated present-day milestone — compact overall, but gives the last rail entry much more text than its neighbours.']],
  ['Since 2018', 'since-options', ['A: Rail — shipped; a connected story with the least extra visual weight and room for the original copy at 390.', 'B: Letter tiles — adds project destinations and visual identity, but repeats Selected work and leaves less text width.', 'C: Proportional spacing — makes the four-year gap visible, but the blank stretch interrupts the compact reading rhythm.']],
  ['Period', 'period-options', ['A: Plain dates — shipped; instantly readable, with consistent “to” wording for both current and closed ranges, preserving February 2026.', 'B: Since — concise for current projects, with a conventional dash for the closed Netflix range.', 'C: Shared axis — makes durations comparable, but adds two lines and tiny marks for recent starts.']],
  ['Stack', 'stack-options', ['A: Text chips — shipped; equal visual weight, visible names and familiar styling from the CV, without tooltip or logo interpretation.', 'B: Icon and name — compact, optically scaled icons with visible names; still introduces varying logo silhouettes.', 'C: Framed icons — consistent frames with visible labels, but the frames dominate and five technologies wrap less evenly.']],
  ['Site button', 'button-options', ['A: Aligned with Next — shipped; one clear action row, wrapping naturally for the long Webby hostname at 390.', 'B: Separate rows — clear and comfortable, but leaves a conspicuous empty span opposite the site action.']],
];
const lines = ['# Round 13 options', '', 'All options are real rendered DOM/CSS treatments of the built Worker. Every treatment is captured at 1280 and 390, in light and dark, at 2× device scale. The evidence script reproduces the alternatives without shipping runtime variant switches. Option A shipped for each item.', ''];
for (const [title, folder, options] of groups) {
  lines.push(`## ${title}`, '');
  const files = (await readdir(`${root}/${folder}`)).filter(file => file.endsWith('.png')).sort();
  for (const option of options) {
    const letter = option[0];
    const links = files.filter(file => file.startsWith(`${letter}-`)).map(file => `[${file}](${folder}/${file})`).join(', ');
    lines.push(`- **${option}** Screenshots: ${links}`);
  }
  lines.push('');
}
lines.push('Top-bar separator comparisons are in `topbars/`; full-page finals are at this directory’s root. Hover details are in `crops/`. `review-*.jpg` contact sheets cover every final and option PNG.');
await writeFile(`${root}/OPTIONS.md`, lines.join('\n') + '\n');
