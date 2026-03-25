# SPP Accountability

Single source of truth for the **ENS Service Provider Program (SPP)** — provider metadata, quarterly report links, and program definitions. All in one JSON file, validated by schema.

## Interfaces

| Platform | URL | What it shows |
|---|---|---|
| Anticapture | [anticapture.com](https://anticapture.com) | Accountability table with report status, budgets, and program links |

> Build an interface that reads this data? Open a PR to add it here.

---

## Data structure

```
spp-accountability/
├── providers.json            # All data (source of truth)
├── providers.schema.json     # JSON Schema for validation
├── validate.mjs              # Validation script (runs in CI)
└── avatars/
    └── {slug}.svg            # Provider logos
```

Everything lives in [`providers.json`](providers.json): programs, providers, budgets, and report URLs. No separate files per report.

### Programs

```json
{
  "programs": {
    "SPP2": {
      "year1Quarters": ["2025/Q3", "2025/Q4", "2026/Q1", "2026/Q2"],
      "year2Quarters": ["2026/Q3", "2026/Q4", "2027/Q1", "2027/Q2"],
      "forumUrl": "https://discuss.ens.domains/t/...",
      "voteUrl": "https://www.tally.xyz/gov/ens/proposal/..."
    }
  }
}
```

| Field | Required | Description |
|---|---|---|
| `year1Quarters` | Yes | Quarters all providers report in (`YYYY/QN`) |
| `year2Quarters` | No | Second-year quarters (only `streamDuration: 2` providers) |
| `forumUrl` | No | Governance proposal |
| `voteUrl` | No | On-chain vote |

### Providers

```json
{
  "providers": [
    {
      "name": "Your Organization",
      "slug": "your-slug",
      "website": "https://yoursite.com",
      "programs": {
        "SPP2": {
          "proposalUrl": "https://discuss.ens.domains/t/...",
          "budget": 400000,
          "streamDuration": 1
        }
      },
      "reports": {
        "2025/Q3": "https://discuss.ens.domains/t/your-q3-report"
      }
    }
  ]
}
```

| Field | Required | Description |
|---|---|---|
| `name` | Yes | Display name |
| `slug` | Yes | Lowercase kebab-case identifier (used for avatars) |
| `website` | No | Organization URL |
| `programs.{key}.proposalUrl` | No | Application/nomination for this program |
| `programs.{key}.budget` | Yes | Annual budget in USD |
| `programs.{key}.streamDuration` | Yes | `1` or `2` years |
| `reports.{YYYY/QN}` | — | URL to published forum report for that quarter |

---

## How to contribute

### Submit a quarterly report

1. Edit `providers.json`
2. Add your report URL to the `reports` object:
   ```json
   "reports": {
     "2025/Q3": "https://discuss.ens.domains/t/your-report-link"
   }
   ```
3. Open a pull request. CI validates the schema automatically.

### Register as a new provider

1. Add your entry to `providers` in `providers.json`
2. Add your avatar to `avatars/{your-slug}.svg`
3. Open a pull request

### Update your avatar

Replace or add `avatars/{your-slug}.svg` (SVG preferred).

---

## Validation

CI runs automatically on PRs that touch `providers.json`. To validate locally:

```bash
npm install ajv ajv-formats
node validate.mjs
```

The validator checks:
- JSON Schema conformance (types, required fields, patterns)
- Provider program keys reference defined programs
- Report quarter keys match program-defined quarters
- No duplicate provider slugs
- `streamDuration: 2` only used with programs that have `year2Quarters`
