import { type CSSProperties } from "react";
import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";

/** Code language variant definitions. */
export const DEVIL_CODE_VARIANTS = {
  lang: {
    ts: {
      classes: "",
      description: "TypeScript code",
    },
    tsx: {
      classes: "",
      description: "TypeScript JSX code",
    },
    jsonc: {
      classes: "",
      description: "JSON with comments",
    },
    bash: {
      classes: "",
      description: "Shell/Bash commands",
    },
    css: {
      classes: "",
      description: "CSS styles",
    },
  },
} as const;

export const DEVIL_CODE_DEFAULT_VARIANTS = {
  lang: "ts",
} as const;

/**
 * Styling metadata for Code component (for AI/Figma plugin consumption)
 */
export const DEVIL_CODE_STYLING = {
  /** Base semantic tokens used */
  baseTokens: ["text-devil-subtle"],
  /** Typography and layout */
  typography: {
    fontFamily: "font-mono",
    fontSize: "text-sm",
    lineHeight: "leading-[20px]",
  },
  /** Container dimensions */
  dimensions: {
    margin: "m-0",
    padding: "p-0",
    width: "w-auto",
  },
  /** Border and background */
  appearance: {
    borderRadius: "rounded-none",
    border: "border-none",
    background: "bg-transparent",
  },
} as const;

/**
 * Styling metadata for CodeBlock component (for AI/Figma plugin consumption)
 */
export const DEVIL_CODEBLOCK_STYLING = {
  /** Base semantic tokens used */
  baseTokens: ["bg-devil-base", "border-devil-fill"],
  /** Container styling */
  container: {
    minWidth: "min-w-0",
    borderRadius: "rounded-md",
    border: "border border-devil-fill",
    background: "bg-devil-base",
  },
  /** Inner code element padding */
  innerPadding: "[&>pre]:p-2.5",
  /** Parsed dimensions */
  dimensions: {
    borderRadius: 6, // md = 6px
    padding: 10, // p-2.5 = 10px
  },
} as const;

// Derived types from DEVIL_CODE_VARIANTS
export type DevilCodeLang = keyof typeof DEVIL_CODE_VARIANTS.lang;

export interface DevilCodeVariantsProps {
  /**
   * Language hint for the code content.
   * - `"ts"` — TypeScript code
   * - `"tsx"` — TypeScript JSX code
   * - `"jsonc"` — JSON with comments
   * - `"bash"` — Shell/Bash commands
   * - `"css"` — CSS styles
   * @default "ts"
   */
  lang?: DevilCodeLang;
}

export function codeVariants({
  lang = DEVIL_CODE_DEFAULT_VARIANTS.lang,
}: DevilCodeVariantsProps = {}) {
  return cn(
    // Base styles
    "m-0 w-auto rounded-none border-none bg-transparent p-0 font-mono text-sm leading-[20px] text-devil-subtle",
    // Apply lang-specific styles (fallback to default if lang not in map)
    resolveVariant(
      DEVIL_CODE_VARIANTS.lang,
      lang,
      DEVIL_CODE_DEFAULT_VARIANTS.lang,
    ).classes,
  );
}

// Legacy type alias for backwards compatibility
export type CodeLang = DevilCodeLang;

/** @deprecated Use CodeLang instead */
export type BundledLanguage = CodeLang;

/**
 * Code component props.
 *
 * @example
 * ```tsx
 * <Code code="const x = 1;" lang="ts" />
 * <Code code="export API_KEY={{apiKey}}" lang="bash"
 *   values={{ apiKey: { value: "sk_live_123", highlight: true } }}
 * />
 * ```
 */
export interface CodeProps extends DevilCodeVariantsProps {
  /** The code string to display. */
  code: string;
  /** Template values for `{{key}}` interpolation. Values with `highlight: true` are visually emphasized. */
  values?: Record<
    string,
    {
      value: string;
      highlight?: boolean;
    }
  >;
  /** Additional CSS classes merged via `cn()`. */
  className?: string;
  /** Inline styles. */
  style?: CSSProperties;
}

/**
 * Simple code component without syntax highlighting.
 *
 * Renders code in a monospace font with customizable language metadata.
 * For a bordered container version, use `Code.Block` or `CodeBlock`.
 *
 * **Styling:**
 * - Typography: `font-mono text-sm leading-[20px]`
 * - Colors: `text-devil-subtle` with `bg-transparent`
 * - No borders or padding (use CodeBlock for styled container)
 * - Supports all semantic tokens via className prop
 *
 * @deprecated Use `CodeHighlighted` from `devil-ui/code` for syntax highlighting.
 * This component will be removed in v2.0.
 *
 * @example Migration:
 * ```tsx
 * // Before
 * import { Code } from "@hellwrk/devil-ui";
 * <Code code="const x = 1;" lang="ts" />
 *
 * // After
 * import { ShikiProvider, CodeHighlighted } from "@hellwrk/devil-ui/code";
 * <ShikiProvider engine="javascript" languages={['tsx']} themes={{ light: 'github-light', dark: 'github-dark' }}>
 *   <CodeHighlighted code="const x = 1;" lang="tsx" />
 * </ShikiProvider>
 * ```
 */
function CodeComponent({
  code,
  lang = DEVIL_CODE_DEFAULT_VARIANTS.lang,
  className,
  style,
}: CodeProps) {
  return (
    <pre className={cn(codeVariants({ lang }), className)} style={style}>
      {code}
    </pre>
  );
}

CodeComponent.displayName = "Code";

/**
 * CodeBlock component props — code inside a bordered container.
 *
 * @example
 * ```tsx
 * <CodeBlock lang="tsx" code={`const greeting = "Hello!";`} />
 * ```
 */
export interface CodeBlockProps {
  /** The code string to display. */
  code: string;
  /**
   * Language hint for the code content.
   * @default "ts"
   */
  lang?: CodeLang;
}

/**
 * Code block with border and background container.
 *
 * A styled wrapper around Code that adds a bordered container with surface background.
 * Useful for displaying code snippets with visual separation from surrounding content.
 *
 * **Styling:**
 * - Container: `min-w-0 rounded-md border border-devil-fill bg-devil-base`
 * - Inner padding: `p-2.5` (10px)
 * - Uses semantic tokens: `bg-devil-base`, `border-devil-fill`
 *
 * @deprecated Use `CodeHighlighted` from `devil-ui/code` for syntax highlighting.
 * This component will be removed in v2.0.
 */
function CodeBlockComponent({ code, lang }: CodeBlockProps) {
  return (
    <div className="min-w-0 rounded-md border border-devil-fill bg-devil-base [&>pre]:p-2.5!">
      <CodeComponent lang={lang} code={code} />
    </div>
  );
}

CodeBlockComponent.displayName = "CodeBlock";

// Export Code with Block sub-component (for registry detection)
export const Code = Object.assign(CodeComponent, {
  Block: CodeBlockComponent,
});

// Backward-compatible standalone export
export const CodeBlock = CodeBlockComponent;
