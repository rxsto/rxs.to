import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import process from 'node:process';
const root = process.env.EVIDENCE_DIR;
if (!root) throw new Error('Set EVIDENCE_DIR');
const results = [];
for (const [command, folder] of [['e2e', 'e2e'], ['check:metadata', 'metadata'], ['check:cls', 'cls'], ['check:headers', 'headers']]) {
  const directory = `${root}/${folder}`;
  mkdirSync(directory, { recursive: true });
  const result = spawnSync('pnpm', [command], { env: { ...process.env, EVIDENCE_DIR: directory }, encoding: 'utf8' });
  writeFileSync(`${directory}/run.log`, result.stdout + result.stderr);
  results.push({ command, status: result.status });
  process.stdout.write(`${command}: ${result.status}\n`);
}
writeFileSync(`${root}/check-results.json`, JSON.stringify(results, null, 2));
if (results.some(result => result.status !== 0 && result.command !== 'check:headers')) process.exitCode = 1;
