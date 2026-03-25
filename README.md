# SPP Accountability

This repository tracks quarterly reports for the **ENS Service Provider Program (SPP)**. It powers the accountability table on the [Anticapture](https://anticapture.com) platform — reports you submit here will automatically appear there.

## How it works

The `providers.json` file at the root of this repo is the **single source of truth** for all service provider metadata. It defines:

- **Programs** — which SPP terms exist and which quarters they cover
- **Providers** — name, website, proposal URL, budget, and stream duration per program

The Anticapture dashboard reads this file at runtime. When you update it via PR, changes appear on the dashboard automatically (within ~1 hour of merge).

Quarterly report files are organized by year, provider slug, and quarter. Each file contains a single markdown link to the published forum post.

---

## `providers.json` structure

```json
{
  "programs": {
    "SPP1": {
      "quarters": ["2025/Q1", "2025/Q2"]
    },
    "SPP2": {
      "year1Quarters": ["2025/Q3", "2025/Q4", "2026/Q1", "2026/Q2"],
      "year2Quarters": ["2026/Q3", "2026/Q4", "2027/Q1", "2027/Q2"]
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

| Field | Description |
|---|---|
| `quarters` | List of quarters for single-year programs (format: `"YYYY/QN"`) |
| `year1Quarters` | First-year quarters for multi-year programs |
| `year2Quarters` | Second-year quarters (only 2-year stream providers report in these) |

### Provider fields

| Field | Required | Description |
|---|---|---|
| `name` | Yes | Display name |
| `slug` | Yes | URL-safe identifier (used for folder names and avatars) |
| `website` | No | Organization website URL |
| `programs.{SPP}.proposalUrl` | No | Link to the forum proposal/application |
| `programs.{SPP}.budget` | Yes | Annual budget in USD |
| `programs.{SPP}.streamDuration` | No | `1` (default) or `2` years |

---

## Submitting a quarterly report

1. Navigate to your provider folder: `YEAR/your-slug/`
2. Create a file named after the quarter: `q1.md`, `q2.md`, `q3.md`, or `q4.md`
3. Inside the file, add a single markdown link pointing to your forum report:

```md
[Your Organization - Q1 2025 Report](https://discuss.ens.domains/t/your-report-link)
```

4. Open a pull request — that's it.

### Example

```
2025/
└── blockful/
    ├── q1.md
    ├── q2.md
    ├── q3.md
    └── q4.md
```

`2025/blockful/q1.md`
```md
[Blockful - Q1 2025 Report](https://discuss.ens.domains/t/blockful-q1-2025-report/20100)
```

---

## Registering as a new provider

If you've been selected for a new SPP term:

1. Add your entry to the `providers` array in `providers.json`
2. Add your avatar to `avatars/your-slug.svg` (or `.png`)
3. Open a pull request

---

## Updating your avatar

Your avatar is displayed on the Anticapture dashboard next to your organization name. To add or update it:

1. Add your image file to the `avatars/` folder at the root of this repo
2. Name it after your slug with any image extension: `your-slug.png`, `your-slug.svg`, etc.
3. Open a pull request

### Example

```
avatars/
├── blockful.svg
├── eth-limo.svg
└── ...
```

---

## Provider slugs

| Organization | Slug | Programs |
|---|---|---|
| Blockful | `blockful` | SPP1, SPP2 |
| eth.limo | `eth-limo` | SPP1, SPP2 |
| Ethereum Identity Foundation | `ethereum-identity-fnd` | SPP1, SPP2 |
| JustaName | `justaname` | SPP2 |
| NameHash Labs | `namehash-labs` | SPP1, SPP2 |
| Namespace | `namespace` | SPP1, SPP2 |
| Resolverworks | `resolverworks` | SPP1 |
| Unicorn.eth | `unicorn-eth` | SPP1 |
| Unruggable | `unruggable` | SPP1, SPP2 |
| Wildcard Labs | `wildcard-labs` | SPP1 |
| ZK Email | `zk-email` | SPP2 |

---

## Contributing

All contributions are made via pull request. A maintainer will review and merge your PR. There are no automated checks — just make sure:

- `providers.json` is valid JSON and follows the schema above
- Report files follow the `YEAR/your-slug/qN.md` path format
- Each report file contains a single markdown link to your published forum post
- Avatar files are placed in `avatars/` and named after your slug
