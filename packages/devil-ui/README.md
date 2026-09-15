<p align="center">
  <img src="https://raw.githubusercontent.com/hellwrk/devil-ui/main/packages/devil-ui-docs/public/devil-ui-hd.png" alt="devil-ui" width="140" />
</p>

<h1 align="center">devil-ui</h1>

<p align="center">A themeable, accessible React component library built on Base UI and Tailwind v4.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@hellwrk/devil-ui"><img src="https://img.shields.io/npm/v/@hellwrk/devil-ui?label=npm&labelColor=cc0000&color=0a0a0a" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@hellwrk/devil-ui"><img src="https://img.shields.io/npm/dm/@hellwrk/devil-ui?label=downloads&labelColor=cc0000&color=0a0a0a" alt="npm downloads per month" /></a>
  <a href="https://www.npmjs.com/package/@hellwrk/devil-ui"><img src="https://img.shields.io/npm/unpacked-size/@hellwrk/devil-ui?label=size&labelColor=cc0000&color=0a0a0a" alt="npm package size" /></a>
  <a href="https://github.com/hellwrk/devil-ui/actions/workflows/deploy-pages.yml"><img src="https://img.shields.io/github/actions/workflow/status/hellwrk/devil-ui/deploy-pages.yml?label=docs&labelColor=cc0000&color=0a0a0a" alt="docs deploy status" /></a>
</p>

## Installation

```bash
pnpm add @hellwrk/devil-ui
```

### Peer Dependencies

Devil requires the following peer dependencies:

```bash
pnpm add react react-dom @phosphor-icons/react
```

## Component Documentation

Devil includes a built-in CLI for quick component reference:

```bash
npx @hellwrk/devil-ui ls         # List all components
npx @hellwrk/devil-ui doc Button # Get component documentation
npx @hellwrk/devil-ui docs       # Get all component docs
```

The CLI reads from `ai/component-registry.json` (generated from TypeScript types + demo examples).

## Usage

### Import Components

```tsx
// Main package import
import { Button, Input, Surface } from "@hellwrk/devil-ui";

// Granular imports (recommended for tree-shaking)
import { Button } from "@hellwrk/devil-ui/components/button";
```

### Import Styles

#### For Tailwind CSS Users

**Important:** Tailwind CSS v4 does not scan `node_modules/` by default. You must add a `@source` directive so Tailwind can discover the utility classes used by Devil components. Without this, components may render with missing styles (e.g. Dialogs not centered).

In your main CSS file (e.g. `app.css`):

```css
@source "../node_modules/@hellwrk/devil-ui/dist/**/*.{js,jsx,ts,tsx}";
@import "@hellwrk/devil-ui/styles/tailwind";
@import "tailwindcss";
```

> **Import order matters** — `@hellwrk/devil-ui/styles` must come **before** `@import "tailwindcss"` so Devil's `@theme` tokens are registered first.

> **Note:** The `@source` path is relative to your CSS file. Adjust it based on your project structure — e.g. if your CSS is in `src/styles/`, you may need `../../node_modules/@hellwrk/devil-ui/dist/**/*.{js,jsx,ts,tsx}`.

Alternatively, you can use the default style export (`@hellwrk/devil-ui/styles`) which is equivalent to `styles/tailwind`.

If you are **not** using Tailwind CSS, use the standalone build instead (see below) — no `@source` directive is needed.

#### For Non-Tailwind Users (Standalone)

```js
import "@hellwrk/devil-ui/styles/standalone";
```

This imports a fully compiled CSS file with all Tailwind utilities and Devil styles pre-compiled. No Tailwind configuration needed!

**What's included in standalone:**

- All Tailwind utility classes used by Devil components
- Devil component styles
- Dark mode support (via `data-mode="dark"` attribute)
- All animations and keyframes
- Responsive utilities

**Note:** The standalone CSS is minified and optimized, but will be larger than the Tailwind version since it includes all utilities.

### Base UI Primitives

