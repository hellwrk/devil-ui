import { describe, expect, it } from "vite-plus/test";
import { THEME_CONFIG } from "./config";
import { generateDevilThemeCSS, generateThemeOverrideCSS } from "./generate-css";

function countOccurrences(source: string, needle: string): number {
  return source.split(needle).length - 1;
}

describe("theme css generator", () => {
  it("emits devil runtime fallback selectors inside base layer", () => {
    const css = generateDevilThemeCSS(THEME_CONFIG);

    expect(css).toContain("@layer base {");
    expect(css).toContain(':root, [data-theme="devil"] {');
    expect(css).toContain(
      ':root[data-mode="dark"], [data-mode="dark"]:not([data-theme]), [data-mode="dark"] [data-theme="devil"], [data-theme="devil"][data-mode="dark"], [data-theme="devil"] [data-mode="dark"] {',
    );
  });

  it("emits override theme runtime fallbacks in base layers only", () => {
    const css = generateThemeOverrideCSS(THEME_CONFIG, "fedramp");

    expect(countOccurrences(css, "@layer base {")).toBe(2);
    expect(css).toContain('  [data-theme="fedramp"] {');
    expect(css).toContain(
      '  [data-mode="dark"] [data-theme="fedramp"], [data-theme="fedramp"][data-mode="dark"], [data-theme="fedramp"] [data-mode="dark"] {',
    );
    expect(css).not.toMatch(/\n\[data-theme="fedramp"\] \{/);
  });
});
