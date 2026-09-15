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

devil-ui provides accessible, design-system-compliant UI components built on [Base UI](https://base-ui.com/). It handles keyboard navigation, focus management, and ARIA attributes so you can build accessible applications without thinking through every detail.

## Installation

```bash
pnpm add @hellwrk/devil-ui
```

### Peer Dependencies

```bash
pnpm add react react-dom @phosphor-icons/react
```

## Usage

```tsx
import { Button, Input, Dialog } from "@hellwrk/devil-ui";
import "devil-ui/styles";
```

### Granular Imports (Tree-Shaking)

```tsx
import { Button } from "@hellwrk/devil-ui/components/button";
```

### Base UI Primitives

Devil re-exports all Base UI primitives for advanced use cases:

```tsx
import { Popover } from "@hellwrk/devil-ui/primitives/popover";
```

## CLI

Query component documentation from the command line:

```bash
npx @hellwrk/devil-ui ls          # List all components
npx @hellwrk/devil-ui doc Button  # Get component docs
npx @hellwrk/devil-ui docs        # Get all docs
```

## Development

See [AGENTS.md](./AGENTS.md) for comprehensive development documentation including:

- Component patterns and styling system
- Semantic color tokens
- Development workflows
- CI/CD pipeline

### Quick Start

```bash
pnpm install
pnpm dev                    # Start docs site at localhost:4321
pnpm --filter @hellwrk/devil-ui test
```


### Creating Components

```bash
pnpm --filter @hellwrk/devil-ui new-component
```

## Documentation

- **Live Docs**: [hellwrk.github.io/devil-ui](https://hellwrk.github.io/devil-ui)
- **AI/Agent Guide**: [AGENTS.md](./AGENTS.md)

## License

MIT
