# FieldReport Frontend

## Local Setup

Install dependencies:

```sh
npm install
```

Create local environment configuration:

```sh
cp .env.example .env.local
```

Set `NODE_AUTH_TOKEN` in `.env.local` to a GitHub classic PAT with the `read:packages` scope so npm can install `@set-solutions-vof/design-system` from GitHub Packages.

Run the development server:

```sh
npm run dev
```

## CI

CI authenticates to GitHub Packages with the workflow `GITHUB_TOKEN` (see `.github/workflows/ci.yml`).

If `npm ci` fails with **403 read_package**, grant this repository access on the design-system package: **Package settings → Manage Actions access → add `fieldreport-frontend`**.

For local development, set `NODE_AUTH_TOKEN` in `.env.local` to a classic PAT with `read:packages` (see `.env.example`).
