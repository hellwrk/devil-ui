// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import { unified } from "@astrojs/markdown-remark";
import tailwindcss from "@tailwindcss/vite";
import { execSync } from "child_process";
import { readFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import {
  devilColorsPlugin,
  loadDevilColorsFromPackage,
} from "./src/lib/vite-plugin-devil-colors.js";
import { devilRegistryPlugin } from "./src/lib/vite-plugin-devil-registry.js";
import { devilHmrPlugin } from "./src/lib/vite-plugin-devil-hmr.js";
import { markdownPages } from "./src/lib/astro-markdown-pages.js";
import { remarkHeadingComponents } from "./src/lib/remark-heading-components.js";

import sitemap from "@astrojs/sitemap";

import { readFileSync as readFile, readdirSync, statSync, writeFileSync } from "node:fs";
import { join as joinPath } from "node:path";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

/**
 * Deploying under a subpath (GitHub Pages project sites live at
 * `<user>.github.io/<repo>/`) requires every root-absolute URL to carry the
 * base. Astro rewrites its own asset/link output, but hardcoded values in
 * components and markdown (`/components/button`) stay as authored. This
 * integration prefixes them in the emitted HTML so we don't have to thread
 * `import.meta.env.BASE_URL` through hundreds of call sites.
 */
function basePathRewrite(base) {
  const prefix = base.replace(/\/+$/, "");
  if (!prefix) return { name: "base-path-rewrite" };

  const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const attrRe = /\b(href|src)="(\/[^"]*)"/g;

  const rewrite = (html) =>
    html.replace(attrRe, (match, attr, url) => {
      if (url.startsWith("//")) return match;
      if (url === prefix || url.startsWith(`${prefix}/`)) return match;
      return `${attr}="${prefix}${url}"`;
    });

  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = joinPath(dir, entry);
      if (statSync(full).isDirectory()) {
        walk(full);
      } else if (entry.endsWith(".html")) {
        const source = readFile(full, "utf-8");
        const next = rewrite(source);
        if (next !== source) writeFileSync(full, next);
      }
    }
  };

  return {
    name: "base-path-rewrite",
    hooks: {
      "astro:build:done": ({ dir, logger }) => {
        walk(fileURLToPath(dir));
        logger.info(`Prefixed root-absolute URLs with "${prefix}"`);
      },
    },
  };
}

function getBuildInfo() {
  // Read version from the main devil package
  const devilPkg = JSON.parse(
    readFileSync(resolve(__dirname, "../devil-ui/package.json"), "utf-8"),
  );

  // Read version from the docs-astro package
  const docsPkg = JSON.parse(
    readFileSync(resolve(__dirname, "package.json"), "utf-8"),
  );

  let commitHash = "unknown";
  let commitDate = "unknown";
  let branch = "unknown";

  try {
    commitHash = execSync("git rev-parse --short HEAD", {
      encoding: "utf-8",
    }).trim();
    commitDate = execSync("git log -1 --format=%cI", {
      encoding: "utf-8",
    }).trim();
    branch = execSync("git rev-parse --abbrev-ref HEAD", {
      encoding: "utf-8",
    }).trim();
  } catch (error) {
    console.warn(
      "[devil-ui-docs] Git info unavailable during build:",
      error instanceof Error ? error.message : error,
    );
    console.warn(
      "[devil-ui-docs] This may happen with shallow clones. Set GIT_DEPTH=0 or fetch-depth: 0 in CI.",
    );
  }

  return {
    devilVersion: devilPkg.version,
    docsVersion: docsPkg.version,
    commitHash,
    commitDate,
    branch,
    buildDate: new Date().toISOString(),
  };
}

const buildInfo = getBuildInfo();

// Detect dev mode: `astro dev` sets this in process.argv
const isDev = process.argv.includes("dev");

// Path to devil source (used for dev mode CSS aliases)
const devilSrc = resolve(__dirname, "../devil-ui/src");

// Deployment target. GitHub Pages project sites serve from /<repo>, so CI sets
// GH_PAGES_BASE=/devil-ui and SITE_URL=https://hellwrk.github.io. Both default
// to a root deployment so local and custom-domain builds are unaffected.
const siteUrl = process.env.SITE_URL?.trim() || "https://hellwrk.github.io";
const basePath = process.env.GH_PAGES_BASE?.trim() || "";

// In dev the colors plugin reads the source config through Vite for live HMR.
// Builds read the built package here, in Node, since Vite's module runner is
// unavailable by the time pages render.
const staticDevilColors = isDev ? undefined : await loadDevilColorsFromPackage();

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    react(),
    sitemap(),
    markdownPages({ passthroughPaths: ["/skill.md"] }),
    basePathRewrite(basePath),
  ],
  site: siteUrl,
  ...(basePath ? { base: basePath } : {}),
  // Prefetch linked pages so navigation feels instant. `hover` fetches the
  // target page's HTML + assets as soon as a link is hovered/focused, so by
  // the time the user clicks it's usually already cached.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  markdown: {
    processor: unified({ remarkPlugins: [remarkHeadingComponents] }),
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "vesper",
      },
      defaultColor: false,
    },
  },
  vite: {
    plugins: [
      // In dev mode, resolve devil-ui imports to raw source files
      // for instant HMR. In production builds, the normal package.json
      // exports (dist/) are used — preserving the real consumer experience.
      // IMPORTANT: Must come BEFORE tailwindcss() so CSS @import statements
      // like `@import "@hellwrk/devil-ui/styles"` are aliased to source files
      // before Tailwind processes them.
      ...(isDev ? [devilHmrPlugin()] : []),
      tailwindcss(),
      devilColorsPlugin({ dev: isDev, staticColors: staticDevilColors }),
      devilRegistryPlugin(),
    ],

    // In dev mode, add resolve.alias for CSS @import statements that may bypass
    // Vite plugins. This ensures `@import "@hellwrk/devil-ui/styles"` resolves
    // to source files without requiring a build step.
    resolve: isDev
      ? {
          alias: {
            "devil-ui/styles/tailwind": resolve(
              devilSrc,
              "styles/devil.css",
            ),
            "devil-ui/styles/standalone": resolve(
              devilSrc,
              "styles/devil-standalone.css",
            ),
            "devil-ui/styles": resolve(devilSrc, "styles/devil.css"),
          },
        }
      : undefined,

    define: {
      __DEVIL_VERSION__: JSON.stringify(buildInfo.devilVersion),
      __DOCS_VERSION__: JSON.stringify(buildInfo.docsVersion),
      __BUILD_VERSION__: JSON.stringify(buildInfo.devilVersion), // Alias for backwards compatibility
      __BUILD_COMMIT__: JSON.stringify(buildInfo.commitHash),
      __BUILD_COMMIT_DATE__: JSON.stringify(buildInfo.commitDate),
      __BUILD_BRANCH__: JSON.stringify(buildInfo.branch),
      __BUILD_DATE__: JSON.stringify(buildInfo.buildDate),
    },
  },
});
