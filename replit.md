# Batch NO.9 Café Website

A mobile-first website for Batch NO.9, a deli, coffee, and dessert cafe in Stanley, Alexandria.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/batch-no-9/` — public café website
- `attached_assets/` — supplied Batch NO.9 logo and photography

## Architecture decisions

- The site is informational; online ordering links directly to the supplied Talabat restaurant page.
- Do not invent an exact street address or opening hours; only Stanley, Alexandria is confirmed.

## Product

- Four public pages: Home, Menu, Beans, and Visit.
- Customer-facing copy should use clear, easy English.
- The menu displays prices in EGP and notes that prices exclude tax.

## User preferences

- All online-order actions should send visitors to the Talabat link in the website brief.

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
