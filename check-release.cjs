// リリース記録のずれを検出する。使い方: node check-release.cjs
const fs = require('fs');
const { RELEASES, APP_VERSION } = require('./release-notes.js');
const errs = [];

const hist = fs.readFileSync('VERSION_HISTORY.md', 'utf8');
const firstHeading = (hist.match(/^## Ver\.(\d+\.\d+\.\d+)/m) || [])[1];
if (firstHeading !== APP_VERSION) errs.push(`VERSION_HISTORY.md の先頭(${firstHeading})が release-notes.js の先頭(${APP_VERSION})と違います`);

for (const r of RELEASES) {
  if (!hist.includes(`## Ver.${r.version}`)) errs.push(`VERSION_HISTORY.md に Ver.${r.version} の節がありません`);
  for (const k of ['version', 'name', 'date', 'lead']) if (!r[k]) errs.push(`Ver.${r.version}: ${k} が空です`);
  if (!r.highlights || !r.highlights.length) errs.push(`Ver.${r.version}: highlights が空です`);
}
const vs = RELEASES.map(r => r.version);
if (new Set(vs).size !== vs.length) errs.push('バージョンが重複しています');

const html = fs.readFileSync('index.html', 'utf8');
if (/Ver\.\d+\.\d+\.\d+/.test(html)) errs.push('index.html にバージョン番号の直書きがあります（release-notes.js から引くこと）');
if (!html.includes('release-notes.js')) errs.push('index.html が release-notes.js を読んでいません');

const sw = fs.readFileSync('sw.js', 'utf8');
if (!sw.includes('release-notes.js')) errs.push('sw.js のオフライン用キャッシュに release-notes.js がありません');

if (errs.length) { console.error('NG\n- ' + errs.join('\n- ')); process.exit(1); }
console.log(`OK  Ver.${APP_VERSION}（${RELEASES.length}件の履歴）`);
