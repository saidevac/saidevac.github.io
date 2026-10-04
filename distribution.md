# Release distribution automation

How the release → post pipeline works and how to run it again.

## Components

| Piece | File | What it does |
|---|---|---|
| Source of truth | `releases.json` | Per-platform copy for all 5 apps (X, LinkedIn, Reddit, Show HN) |
| Kit generator | `tools/dist-kit.js` | Renders `releases.json` into paste-ready draft files |
| Release trigger | `.github/workflows/distribute.yml` | On release publish or manual run → builds kit + opens a GitHub Issue + artifact |
| HN reminder | `.github/workflows/showhn-reminder.yml` | Cron Tue/Thu 12:30 UTC (~8:30am ET) → reminder issue with titles |
| Search ping | `.github/workflows/indexnow.yml` | On HTML/sitemap pushes → submits URLs to IndexNow (Bing/Yandex/Naver/Seznam) |
| IndexNow key | `7e51769cc1373889001fe8a2d4cd0f4e.txt` | Must stay live at site root — do not delete |

The same kit (`releases.json` + `dist-kit.js` + `distribute.yml`) is
mirrored in the `svgmotion` repo, so tagging a product release there
generates a kit issue too.

## Run it

### Local (no GitHub needed)

```bash
node tools/dist-kit.js all --out dist-kit        # every app
node tools/dist-kit.js svgmotion --out dist-kit  # one app
# drafts land in dist-kit/<app>/{x,linkedin,reddit,showhn}.*
# dist-kit/ is gitignored — generated output only
```

### GitHub Actions — from terminal

```bash
gh workflow run distribute.yml -f app=all         # kit issue for all apps
gh workflow run distribute.yml -f app=svgmotion   # or one app
gh workflow run showhn-reminder.yml               # test the HN reminder
gh run list                                       # watch runs
gh issue list                                     # see kit issues
```

### GitHub Actions — browser

**Actions → "Distribute release kit" → Run workflow** → enter app slug
(`all`, `svgmotion`, `readon`, `yieldy`, `payoffturbo`, `keyhunt`) → run.
The kit issue appears under Issues in ~30s.

### Automatic triggers

- **Release published** — tag like `svgmotion-v2.1` auto-picks that app;
  any other tag builds the `all` kit
- **Push to main touching `*.html`/`sitemap.xml`/`releases.json`** —
  IndexNow submission runs ~90s later (waits for Pages deploy)
- **Tue + Thu 12:30 UTC** — Show HN reminder issue (skips if one is open)

## Optional pings

No secrets are required for the core flow (issues use `GITHUB_TOKEN`).
To also get a chat notification on release, add repo secrets
(Settings → Secrets and variables → Actions):

- `DISCORD_WEBHOOK` — a Discord channel webhook URL
- `TELEGRAM_TOKEN` + `TELEGRAM_CHAT_ID` — a bot token + chat id

The steps activate automatically when the secrets exist.

## Update the copy

Edit `releases.json` — `x_post`, `linkedin_post`, `reddit.body`,
`showhn.text` per app — then re-run the kit. Screenshot/icon paths are
repo-relative and get listed in each kit so you know what to attach.

## Posting rules baked in

- **X + LinkedIn**: paste from the kit, attach the listed screenshot
- **Reddit**: always manual (auto-posting gets flagged/shadowbanned).
  Best days Tue–Thu; suggested subs are in each draft
- **Show HN**: always manual (no submission API). Post the title, then
  immediately paste the prepared first comment
