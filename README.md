# SPP Accountability

This repository tracks quarterly reports for the **ENS Service Provider Program (SPP)**. It powers the accountability table on the [Anticapture](https://anticapture.com) platform — reports you submit here will automatically appear there.

## How it works

Each service provider has a folder named after their slug (e.g. `blockful/`). Inside, reports are organized by year and quarter. When you open a PR adding a report file, the Anticapture dashboard picks it up automatically after it's merged.

---

## Submitting a quarterly report

1. Navigate to your provider folder: `2025/your-slug/`
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

| Organization | Slug |
|---|---|
| Blockful | `blockful` |
| eth.limo | `eth-limo` |
| Ethereum Identity Foundation | `ethereum-identity-fnd` |
| JustaName | `justaname` |
| NameHash Labs | `namehash-labs` |
| Namespace | `namespace` |
| Unruggable | `unruggable` |
| ZK Email | `zk-email` |

---

## Contributing

All contributions are made via pull request. A maintainer will review and merge your PR. There are no automated checks — just make sure:

- Report files follow the `YEAR/your-slug/qN.md` path format
- Each report file contains a single markdown link to your published forum post
- Avatar files are placed in `avatars/` and named after your slug
