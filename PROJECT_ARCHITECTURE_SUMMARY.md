# Project Architecture Summary

## Technologies Used

- Frontend landing page generated from a Figma design.
- React application built with Vite.
- TypeScript-compatible Vite configuration (`vite.config.ts`).
- Tailwind CSS 4 through `@tailwindcss/vite`.
- UI libraries include Material UI, Radix UI and several React component helpers.
- Package workspace declared with pnpm, but no lockfile was found.

Reviewed: `README.md`, `package.json`, `vite.config.ts`, `pnpm-workspace.yaml`.

## Local Setup

Minimum local workflow:

```bash
npm i
npm run dev
```

This starts the Vite development server. The available scripts are only `dev`
and `build`; no deploy or remove script is declared in `package.json`.

To validate a production build locally without deploying:

```bash
npm run build
```

Reviewed: `README.md`, `package.json`.

## Environment & Secrets

- No `.env` file or `.env.example` file was found in the reviewed scope.
- Required environment variables: **Not confirmed**.
- External secrets: **Not confirmed**.
- SST/AWS stages or environments: **Not confirmed**; no SST configuration was
  found.

Do not add real credentials to the repository. If environment variables are
introduced, keep production values outside version control and document only
safe placeholders in an example file.

Reviewed: root configuration files and hidden environment-file names.

## Production Deployment

- The project can generate static production assets with `npm run build`
  (`vite build`).
- Hosting provider and production release procedure: **Not confirmed**.
- Automatic deploy on merge to `main`: **Not confirmed**.
- No `.github` directory or visible CI/CD or infrastructure configuration was
  found in the reviewed scope.

Production deployment may be configured outside this repository, for example
in a hosting platform. Before releasing, confirm the target environment, build
command, output directory, secrets and rollback procedure in that platform.

Reviewed: `package.json`, root files, `.github` presence, infrastructure and
deploy-related file names.

## Safety Notes

- **Do not run any production deployment command without explicit confirmation.**
- Do not change hosting settings, production variables or secrets without
  confirming the target environment.
- Do not assume merges to `main` are harmless: an external hosting integration
  could deploy automatically even though it is not visible in this repository.
- Do not add credentials or production values to committed files.
- No SST/AWS `deploy` or `remove` command is present in the reviewed files. If
  one is introduced later, verify the stage before running it locally.

## Open Questions

- Is an external platform connected to `main` for automatic production deploys?
- What hosting provider, production URL and rollback process are used?
- Are runtime environment variables configured outside the repository?
