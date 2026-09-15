# DEVIL KNOWLEDGE BASE

**Generated:** 2026-03-18 | **Commit:** 38518e34 | **Branch:** rozenmd/fix-preview

## OVERVIEW

Cloudflare's React component library (`devil-ui`). pnpm monorepo: component library (Base UI + Tailwind v4), Astro docs site, screenshot worker. ESM-only, Node 24+.

## STRUCTURE

```
devil/
├── packages/
│   ├── devil/                     # Component library → see packages/devil-ui/AGENTS.md
│   ├── devil-ui-docs/          # Astro docs site → see packages/devil-ui-docs/AGENTS.md
│   └── devil-ui-screenshot-worker/   # Visual regression Worker → see packages/devil-ui-screenshot-worker/AGENTS.md
├── ci/                           # CI/CD scripts → see ci/AGENTS.md
├── lint/                         # Custom oxlint rules (5 rules in package, 4 at root)
├── .changeset/                   # Changeset files
├── .github/workflows/            # 6 workflow YAMLs (release, pullrequest, preview, etc.)
└── .vite-hooks/                  # Git hooks (Vite+): pre-commit codegen+staged, pre-push changeset validation
```

## WHERE TO LOOK

| Task                 | Location                                         | Notes                                                    |
| -------------------- | ------------------------------------------------ | -------------------------------------------------------- |
| Component API        | `packages/devil-ui/ai/component-registry.{json,md}`  | Source of truth. Query with `jq` or CLI                  |
| Component source     | `packages/devil-ui/src/components/{name}/{name}.tsx` | Standard pattern                                         |
| Blocks (installable) | `packages/devil-ui/src/blocks/`                      | NOT library exports; installed via CLI                   |
| Semantic tokens      | `packages/devil-ui/src/styles/theme-devil.css`        | AUTO-GENERATED; edit `scripts/theme-generator/config.ts` |
| Custom lint rules    | `lint/` (4 rules) + `packages/devil-ui/lint/` (+1)   | Package copy adds `no-deprecated-props`                  |
| Demo examples        | `packages/devil-ui-docs/src/components/demos/` | Feed into registry codegen                               |
| CI scripts           | `ci/`                                            | Reporter system, versioning, deployment                  |

## CONVENTIONS

### Styling (CRITICAL)

- **ONLY semantic tokens**: `bg-devil-base`, `text-devil-default`, `border-devil-line`, `ring-devil-hairline`
- **NEVER raw Tailwind colors**: `bg-blue-500`, `text-gray-900` → fails lint
- **NEVER `dark:` variant**: dark mode automatic via `light-dark()` in CSS custom properties
- **Exceptions**: `bg-white`, `bg-black`, `text-white`, `text-black`, `transparent`
- **`cn()` utility**: Always compose classNames via `cn("base", conditional && "extra", className)`
- **Surface hierarchy**: `bg-devil-base` → `bg-devil-elevated` → `bg-devil-recessed`
- **Mode/theme**: `data-mode="light"|"dark"` + `data-theme="fedramp"` on parent element

### Portal stacking (CRITICAL)

- Devil floating components portal to `document.body`. Consumers should create an
  app-root stacking context with `isolation: isolate` (Tailwind:
  `className="isolate"`).
- Do **not** fix a popup that appears below consumer content by adding `z-index`
  to Devil popup components, targeting Base UI internal data attributes, or
  applying `isolation` to `<body>`.

### Components

- **Scaffold new**: `pnpm --filter @hellwrk/devil-ui new:component` (never create manually)
- **Registry first**: Always check `component-registry.json` before using/modifying a component
- See `packages/devil-ui/AGENTS.md` for component conventions (variants, forwardRef, displayName)

### Imports

- **No cross-package relative imports**: Use `devil-ui` not `../../devil-ui/src/...` (lint-enforced)
- **ESM-only**: `"type": "module"` throughout. No CJS.

### Changesets

- **Enforced for `packages/devil-ui/`**: Pre-push hook requires changeset for npm-published library
- **Optional for `devil-ui-docs`**: Version appears in `/api/version` endpoint (debugging) but nothing depends on it
- **Pre-push hook**: `.vite-hooks/pre-push` validates before push. Bypass: `git push --no-verify` (or `VITE_GIT_HOOKS=0`)
- **AI agents NEVER**: `pnpm version`, `pnpm release`, `pnpm publish:beta`, `pnpm release:production`

### Pull Request Descriptions

PR descriptions are validated by CI. Include this checklist at the end of your PR body:

