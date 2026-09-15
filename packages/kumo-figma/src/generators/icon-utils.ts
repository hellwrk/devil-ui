/**
 * Icon Utilities for Component Generators
 *
 * Creates icons directly from embedded Phosphor SVG data.
 * Icons are generated at runtime using figma.createNodeFromSvg().
 */

import {
  getVariableByName,
  bindFillToVariable,
  COLORS,
  FALLBACK_VALUES,
  DASH_PATTERN,
  VAR_NAMES,
} from "./shared";

// Icon data is generated at build time by build-phosphor-icons.ts
// esbuild will inline this JSON into the bundle
import phosphorIcons from "../generated/phosphor-icons.json";

/**
 * Icon data structure
 */
type IconData = {
  id: string;
  viewBox: string;
  content: string;
};

/**
 * Map of icon ID to icon data for fast lookups
 */
const ICON_MAP = new Map<string, IconData>(
  (phosphorIcons as IconData[]).map((icon) => [icon.id, icon]),
);

/**
 * Corner radius multiplier for placeholder icons
 * Creates softly rounded corners (0.2 = 20% of icon size)
 */
const PLACEHOLDER_CORNER_RADIUS_MULTIPLIER = 0.2;

/**
 * Icon size mapping for different button sizes
 * Matches Tailwind size classes used in components
 */
export const ICON_SIZE_MAP: Record<string, number> = {
  xs: FALLBACK_VALUES.iconSize.xs, // size-3 = 12px
  sm: FALLBACK_VALUES.iconSize.sm, // size-4 = 16px
  base: FALLBACK_VALUES.iconSize.base, // size-5 = 20px
  lg: FALLBACK_VALUES.iconSize.base, // size-5 = 20px
};

/**
 * Default icons used in components
 */
export const DEFAULT_ICONS = {
  /** Plus icon for add buttons */
  plus: "ph-plus",
  /** Refresh/arrows clockwise for refresh button */
  refresh: "ph-arrows-clockwise",
  /** Check icon for checkboxes */
  check: "ph-check",
  /** Minus icon for indeterminate checkbox */
  minus: "ph-minus",
  /** Arrow right for link buttons */
  arrowRight: "ph-arrow-right",
};

/**
 * Create a Figma frame containing an icon from embedded SVG data
 *
 * @param iconId - Icon ID (e.g., "ph-check", "ph-arrow-right")
 * @param size - Target size in pixels
 * @returns FrameNode containing the icon, or undefined if icon not found
 */
export function createIconInstance(
  iconId: string,
  size: number,
): FrameNode | undefined {
  const iconData = ICON_MAP.get(iconId);

  if (!iconData) {
    console.warn(`Icon not found: ${iconId}. Using placeholder.`);
    return createPlaceholderIcon(size);
  }

  // Create SVG string with proper viewBox
  const svgString = `<svg viewBox="${iconData.viewBox}" xmlns="http://www.w3.org/2000/svg">${iconData.content}</svg>`;

  try {
    // Create node from SVG
    const svgNode = figma.createNodeFromSvg(svgString);
    svgNode.name = iconId;

    // Resize to target size
    svgNode.resize(size, size);

    // Set constraints to SCALE for proper resizing
    svgNode.constraints = {
      horizontal: "SCALE",
      vertical: "SCALE",
    };

    // Apply constraints to child vectors recursively
    if ("children" in svgNode) {
      const applyScaleConstraints = (node: SceneNode) => {
        if ("constraints" in node) {
          node.constraints = {
            horizontal: "SCALE",
            vertical: "SCALE",
          };
        }
        if ("children" in node && Array.isArray((node as any).children)) {
          for (const child of (node as any).children as SceneNode[]) {
            applyScaleConstraints(child);
          }
        }
      };
      applyScaleConstraints(svgNode);
    }

    return svgNode;
  } catch (error) {
    console.error(`Failed to create icon ${iconId}:`, error);
    return createPlaceholderIcon(size);
  }
}

/**
 * Create a placeholder icon when the real icon is not available
 * Used as fallback when an icon ID is not found in the embedded data
 *
 * @param size - Icon size in pixels
 * @returns FrameNode with a simple placeholder shape
 */
export function createPlaceholderIcon(size: number): FrameNode {
  const frame = figma.createFrame();
  frame.name = "Placeholder Icon";
  frame.resize(size, size);
  frame.fills = [];

  // Create a rounded rectangle as the icon placeholder
  const rect = figma.createRectangle();
  rect.resize(size, size);
  rect.x = 0;
  rect.y = 0;
  rect.cornerRadius = size * PLACEHOLDER_CORNER_RADIUS_MULTIPLIER;
  rect.fills = [{ type: "SOLID", color: COLORS.placeholder }];

  frame.appendChild(rect);
  return frame;
}

/**
 * Get an icon instance for a button, with fallback to placeholder
 *
 * @param iconId - Icon ID (e.g., "ph-plus")
 * @param size - Button size key (xs, sm, base, lg)
 * @returns FrameNode of the icon or a placeholder frame
 */
