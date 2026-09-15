import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
// Type-only: erased at compile time, so the docs dev server never needs a
// built devil-ui package to load astro.config.
import type {
  ThemeConfig,
  TokenDefinition,
} from "@hellwrk/devil-ui/scripts/theme-generator/types";

const __dirname = dirname(fileURLToPath(import.meta.url));

const VIRTUAL_MODULE_ID = "virtual:kumo-colors";
const RESOLVED_VIRTUAL_MODULE_ID = "\0" + VIRTUAL_MODULE_ID;

type TokenType = "semantic" | "global" | "override";

type ColorToken = {
  name: string;
  light: string;
  dark: string;
  theme: string;
  tokenType: TokenType;
};

// Path to the source config.ts — used for dev-mode loading and HMR watching
const configFile = resolve(
  __dirname,
  "../../../devil-ui/scripts/theme-generator/config.ts",
);

/**
 * Convert theme config to ColorToken array for the virtual module.
 * Derives token data directly from config.ts (single source of truth).
 */
function getColorsFromConfig(
  THEME_CONFIG: ThemeConfig,
  AVAILABLE_THEMES: readonly string[],
): ColorToken[] {
  const colors: ColorToken[] = [];

  // Process text color tokens
  for (const [tokenName, def] of Object.entries(THEME_CONFIG.text)) {
    const typedDef = def as TokenDefinition;

    // Base devil theme (semantic tokens)
    if (typedDef.theme.devil) {
      colors.push({
        name: `--text-color-${tokenName}`,
        light: typedDef.theme.devil.light,
        dark: typedDef.theme.devil.dark,
        theme: "devil",
        tokenType: "semantic",
      });
    }

    // Theme overrides
    for (const themeName of AVAILABLE_THEMES) {
      if (themeName !== "devil" && typedDef.theme[themeName]) {
        const themeColors = typedDef.theme[themeName]!;
        colors.push({
          name: `--text-color-${tokenName}`,
          light: themeColors.light,
          dark: themeColors.dark,
          theme: themeName,
          tokenType: "override",
        });
      }
    }
  }

  // Process color tokens (bg, border, ring, etc.)
  for (const [tokenName, def] of Object.entries(THEME_CONFIG.color)) {
    const typedDef = def as TokenDefinition;

    // Base devil theme (semantic tokens)
    if (typedDef.theme.devil) {
      colors.push({
        name: `--color-${tokenName}`,
        light: typedDef.theme.devil.light,
        dark: typedDef.theme.devil.dark,
        theme: "devil",
        tokenType: "semantic",
      });
    }

    // Theme overrides
    for (const themeName of AVAILABLE_THEMES) {
      if (themeName !== "devil" && typedDef.theme[themeName]) {
        const themeColors = typedDef.theme[themeName]!;
        colors.push({
          name: `--color-${tokenName}`,
          light: themeColors.light,
          dark: themeColors.dark,
          theme: themeName,
          tokenType: "override",
        });
      }
    }
  }

  return colors;
}

/**
 * Resolve the color tokens from the built devil-ui package.
 *
 * Must be called from Node context (astro.config), not from inside a Vite
 * hook: a bare-specifier `import()` issued there is routed through Vite's
 * SSR module runner, which is already shut down when the build renders pages.
 */
export async function loadDevilColorsFromPackage(): Promise<ColorToken[]> {
  const mod = await import("@hellwrk/devil-ui/scripts/theme-generator/config");
  return getColorsFromConfig(mod.THEME_CONFIG, mod.AVAILABLE_THEMES);
}

/**
 * Vite plugin that provides color token data as a virtual module.
 * Uses config.ts as the single source of truth - no CSS parsing needed.
 *
 * In dev mode, uses Vite's ssrLoadModule to import the source .ts file
 * directly — changes to config.ts are reflected without rebuilding devil.
 * In production builds, imports the built package instead.
 *
 * @param options.dev - `true` only for `astro dev`. Callers pass the argv
 *   check rather than reading Vite's `config.command`: during `astro build`
 *   Astro still spins up an SSR Vite server in `serve` mode, and calling
 *   `ssrLoadModule` on it crashes the build once the runner closes.
 * @returns Astro/Vite compatible plugin
 */
export function devilColorsPlugin(
  options: { dev?: boolean; staticColors?: ColorToken[] } = {},
) {
  const isDevMode = options.dev === true;
  const staticColors = options.staticColors;
  // Reference to the Vite dev server (set during configureServer).
  let server: any = null;

  return {
    name: "vite-plugin-devil-colors",

    resolveId(id: string) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },

    async load(id: string) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        let colors: ColorToken[];

        if (isDevMode && server) {
          // Dev mode: load source .ts directly via Vite's module runner.
          // This always reads the latest file contents — no build needed.
          const mod = await server.ssrLoadModule(configFile);
          colors = getColorsFromConfig(mod.THEME_CONFIG, mod.AVAILABLE_THEMES);
        } else {
          // Production build: precomputed in astro.config (Node context).
          // Importing the package from inside this hook would be handled by
          // Vite's module runner, which is already closed at this point.
          colors = staticColors ?? [];
        }

        return `
export const devilColors = ${JSON.stringify(colors, null, 2)};
`;
      }
    },

    configureServer(devServer: any) {
      server = devServer;

      // Watch config file and trigger HMR when it changes
      server.watcher.add([configFile]);

      server.watcher.on("change", (file: string) => {
        if (file.endsWith("config.ts")) {
          // Invalidate the SSR module cache so next load() re-reads the file
          const mods = server.moduleGraph.getModulesByFile(configFile);
          if (mods) {
            for (const mod of mods) {
              server.moduleGraph.invalidateModule(mod);
            }
          }

          // Invalidate the virtual module so it regenerates
          const virtualMod = server.moduleGraph.getModuleById(
            RESOLVED_VIRTUAL_MODULE_ID,
          );
          if (virtualMod) {
            server.moduleGraph.invalidateModule(virtualMod);
            server.ws.send({ type: "full-reload" });
          }
        }
      });
    },
  };
}