Devil bundles [Base UI](https://base-ui.com) and re-exports all primitives for advanced use cases:

```tsx
// Barrel import - imports all primitives (convenient but larger bundle)
import { Popover, Slider, Accordion } from "@hellwrk/devil-ui/primitives";

// Granular imports - tree-shakeable, smaller bundles (recommended)
import { Popover } from "@hellwrk/devil-ui/primitives/popover";
import { Slider } from "@hellwrk/devil-ui/primitives/slider";
import { Accordion } from "@hellwrk/devil-ui/primitives/accordion";
```

> **Note:** Prefer styled Devil components when available. Primitives are for custom components not yet in Devil or cases requiring fine-grained control.
>
> **Performance tip:** Use granular imports (`devil-ui/primitives/{name}`) for better tree-shaking and smaller bundle sizes.

#### Updating Primitives

Primitive exports are automatically generated from Base UI. After upgrading `@base-ui/react`:

```bash
# Regenerate primitive files to sync with new Base UI version
pnpm build:primitives

# Review changes (new/removed primitives)
git diff src/primitives/

# Commit if primitives changed
git add src/primitives/ package.json
git commit -m "chore: update primitives for base-ui@x.x.x"
```

The `build:primitives` script:

- Generates individual primitive files in `src/primitives/*.ts`
- Updates barrel export in `src/primitives/index.ts`
- Updates `package.json` with granular export paths
- Runs automatically before every build via the `prebuild` script

#### Validating Build Output

After building, validate the primitives output:

```bash
# Run post-build validation (checks dist/ structure)
pnpm validate:build
```

This validates:

- All primitive JS files exist in `dist/primitives/`
- All type definitions exist in `dist/src/primitives/`
- Base UI is bundled (not externalized)
- Import paths reference bundled modules
- Source maps are present

## Development

**For comprehensive contributor documentation, see [AGENTS.md](../../AGENTS.md).**

### Creating New Components

Use the scaffolding tool to quickly create new components with all required files and configurations:

```bash
# Create a new component
pnpm new-component

# Or use the shorthand
pnpm new
```

**What it creates:**

- Component file: `src/components/{name}/{name}.tsx`
- Index file: `src/components/{name}/index.ts`
- Test file: `src/components/{name}/{name}.test.tsx`

**What it updates:**

- `src/index.ts` - Adds component export
- `vite.config.ts` - Adds build entry
- `package.json` - Adds export configuration

**Example:**

```bash
? Component name: Alert Banner

✅ Component scaffolded successfully!

📁 Files created:
   - src/components/alert-banner/alert-banner.tsx
   - src/components/alert-banner/index.ts
   - src/components/alert-banner/alert-banner.test.tsx
```

The scaffolding tool handles naming automatically - input any format (spaces, PascalCase, kebab-case) and it will convert appropriately.

### Creating New Blocks

Blocks are higher-level components that compose multiple base components to create common page patterns. Use the block scaffolding tool:

```bash
# Create a new block
pnpm new-block
```

**What it creates:**

- Block file: `src/blocks/{name}/{name}.tsx`
- Index file: `src/blocks/{name}/index.ts`
- Test file: `src/blocks/{name}/{name}.test.tsx`

**What it updates:**

- `src/index.ts` - Adds block export
- `vite.config.ts` - Adds build entry
- `package.json` - Adds export configuration

Blocks are higher-level components that compose multiple base components. See [AGENTS.md](../../AGENTS.md) for detailed documentation on blocks.

### Development Workflows

#### Watch Build Mode

To test components in the actual documentation site or consuming application:

**Start watch build:**

```bash
pnpm dev
```

This runs Vite in watch mode with optimizations for fast rebuilds:

- ⚡~400ms rebuild time (10x faster than production builds)
- Skips minification in development
- Incremental TypeScript compilation
- Selective file watching (ignores tests)
- Validates components against production build output

**Using with documentation site:**

Terminal 1 (this directory):

```bash
pnpm dev
```

Terminal 2 (from workspace root or devil-docs):

```bash
cd ../devil-ui-docs
pnpm dev
```

When you edit a component:

1. Devil rebuilds automatically (~400ms)
2. Refresh browser to see changes in docs site
3. Changes are validated against the actual build output

**Build modes:**

- `pnpm dev` - Development mode (fast, optimized for iteration)
- `pnpm build` - Production mode (full optimization, minification, CSS processing)

### Testing

The package includes comprehensive import validation tests that ensure all components are properly exported and consumable.

**Run tests:**

```bash
# Watch mode
pnpm test

# Single run
pnpm test:run

# With UI
pnpm test:ui

# With coverage
pnpm test:coverage
```

**What's tested:**

- All components importable from main entry: `import { Component } from "@hellwrk/devil-ui"`
- All components importable via deep imports: `import { Component } from "@hellwrk/devil-ui/components/component-name"`
- All blocks importable from main entry: `import { Block } from "@hellwrk/devil-ui"`
- All blocks importable via deep imports: `import { Block } from "@hellwrk/devil-ui/blocks/block-name"`
- Package.json exports sync with actual components and blocks
- Export paths and formats are correct
- Build configuration consistency

**Zero maintenance:** Tests automatically discover components and blocks from the filesystem and validate against package.json. When adding new items, tests will fail with exact code snippets to fix configuration.

## Beta Releases

Beta releases allow you to test changes before publishing to production. Beta versions are automatically created for pull requests and include the commit hash for identification.

### Automated Beta Releases

Beta releases are automatically triggered for pull requests through GitHub Actions (`.github/workflows/package-preview-pr.yml`):

**Workflow Configuration:**

- **Workflow**: `package-preview-pr.yml`
- **Triggers**: Pull requests with changes to `packages/devil-ui/**` or `.changeset/**`
- **Dependencies**: Requires changeset to exist for `devil-ui`

**Process Flow:**

1. **Validate**: Ensures changeset exists for `devil-ui`
2. **Version**: Runs `pnpm run version:beta`
   - Consumes pending changesets
   - Appends `-beta.{commit-hash}` to version number
3. **Build**: Runs `pnpm --filter @hellwrk/devil-ui build`
4. **Publish**: Publishes to npm with `beta` tag
5. **Notify**: Posts PR comment with installation instructions

**Secrets Required:**

- `NPM_TOKEN`: Authentication for npm registry
- `GITHUB_TOKEN`: For posting PR comments (built-in)

### Beta Version Format

Beta versions follow this pattern:

```
{base-version}-beta.{commit-hash}
```

For example: `0.1.0-beta.a1b2c3d`

### Installing Beta Versions

When a beta is published, the PR will include a comment with installation instructions:

```bash
# Install the specific beta version
npm install @hellwrk/devil-ui@0.1.0-beta.a1b2c3d

# Or with pnpm
pnpm add @hellwrk/devil-ui@0.1.0-beta.a1b2c3d
```

### Testing Beta Releases

1. **Create PR**: Submit your changes with a changeset
2. **Wait for Beta**: The beta job runs automatically after changeset validation passes
3. **Install Beta**: Use the version from the PR comment
4. **Test Changes**: Verify functionality in your project
5. **Merge**: Once tested, merge the PR for production release

### Changeset Validation

All pull requests with changes to `packages/devil-ui/` must include a changeset:

```bash
# Create a changeset
pnpm changeset
```

- Select `devil-ui` when prompted
- Choose the type of change: `patch`, `minor`, or `major`
- Write a clear description of what changed

The CI will automatically validate that a changeset exists before allowing beta publication.

## Production Releases

This package uses [Changesets](https://github.com/changesets/changesets) for version management and automated releases.

### Creating a Release

1. **Check for existing changesets**:

   ```bash
   # List any pending changesets
   ls .changeset/*.md 2>/dev/null | grep -v "README\|USAGE" || echo "No pending changesets"
   ```

2. **Create a changeset** for your changes (if necessary):

   ```bash
   pnpm changeset
   ```

   - Select `devil-ui` from the list
   - Select the type of change: `patch`, `minor`, or `major`
   - Write a clear description of what changed
   - This creates a `.changeset/*.md` file describing the change

### Release Workflow

1. **Development**: Make changes to components or blocks
2. **Changeset**: Create changeset describing the changes
3. **Review**: Submit PR with changes and changeset
4. **Beta Test**: Test the beta version published to the PR
5. **Merge**: Merge PR to main branch
6. **Release**: Run the production release process

### Production Release Process

To publish a production release:

```bash
# 1. Ensure you're on main branch with latest changes
git checkout main
git pull

# 2. Version all packages (consumes changesets)
pnpm version

# 3. Build all packages
pnpm build:all

# 4. Publish to npm
pnpm release
```

This will:

- Update `package.json` with new version
- Generate/update `CHANGELOG.md`
- Remove consumed changeset files
- Publish to npm registry
- Create git tags

### Post-Release

After publishing:

1. **Commit version changes**:

   ```bash
   git add .
   git commit -m "chore: release devil-ui@{version}"
   git push
   ```

2. **Push tags**:

   ```bash
   git push --tags
   ```

3. **Verify publication**:
   ```bash
   npm view devil-ui versions
   ```

### Semantic Versioning

Follow semantic versioning guidelines:

- **Patch** (`0.0.1`): Bug fixes, small component updates, style tweaks
- **Minor** (`0.1.0`): New components, new features, backwards-compatible changes
- **Major** (`1.0.0`): Breaking changes, removed components, API changes

### Release Notes

Changesets automatically generate:

- Updated `package.json` version
- `CHANGELOG.md` with release notes
- Git tags for each release

The changelog includes all changeset descriptions, providing clear documentation of what changed in each release.

## Troubleshooting

### Common Issues

**Changeset Validation Failed**

If the CI fails with a changeset validation error:

1. **Check if changeset exists**: Run `ls .changeset/*.md` to see pending changesets
2. **Create changeset**: Run `pnpm changeset` and select `devil-ui`
3. **Verify changeset targets correct package**: Open the changeset file and ensure it includes `devil-ui`
4. **Commit changeset**: Add and commit the changeset file to your branch

**Beta Publication Failed**

If the beta release job fails:

1. **Check build**: Ensure `pnpm build` succeeds locally
2. **Check npm token**: Verify npm authentication is configured in CI
3. **Check version format**: Ensure version follows semver format
4. **Review CI logs**: Check GitHub Actions logs for specific error messages

**Import Errors After Release**

If consumers report import errors:

1. **Verify exports**: Check `package.json` exports match actual files
2. **Run tests**: Ensure `pnpm test:run` passes
3. **Check build output**: Verify `dist/` contains expected files
4. **Test locally**: Use `npm link` to test package locally before publishing
