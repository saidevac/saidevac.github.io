#!/usr/bin/env node
// dist-kit.js — generate a paste-ready distribution kit for an app
// Usage: node tools/dist-kit.js <app-slug|all> [--out dist-kit]
// Writes <out>/<slug>/{x,linkedin,reddit,showhn}.txt + a combined issue-body.md

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'releases.json'), 'utf8'));

const args = process.argv.slice(2);
const slug = args[0] && !args[0].startsWith('-') ? args[0] : 'all';
const outIdx = args.indexOf('--out');
const outDir = outIdx > -1 ? args[outIdx + 1] : path.join(root, 'dist-kit');

const slugs = slug === 'all' ? Object.keys(data.apps) : [slug];

const issueParts = [];
for (const s of slugs) {
  const app = data.apps[s];
  if (!app) { console.error(`unknown app: ${s}`); process.exit(1); }

  const dir = path.join(outDir, s);
  fs.mkdirSync(dir, { recursive: true });

  const write = (name, body) => fs.writeFileSync(path.join(dir, name), body.trim() + '\n');

  write('x.txt', `${app.x_post}\n\n[attach: ${app.shots[0]}]`);
  write('linkedin.txt', `${app.linkedin_post}\n\n[attach: ${app.shots[0] || app.icon}]`);
  if (app.reddit) {
    write('reddit.md',
`# ${app.name} — Reddit draft
**Suggested subs:** ${app.reddit.subs.map(x => 'r/' + x).join(', ')}

## Title options
${app.reddit.title_options.map((t, i) => `${i + 1}. ${t}`).join('\n')}

## Body
${app.reddit.body}

> Post manually — Reddit filters auto-posted content. Best days: Tue–Thu.
`);
  }
  if (app.showhn) {
    write('showhn.md',
`# ${app.name} — Show HN draft
**Post manually, Tue–Thu ~8–10am ET.**

## Title options
${app.showhn.title_options.map((t, i) => `${i + 1}. ${t}`).join('\n')}

## First comment (post immediately after submitting)
${app.showhn.text}
`);
  }

  issueParts.push(`## ${app.name}

- Site: ${app.url}${app.app_url ? `\n- App: ${app.app_url}` : ''}${app.play ? `\n- Play: ${app.play}` : ''}
- Press kit: ${app.press || '(none)'}
- Icon: \`${app.icon}\` · Screenshots: ${app.shots.map(x => '`' + x + '`').join(' ')}

### X / Twitter
\`\`\`
${app.x_post}
\`\`\`
Attach: \`${app.shots[0]}\`

### LinkedIn
\`\`\`
${app.linkedin_post}
\`\`\`
${app.reddit ? `### Reddit (post manually)
**Subs:** ${app.reddit.subs.map(x => 'r/' + x).join(', ')}
**Title:** ${app.reddit.title_options[0]}
<details><summary>Body</summary>

${app.reddit.body}
</details>` : ''}
${app.showhn ? `### Show HN (manual, Tue–Thu 8–10am ET)
**Title:** ${app.showhn.title_options[0]}
<details><summary>First comment</summary>

${app.showhn.text}
</details>` : ''}
`);
}

fs.writeFileSync(path.join(outDir, 'issue-body.md'),
`Distribution kit generated ${new Date().toISOString().slice(0, 10)}.

Every block below is paste-ready. Attach the listed images from the repo. Post Reddit/HN manually — automation gets flagged there.

---

${issueParts.join('\n---\n\n')}`);

console.log(`kit written to ${outDir} for: ${slugs.join(', ')}`);