export function getButtonIcon(iconId: string, size: string): FrameNode {
  const iconSize = ICON_SIZE_MAP[size] || FALLBACK_VALUES.iconSize.base;
  const instance = createIconInstance(iconId, iconSize);

  if (instance) {
    return instance;
  }

  // Fallback to placeholder
  console.warn(`Using placeholder for icon: ${iconId}`);
  return createPlaceholderIcon(iconSize);
}

/**
 * Create a loader component for loading states
 *
 * @param size - Loader size in pixels (default: 16)
 * @returns FrameNode with a circular spinner shape
 */
export function createLoader(size: number): FrameNode {
  if (size === undefined) size = 16; // Default loader size (sm)

  const frame = figma.createFrame();
  frame.name = "Loader";
  frame.resize(size, size);
  frame.fills = [];

  // Create circle with stroke (spinner ring)
  const spinner = figma.createEllipse();
  spinner.resize(size, size);
  spinner.x = 0;
  spinner.y = 0;

  // Transparent fill, visible stroke
  spinner.fills = [];
  spinner.strokes = [{ type: "SOLID", color: COLORS.spinnerStroke }];
  spinner.strokeWeight = 2; // Loader stroke weight (visually balanced for spinner)
  spinner.strokeAlign = "CENTER";

  // Dashed stroke to create spinner appearance
  spinner.dashPattern = [...DASH_PATTERN.standard]; // Standard dash pattern for animated spinner

  frame.appendChild(spinner);
  return frame;
}

/**
 * Bind icon fill color to a Figma variable or hardcoded color
 *
 * Traverses all vector/shape nodes within an icon and binds their fills
 * to a color variable from the kumo-colors collection.
 *
 * Special cases:
 * - "text-white" → hardcoded white (#FFFFFF)
 * - "text-devil-inverse" → maps to "text-color-devil-inverse" variable
 *
 * @param icon - Icon frame containing vector nodes
 * @param colorVariableName - Variable name or special value (e.g., 'text-devil-default', 'text-white')
 *
 * @example
 * const iconInstance = createIconInstance("ph-check", 20);
 * if (iconInstance) {
 *   bindIconColor(iconInstance, "text-devil-default");
 * }
 */
export function bindIconColor(
  icon: FrameNode,
  colorVariableName: string,
): void {
  // Handle hardcoded white (not a variable)
  const isHardcodedWhite =
    colorVariableName === "text-white" || colorVariableName === "!text-white";

  // Map Tailwind class names (text-devil-*) to Figma variable names (text-color-devil-*)
  // Variable names match theme-devil.css: --text-color-devil-{name} and --color-devil-{name}
  let figmaVariableName = colorVariableName;
  if (colorVariableName === "text-devil-default") {
    figmaVariableName = VAR_NAMES.text.default; // "text-color-devil-default"
  } else if (colorVariableName === "text-devil-inverse") {
    figmaVariableName = VAR_NAMES.text.inverse; // "text-color-devil-inverse"
  } else if (colorVariableName === "fill-devil-contrast") {
    // fill-devil-contrast uses color-devil-contrast (dark on light, light on dark)
    figmaVariableName = VAR_NAMES.color.contrast; // "color-devil-contrast"
  } else if (colorVariableName === "text-devil-subtle") {
    figmaVariableName = VAR_NAMES.text.subtle; // "text-color-devil-subtle"
  } else if (colorVariableName === "text-devil-danger") {
    figmaVariableName = VAR_NAMES.text.danger; // "text-color-devil-danger"
  } else if (colorVariableName === "text-devil-link") {
    figmaVariableName = VAR_NAMES.text.link; // "text-color-devil-link"
  } else if (colorVariableName === "text-devil-inactive") {
    figmaVariableName = VAR_NAMES.text.inactive; // "text-color-devil-inactive"
  } else if (colorVariableName === "text-devil-strong") {
    figmaVariableName = VAR_NAMES.text.strong; // "text-color-devil-strong"
  }

  let variable: Variable | undefined;
  if (!isHardcodedWhite) {
    variable = getVariableByName(figmaVariableName);

    if (!variable) {
      console.warn(
        "Failed to bind icon color: variable '" +
          figmaVariableName +
          "' not found (from '" +
          colorVariableName +
          "')",
      );
      figma.notify("Icon color variable not found: " + figmaVariableName, {
        error: true,
      });
      return;
    }
  }

  // Recursively traverse all nodes to find vectors/shapes
  function traverseAndBind(node: SceneNode): void {
    // Bind fills for vector nodes
    if (
      node.type === "VECTOR" ||
      node.type === "ELLIPSE" ||
      node.type === "RECTANGLE" ||
      node.type === "POLYGON" ||
      node.type === "STAR" ||
      node.type === "LINE"
    ) {
      if (isHardcodedWhite) {
        // Set hardcoded white fill
        const whiteFill: SolidPaint = {
          type: "SOLID",
          color: { r: 1, g: 1, b: 1 },
        };
        (node as unknown as MinimalFillsMixin).fills = [whiteFill];
      } else if (variable) {
        bindFillToVariable(node, variable.id);
      }
    }

    // Recursively process children
    if ("children" in node && node.children) {
      for (let i = 0; i < node.children.length; i++) {
        traverseAndBind(node.children[i]);
      }
    }
  }

  traverseAndBind(icon);
}
