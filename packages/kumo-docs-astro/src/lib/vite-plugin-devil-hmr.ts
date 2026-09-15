import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Resolve once — points at the sibling devil package root
const devilRoot = resolve(__dirname, "../../../devil-ui");
const devilSrc = resolve(devilRoot, "src");

/**
 * Map every `devil-ui` sub-path export to its source equivalent.
 *
 * In dev mode Vite will resolve these to the raw .ts/.tsx source files,
 * which means file-watcher-based HMR works instantly — no rebuild of
 * the devil package required.
 *
 * In production builds (astro build) this plugin is NOT loaded, so the
 * normal package.json `exports` field is used (dist/), which validates
 * the real consumer experience.
 */
const aliases: Record<string, string> = {
  // Main barrel — resolves to source index.ts
  "@hellwrk/devil-ui": resolve(devilSrc, "index.ts"),

  // CSS styles — resolve to source CSS
  "devil-ui/styles/tailwind": resolve(devilSrc, "styles/devil.css"),
  "devil-ui/styles/standalone": resolve(
    devilSrc,
    "styles/devil-standalone.css",
  ),
  "devil-ui/styles": resolve(devilSrc, "styles/devil.css"),

  // JSON registry — these live outside src/ and are NOT built, so same
  // path works in dev and prod.  We alias anyway so Vite can resolve
  // the workspace:* link correctly and watch the file.
  "devil-ui/ai/component-registry.json": resolve(
    devilRoot,
    "ai/component-registry.json",
  ),

  // Theme generator — resolve to source TS so the docs color page
  // always reflects the latest config without a devil build step.
  "devil-ui/scripts/theme-generator/config": resolve(
    devilRoot,
    "scripts/theme-generator/config.ts",
  ),
  "devil-ui/scripts/theme-generator/types": resolve(
    devilRoot,
    "scripts/theme-generator/types.ts",
  ),

  // Shiki-powered code highlighting — client entry and server entry.
  // Kept separate upstream so apps that don't highlight code pay 0 KB.
  "devil-ui/code": resolve(devilSrc, "code/index.ts"),
  "devil-ui/code/server": resolve(devilSrc, "code/server.tsx"),

  // AI schemas — generated file at the package root; alias to source
  // so dev works without a full devil build.
  "devil-ui/ai/schemas": resolve(devilRoot, "ai/schemas.ts"),
};

/**
 * Vite plugin that rewires `devil-ui` imports to the raw source
 * files of the sibling package during `astro dev`.
 *
 * **Why not just use `resolve.alias`?**
 * `resolve.alias` is a simple prefix match — it can't distinguish
 * `devil-ui` from `@cloudflare/kumo-figma` without a trailing
 * slash, and it can't handle the overlapping sub-path exports cleanly.
 * A plugin gives us exact-match control.
 */
export function devilHmrPlugin() {
  return {
    name: "vite-plugin-devil-hmr",
    enforce: "pre" as const,

    resolveId(source: string) {
      // Exact match first (most imports)
      if (aliases[source]) {
        return aliases[source];
      }

      // Sub-path component imports: devil-ui/components/button
      // → packages/devil-ui/src/components/button/index.ts
      if (source.startsWith("devil-ui/components/")) {
        const componentName = source.replace(
          "devil-ui/components/",
          "",
        );
        return resolve(devilSrc, `components/${componentName}/index.ts`);
      }

      // Primitives: devil-ui/primitives/dialog
      // → packages/devil-ui/src/primitives/dialog.ts
      if (source.startsWith("devil-ui/primitives/")) {
        const primitiveName = source.replace(
          "devil-ui/primitives/",
          "",
        );
        return resolve(devilSrc, `primitives/${primitiveName}.ts`);
      }
      if (source === "devil-ui/primitives") {
        return resolve(devilSrc, "primitives/index.ts");
      }

      // Utils barrel
      if (source === "devil-ui/utils") {
        return resolve(devilSrc, "utils/index.ts");
      }

      // Catalog barrel
      if (source === "devil-ui/catalog") {
        return resolve(devilSrc, "catalog/index.ts");
      }

      // Registry barrel
      if (source === "devil-ui/registry") {
        return resolve(devilSrc, "registry/index.ts");
      }

      // Catch-all for any other devil-ui/styles/* CSS imports
      if (source.startsWith("devil-ui/styles/")) {
        const styleName = source.replace("devil-ui/styles/", "");
        return resolve(devilSrc, `styles/${styleName}.css`);
      }

      return undefined;
    },

    configResolved(config: { server: { fs: { allow: string[] } } }) {
      // Append devil source to the existing allow list rather than replacing it.
      // Using config() would shallow-merge and override Astro/Vite defaults.
      if (config.server?.fs?.allow) {
        config.server.fs.allow.push(devilRoot);
      }
    },
  };
}
