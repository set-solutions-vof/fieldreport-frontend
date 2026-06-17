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

CI installs the private design system from GitHub Packages. Add a repository secret:

| Secret | Value |
|--------|--------|
| `NODE_AUTH_TOKEN` | GitHub classic PAT with `read:packages` |

Alternatively, grant this repository access under the design-system package settings (**Package settings → Manage Actions access**). If that is configured, you can switch the workflow back to `secrets.GITHUB_TOKEN`.