```markdown
- Reviews
- [ ] bonk has reviewed the change
- [x] automated review not possible because: <your reason here>
- Tests
- [ ] Tests included/updated
- [ ] Automated tests not possible - manual testing has been completed as follows: <description>
- [x] Additional testing not necessary because: <your reason here>
```

Rules:

- Check ONE option in each section (Reviews and Tests)
- If providing a justification (`because:` or `as follows:`), text must follow on the same line
- Indentation is flexible — nested under headers is fine
- Skip validation entirely with the `skip-pr-description-validation` label

## ANTI-PATTERNS

| Pattern                        | Why                                                          | Instead                                     |
| ------------------------------ | ------------------------------------------------------------ | ------------------------------------------- |
| `bg-blue-500`, `text-gray-*`   | Breaks theming, fails lint                                   | `bg-devil-brand`, `text-devil-default`        |
| `dark:bg-black`                | Redundant; tokens auto-adapt                                 | Remove `dark:` prefix                       |
| Missing `displayName`          | Breaks React DevTools                                        | Set `.displayName` on forwardRef components |
| Manual component file creation | Misses vite/package.json/index updates                       | Use scaffolding tool                        |
| Editing auto-generated files   | `theme-devil.css`, `ai/schemas.ts`, `ai/component-registry.*` | Edit source configs, run codegen            |

## COMMANDS

```bash
# Cross-cutting
pnpm dev                                          # Docs dev server (localhost:4321)
pnpm lint                                         # oxlint + custom rules
pnpm typecheck                                    # TypeScript check all packages
pnpm changeset                                    # Create changeset (required for devil changes)

# Package-specific (see child AGENTS.md for full lists)
pnpm --filter @hellwrk/devil-ui build              # Build library
pnpm --filter @hellwrk/devil-ui test               # Vitest
pnpm --filter @hellwrk/devil-ui codegen:registry   # Regenerate component-registry
```

## BUILD PIPELINE

```
devil-ui-docs demos → dist/demo-metadata.json
                              ↓
devil codegen:registry → ai/component-registry.{json,md} + ai/schemas.ts
                              ↓
```

Cross-package dependency: registry codegen requires docs demo metadata. Run `codegen:demos` in docs before `codegen:registry` in devil.

## TOOLCHAIN

| Tool       | Version  | Notes                                                     |
| ---------- | -------- | --------------------------------------------------------- |
| Node       | ^24.12.0 | Engine constraint (`.node-version`)                       |
| pnpm       | ^12.3.4  | Workspace manager                                         |
| Vite+      | 0.3.1    | Unified toolchain (`vp` CLI): build, test, lint, fmt      |
| TypeScript | 5.9.2    | Via pnpm catalog                                          |
| Vite       | 8.x      | Bundled via vite-plus; library mode (devil), docs server   |
| Tailwind   | 4.1.17   | v4 with `light-dark()` tokens                             |
| Oxlint     | bundled  | Via `vp lint`; config in vite.config.ts + custom JS rules |
| Oxfmt      | bundled  | Via `vp fmt`; replaced Prettier                           |
| Vitest     | bundled  | Via `vp test`; happy-dom env, v8 coverage                 |
| Changesets | latest   | Version management                                        |
| Astro      | 7.x      | Docs framework                                            |

Lint/format/test config lives in `vite.config.ts` (root and per-package) — there
are no `.oxlintrc.json` / `.prettierrc` files. `vp check` runs format + lint.
The [global Vite+ CLI](https://viteplus.dev/) is optional but recommended for contributors: the binary ships with the local `vite-plus` dependency (`pnpm vp …`), and hooks resolve it from `node_modules/.bin`.

## SECURITY

- **NEVER commit** npm tokens or API keys
- `.env` files are gitignored
- `wrangler.jsonc` (screenshot Worker) contains Cloudflare account IDs (not secret but don't expose)

## NOTES

- `ai/component-registry.json`, `ai/component-registry.md` are auto-generated at build time and gitignored (shipped in npm package). `ai/schemas.ts` is a stub for fresh clones (full version generated during build)
- `src/primitives/` (40 files) are auto-generated Base UI re-exports
- Blocks in `src/blocks/` are NOT exported from package index; installed via CLI `devil add`
- `src/catalog/` is a runtime JSON-UI rendering module (separate concern from component library)
- Single linter: Oxlint via `vp lint` (custom devil JS rules + native jsx-a11y rules; type-aware + type-checked)
- `PLOP_INJECT_EXPORT` and `PLOP_INJECT_COMPONENT_ENTRY` markers in source for scaffolding
- GitHub Actions workflows live in `.github/workflows/`, including release, PR validation, previews, Bonk, and automatic PR reviews
