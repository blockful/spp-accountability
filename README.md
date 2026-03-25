# SPP Accountability

Single source of truth for quarterly reports and service provider metadata in the **ENS Service Provider Program (SPP)**. Any platform can consume this data to display provider accountability.

## Interfaces

| Platform | URL | What it shows |
|---|---|---|
| Anticapture | [anticapture.com](https://anticapture.com) | Accountability table with report status, budgets, and program links |

> Build an interface that consumes this data? Open a PR to add it here.

---

## Data structure

All metadata lives in [`providers.json`](providers.json), validated by [`providers.schema.json`](providers.schema.json).

```
spp-accountability/
├── providers.json              # Programs + provider metadata (source of truth)
├── providers.schema.json       # JSON Schema for validation
├── avatars/
│   └── {slug}.svg              # Provider logos
└── {year}/
    └── {slug}/
        └── q{1-4}.md           # Quarterly report links
```

### `providers.json`

```json
{
  "$schema": "./providers.schema.json",
  "programs": {
    "SPP2": {
      "year1Quarters": ["2025/Q3", "2025/Q4", "2026/Q1", "2026/Q2"],
      "year2Quarters": ["2026/Q3", "2026/Q4", "2027/Q1", "2027/Q2"],
      "forumUrl": "https://discuss.ens.domains/t/...",
      "voteUrl": "https://www.tally.xyz/gov/ens/proposal/..."
    }
  },
  "providers": [
    {
      "name": "Your Organization",
      "slug": "your-slug",
      "website": "https://yoursite.com",
      "programs": {
        "SPP2": {
          "proposalUrl": "https://discuss.ens.domains/t/your-proposal",
          "budget": 400000,
          "streamDuration": 1
        }
      }
    }
  ]
}
```

### Program fields

| Field | Required | Description |
|---|---|---|
| `year1Quarters` | Yes | Quarters all providers report in. Format: `"YYYY/QN"` |
| `year2Quarters` | No | Second-year quarters. Only `streamDuration: 2` providers report here |
| `forumUrl` | No | Governance proposal forum post |
| `voteUrl` | No | On-chain vote (e.g., Tally) |

### Provider fields

| Field | Required | Description |
|---|---|---|
| `name` | Yes | Display name |
| `slug` | Yes | Lowercase kebab-case identifier. Used for folders and avatars |
| `website` | No | Organization URL |
| `programs.{key}.proposalUrl` | No | Provider's application/nomination for this program |
| `programs.{key}.budget` | Yes | Annual budget in USD |
| `programs.{key}.streamDuration` | Yes | `1` or `2` years |

---

## How to contribute

### Submit a quarterly report

1. Create `{year}/{your-slug}/q{N}.md` with a single markdown link:

```md
[Your Organization - Q1 2025 Report](https://discuss.ens.domains/t/your-report-link)
```

2. Open a pull request.

### Register as a new provider

1. Add your entry to `providers` in `providers.json`
2. Add your avatar to `avatars/{your-slug}.svg`
3. Open a pull request

### Update your avatar

Add or replace your image in `avatars/` named `{your-slug}.{ext}` (SVG preferred).

---

## Validation

Validate `providers.json` locally against the schema:

```bash
npx ajv-cli validate -s providers.schema.json -d providers.json --spec=draft2020
```
