/**
 * Devil Theme Configuration
 *
 * Single source of truth for all semantic color tokens and typography.
 * This config is used to generate:
 * - theme-devil.css (base theme)
 * - theme-fedramp.css (fedramp overrides)
 * - Any future theme files
 *
 * Token naming:
 * - Key = current token name used in codebase
 * - newName = future name (empty string = no migration planned)
 */

import type { ThemeConfig } from "./types.js";

export const THEME_CONFIG: ThemeConfig = {
  /**
   * Text color tokens
   * Used with: text-{token}
   * CSS variable: --text-color-{token}
   */
  text: {
    "devil-default": {
      newName: "",
      theme: {
        devil: {
          light: "var(--color-neutral-900, oklch(21% 0.006 285.885))",
          dark: "var(--color-neutral-100, oklch(97% 0 0))",
        },
      },
    },
    "devil-inverse": {
      newName: "",
      theme: {
        devil: {
          light: "var(--color-neutral-100, oklch(97% 0 0))",
          dark: "var(--color-neutral-900, oklch(20.5% 0 0))",
        },
      },
    },
    "devil-strong": {
      newName: "",
      theme: {
        devil: {
          light: "var(--color-neutral-950, oklch(14.5% 0 0))", // darker than default
          dark: "var(--color-neutral-50, oklch(98.5% 0 0))", // lighter than default
        },
      },
    },
    "devil-subtle": {
      newName: "",
      theme: {
        devil: {
          light: "var(--color-neutral-500, oklch(55.6% 0 0))", // lighter than default
          dark: "var(--color-neutral-400, oklch(70.8% 0 0))", // darker than default
        },
      },
    },
    "devil-inactive": {
      newName: "",
      theme: {
        devil: {
          light: "var(--color-neutral-300, oklch(87% 0 0))", // lighter than subtle
          dark: "var(--color-neutral-600, oklch(43.9% 0 0))", // darker than subtle
        },
      },
    },
    "devil-placeholder": {
      // in between subtle and inactive
      newName: "",
      theme: {
        devil: {
          light: "var(--color-neutral-400, oklch(70.8% 0 0))",
          dark: "var(--color-neutral-500, oklch(55.6% 0 0))",
        },
      },
    },
    "devil-brand": {
      newName: "",
      theme: {
        devil: {
          light: "oklch(50% 0.225 25)",
          dark: "oklch(68% 0.22 25)",
        },
      },
    },
    "devil-link": {
      newName: "",
      theme: {
        devil: {
          light: "var(--color-blue-800, oklch(42.4% 0.199 265.638))",
          dark: "var(--color-blue-400, oklch(70.7% 0.165 254.624))",
        },
      },
    },
    "devil-info": {
      newName: "",
      theme: {
        devil: {
          light: "var(--color-blue-800, oklch(42.4% 0.199 265.638))",
          dark: "var(--color-blue-400, oklch(70.7% 0.165 254.624))",
        },
      },
    },
    "devil-success": {
      newName: "",
      theme: {
        devil: {
          light: "var(--color-emerald-800, oklch(43.2% 0.095 166.913))",
          dark: "var(--color-emerald-200, oklch(90.5% 0.093 164.15))",
        },
      },
    },
    "devil-danger": {
      newName: "",
      theme: {
        devil: {
          light: "var(--color-red-700, oklch(50.5% 0.213 27.518))",
          dark: "var(--color-red-400, oklch(70.4% 0.191 22.216))",
        },
      },
    },
    "devil-warning": {
      newName: "",
      theme: {
        devil: {
          light: "oklch(59.7% 0.144 57.5)",
          dark: "var(--color-orange-400, oklch(75% 0.183 55.934))",
        },
      },
    },

    /*
     * Badge text color tokens
     * Subtle variants need colored text; inverted needs flipping text
     */
    "devil-badge-orange-subtle": {
      newName: "",
      description: "Text color for subtle orange badge",
      theme: {
        devil: {
          light: "var(--color-orange-800, oklch(47% 0.157 37.304))",
          dark: "var(--color-orange-200, oklch(90.1% 0.076 70.697))",
        },
      },
    },
    "devil-badge-teal-subtle": {
      newName: "",
      description: "Text color for subtle teal badge",
      theme: {
        devil: {
          light: "var(--color-teal-800, oklch(43.7% 0.078 188.216))",
          dark: "var(--color-teal-200, oklch(91% 0.096 180.426))",
        },
      },
    },
    "devil-badge-neutral-subtle": {
      newName: "",
      description: "Text color for subtle neutral badge",
      theme: {
        devil: {
          light: "var(--color-neutral-800, oklch(26.9% 0 0))",
          dark: "var(--color-neutral-200, oklch(92.2% 0 0))",
        },
      },
    },
    "devil-badge-inverted": {
      newName: "",
      description:
        "Text color for inverted badge (white in light, black in dark)",
      theme: {
        devil: {
          light: "var(--color-white, #fff)",
          dark: "var(--color-black, #000)",
        },
      },
    },
  },

  /**
   * Color tokens
   * Used with: bg-{token}, border-{token}, ring-{token}, etc.
   * CSS variable: --color-{token}
   */
  color: {
    "devil-canvas": {
      newName: "",
      theme: {
        devil: {
          light: "var(--color-devil-neutral-25, oklch(98.75% 0 0))",
          dark: "var(--color-devil-neutral-1000, oklch(10% 0 0))",
        },
        fedramp: {
          light: "#5b697c",
          dark: "#5b697c",
        },
      },
    },
    "devil-elevated": {
      newName: "",
      theme: {
        devil: {
          light: "var(--color-devil-neutral-75, oklch(98% 0 0))",
          dark: "var(--color-devil-neutral-975, oklch(12% 0 0))",
        },
      },
    },
    "devil-recessed": {
      newName: "",
      theme: {
        devil: {
          light: "var(--color-devil-neutral-125, oklch(96% 0 0))",
          dark: "var(--color-devil-neutral-950, oklch(15% 0 0))",
        },
      },
    },
    "devil-base": {
      newName: "",
      theme: {
        devil: {
          light: "var(--color-white, #fff)",
          dark: "var(--color-devil-neutral-925, oklch(17% 0 0))",
        },
        fedramp: {
          light: "#5b697c",
          dark: "#5b697c",
        },
      },
    },
    "devil-tint": {
      newName: "",
      theme: {
        devil: {
          light: "var(--color-neutral-100, oklch(97% 0 0))",
          dark: "var(--color-devil-neutral-800, oklch(26.9% 0 0))",
        },
      },
    },
    "devil-contrast": {
      newName: "",
      theme: {
        devil: {
          light: "var(--color-devil-neutral-975, oklch(8.5% 0 0))",
          dark: "var(--color-devil-neutral-25, oklch(98.5% 0 0))",
        },
      },
    },
    "devil-overlay": {
      newName: "",
      theme: {
        devil: {
          light: "var(--color-devil-neutral-50, oklch(97.5% 0 0))",
          dark: "var(--color-neutral-800, oklch(26.9% 0 0))",
        },
      },
    },
    "devil-control": {
      newName: "",
      theme: {
        devil: {
          light: "var(--color-white, #fff)",
          dark: "var(--color-neutral-900, oklch(21% 0.006 285.885))",
        },
      },
    },
    "devil-interact": {
      newName: "",
      theme: {
        devil: {
          light: "var(--color-neutral-300, oklch(87% 0 0))",
          dark: "var(--color-neutral-700, oklch(37.1% 0 0))",
        },
      },
    },
    "devil-fill": {
      newName: "",
      theme: {
        devil: {
          light: "var(--color-neutral-200, oklch(92.2% 0 0))",
          dark: "var(--color-neutral-800, oklch(26.9% 0 0))",
        },
      },
    },
    "devil-fill-hover": {
      newName: "",
      theme: {
        devil: {
          light: "var(--color-devil-neutral-125, oklch(96.5% 0 0))",
          dark: "var(--color-neutral-800, oklch(37.1% 0 0))",
        },
      },
    },
    "devil-brand": {
      newName: "",
      theme: {
        devil: {
          light: "oklch(55% 0.235 25)",
          dark: "oklch(62% 0.25 25)",
        },
      },
    },
    "devil-brand-hover": {
      newName: "",
      theme: {
        devil: {
          light: "oklch(48% 0.235 25)",
          dark: "oklch(55% 0.25 25)",
        },
      },
    },
    "devil-line": {
      newName: "",
      theme: {
        devil: {
          light: "oklch(14.5% 0 0 / 0.1)",
          dark: "var(--color-devil-neutral-750, oklch(32% 0 0))",
        },
      },
    },
    "devil-hairline": {
      newName: "",
      theme: {
        devil: {
          light: "var(--color-devil-neutral-150, oklch(93.5% 0 0))",
          dark: "var(--color-neutral-800, oklch(26.9% 0 0))",
        },
        fedramp: {
          light: "#c8d4e5",
          dark: "#c8d4e5",
        },
      },
    },
    "devil-focus": {
      newName: "",
      description: "Primary focus ring/border color",
      theme: {
        devil: {
          light: "var(--color-devil-neutral-950, oklch(15% 0 0))",
          dark: "var(--color-devil-neutral-150, oklch(93.5% 0 0))",
        },
      },
    },
    "devil-shadow-edge": {
      newName: "",
      description: "Tight spread shadow color for control thumbs/knobs",
      theme: {
        devil: {
          light: "oklch(0% 0 0 / 0.12)",
          dark: "oklch(100% 0 0 / 0.1)",
        },
      },
    },
    "devil-shadow-drop": {
      newName: "",
      description: "Drop shadow color for control thumbs/knobs",
      theme: {
        devil: {
          light: "oklch(0% 0 0 / 0.08)",
          dark: "oklch(0% 0 0 / 0.3)",
        },
      },
    },
    "devil-arrow-edge": {
      newName: "",
      description:
        "Arrow border edge fill for popover/tooltip arrows (visible in light mode). Matches devil-line so the arrow border aligns with the popup outline.",
      theme: {
        devil: {
          light: "oklch(14.5% 0 0 / 0.1)",
          dark: "transparent",
        },
      },
    },
    "devil-arrow-stroke": {
      newName: "",
      description:
        "Arrow border stroke fill for popover/tooltip arrows (visible in dark mode). Matches devil-line so the arrow border aligns with the popup outline.",
      theme: {
        devil: {
          light: "transparent",
          dark: "var(--color-devil-neutral-750, oklch(32% 0 0))",
        },
      },
    },
    "devil-info-tint": {
      newName: "",
      theme: {
        devil: {
          light: "oklch(93.2% 0.032 255.6 / 0.45)",
          dark: "oklch(38.0% 0.145 265.5 / 0.22)",
        },
      },
    },
    "devil-info": {
      newName: "",
      theme: {
        devil: {
          light: "var(--color-blue-500, oklch(68.5% 0.169 237.323))",
          dark: "var(--color-blue-500, oklch(68.5% 0.169 237.323))",
        },
      },
    },
    "devil-warning-tint": {
      newName: "",
      theme: {
        devil: {
          light: "oklch(93.1% 0.107 94.6 / 0.20)",
          dark: "oklch(35.3% 0.079 65.0 / 0.37)",
        },
      },
    },
    "devil-warning": {
      newName: "",
      theme: {
        devil: {
          light: "oklch(73.9% 0.177 58.2)",
          dark: "oklch(64.5% 0.168 50.0)",
        },
      },
    },
    "devil-danger-tint": {
      newName: "",
      theme: {
        devil: {
          light: "oklch(93.6% 0.032 17.7 / 0.42)",
          dark: "oklch(42.9% 0.176 28.7 / 0.17)",
        },
      },
    },
    "devil-danger": {
      newName: "",
      // Aligned with fill.devil-danger so `bg-devil-danger` matches `fill-devil-danger`.
      theme: {
        devil: {
          light: "var(--color-red-500, oklch(63.7% 0.237 25.331))",
          dark: "var(--color-red-600, oklch(57.7% 0.245 27.325))",
        },
      },
    },
    "devil-success-tint": {
      newName: "",
      theme: {
        devil: {
          light: "oklch(96.2% 0.043 156.7 / 0.57)",
          dark: "oklch(39.3% 0.096 152.3 / 0.20)",
        },
      },
    },
    "devil-success": {
      newName: "",
      theme: {
        devil: {
          light: "var(--color-emerald-600, oklch(59.6% 0.145 163.225))",
          dark: "var(--color-emerald-400, oklch(76.5% 0.177 163.223))",
        },
      },
    },

    /*
     * Banner background tokens
     * Pre-baked opacity per mode so banners don't need dark: overrides.
     * Mirrors the *-tint hues but tuned for the Banner component's surface contrast.
     */
    "devil-banner-info": {
      newName: "",
      description: "Info banner background (informational/default variant)",
      theme: {
        devil: {
          light: "oklch(93.2% 0.032 255.585 / 0.7)",
          dark: "oklch(37.9% 0.146 265.522 / 0.5)",
        },
      },
    },
    "devil-banner-warning": {
      newName: "",
      description: "Warning banner background (alert variant)",
      theme: {
        devil: {
          light: "var(--color-yellow-100, oklch(97.3% 0.071 103.193))",
          dark: "oklch(55.4% 0.135 66.442 / 0.5)",
        },
      },
    },

    /*
     * Badge color tokens
     * Solid variants: vivid background, white text
     * Subtle variants: tinted background, darker text (flips in dark mode)
     */

    // Red
    "devil-badge-red": {
      newName: "",
      description: "Red badge background",
      theme: {
        devil: {
          light: "var(--color-red-600, oklch(57.7% 0.245 27.325))",
          dark: "var(--color-red-700, oklch(50.5% 0.213 27.518))",
        },
      },
    },

    // Green
    "devil-badge-green": {
      newName: "",
      description: "Green badge background",
      theme: {
        devil: {
          light: "var(--color-emerald-600, oklch(59.6% 0.145 163.225))",
          dark: "var(--color-emerald-700, oklch(50.8% 0.118 165.612))",
        },
      },
    },

    // Orange
    "devil-badge-orange": {
      newName: "",
      description: "Orange badge background",
      theme: {
        devil: {
          light: "var(--color-orange-650, oklch(81.5% 0.197 76))",
          dark: "var(--color-orange-650, oklch(81.5% 0.197 76))",
        },
      },
    },

    // Purple
    "devil-badge-purple": {
      newName: "",
      description: "Purple badge background",
      theme: {
        devil: {
          light: "var(--color-purple-600, oklch(55.8% 0.288 302.321))",
          dark: "var(--color-purple-700, oklch(49.6% 0.265 301.924))",
        },
      },
    },

    // Teal
    "devil-badge-teal": {
      newName: "",
      description: "Teal badge background",
      theme: {
        devil: {
          light: "var(--color-teal-650, oklch(54.9% 0.096 184.565))",
          dark: "var(--color-teal-700, oklch(51.1% 0.096 186.391))",
        },
      },
    },

    // Blue
    "devil-badge-blue": {
      newName: "",
      description: "Blue badge background",
      theme: {
        devil: {
          light: "var(--color-blue-600, oklch(54.6% 0.245 262.881))",
          dark: "var(--color-blue-700, oklch(48.8% 0.243 264.376))",
        },
      },
    },

    // Neutral
    "devil-badge-neutral": {
      newName: "",
      description: "Neutral badge background",
      theme: {
        devil: {
          light: "var(--color-neutral-500, oklch(55.6% 0 0))",
          dark: "var(--color-neutral-600, oklch(43.9% 0 0))",
        },
      },
    },
    // NOTE: devil-badge-neutral-subtle omitted — same pair as devil-fill.
    // Badge uses bg-devil-fill instead.

    // Inverted
    "devil-badge-inverted": {
      newName: "",
      description:
        "Inverted badge background (near-black in light, white in dark)",
      theme: {
        devil: {
          light: "var(--color-neutral-950, oklch(14.5% 0 0))",
          dark: "var(--color-white, #fff)",
        },
      },
    },
  },

  /**
   * Typography tokens
   * Used with: text-{size} utilities
   * CSS variables: --text-{size}, --text-{size}--line-height
   *
   * Note: Typography is NOT theme-dependent (no light/dark mode).
   * Values are the same across color modes but may differ per theme.
   */
  typography: {
    xs: {
      newName: "",
      theme: {
        devil: "12px",
      },
    },
    "xs--line-height": {
      newName: "",
      theme: {
        devil: "calc(1 / 0.75)",
      },
    },
    sm: {
      newName: "",
      theme: {
        devil: "13px",
      },
    },
    "sm--line-height": {
      newName: "",
      theme: {
        devil: "calc(1 / 0.85)",
      },
    },
    base: {
      newName: "",
      theme: {
        devil: "14px",
      },
    },
    "base--line-height": {
      newName: "",
      theme: {
        devil: "1.5",
      },
    },
    lg: {
      newName: "",
      theme: {
        devil: "16px",
      },
    },
    "lg--line-height": {
      newName: "",
      theme: {
        devil: "1.5",
      },
    },
  },
};

/** List of all available themes */
export const AVAILABLE_THEMES = ["devil", "fedramp"] as const;
export type AvailableTheme = (typeof AVAILABLE_THEMES)[number];
