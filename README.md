# SPP Accountability

This repository is the **single source of truth** for quarterly reports and service provider metadata in the **ENS Service Provider Program (SPP)**. Any platform or interface can consume this data to display provider accountability information.

## Interfaces

The following platforms read from this repository:

| Platform | URL | What it shows |
|---|---|---|
| Anticapture | [anticapture.com](https://anticapture.com) | Accountability table with report status, budgets, and program links |

> If you build an interface that consumes this data, open a PR to add it here.

## How it works

The `providers.json` file at the root of this repo contains all service provider metadata. It defines:

- **Programs** — which SPP terms exist, which quarters they cover, and links to the governance proposal and vote
- **Providers** — name, website, proposal URL, budget, and stream duration per program

Quarterly report files are organized by year, provider slug, and quarter. Each file contains a single markdown link to the published forum post.

When you update data via PR, consuming interfaces pick up the changes automatically.

---

## `providers.json` structure

```json
{
  "programs": {
    "SPP1": {
      "quarters": ["2024/Q2", "2024/Q3", "2024/Q4", "2025/Q1", "2025/Q2"],
      "forumUrl": "https://discuss.ens.domains/t/...",
      "voteUrl": "https://www.tally.xyz/gov/ens/proposal/..."
    },
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

| Field | Description |
|---|---|
| `quarters` | List of quarters for single-year programs (format: `"YYYY/QN"`) |
| `year1Quarters` | First-year quarters for multi-year programs |
| `year2Quarters` | Second-year quarters (only 2-year stream providers report in these) |
| `forumUrl` | Link to the governance proposal forum post |
| `voteUrl` | Link to the on-chain vote (e.g., Tally) |

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

Avatars are displayed next to your organization name on consuming interfaces. To add or update:

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
