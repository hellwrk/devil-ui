<p align="center">
  <img src="https://raw.githubusercontent.com/hellwrk/devil-ui/main/packages/kumo-docs-astro/public/devil-ui-hd.png" alt="devil-ui" width="140" />
</p>

<h1 align="center">devil-ui</h1>

<p align="center">A themeable, accessible React component library built on Base UI and Tailwind v4.</p>

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
- Figma plugin

### Quick Start

```bash
pnpm install
pnpm dev                    # Start docs site at localhost:4321
pnpm --filter @hellwrk/devil-ui test
```

### Figma Plugin

```bash
# Optional: enable token sync during build
# cp packages/kumo-figma/scripts/.env.example packages/kumo-figma/scripts/.env
# $EDITOR packages/kumo-figma/scripts/.env  # set FIGMA_TOKEN (and optionally FIGMA_FILE_KEY)

pnpm --filter @cloudflare/kumo-figma build
# In Figma: Plugins > Development > Import plugin from manifest...
# Select: packages/kumo-figma/src/manifest.json
```

### Creating Components

```bash
pnpm --filter @hellwrk/devil-ui new-component
```

## Documentation

- **Live Docs**: [kumo-ui.com](https://kumo-ui.com)
- **AI/Agent Guide**: [AGENTS.md](./AGENTS.md)

## License

MIT
