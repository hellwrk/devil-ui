import { defineRule } from "@oxlint/plugins";

/**
 * Enforces the Devil variant export standard for components:
 * - DEVIL_{COMPONENT}_VARIANTS (required)
 * - DEVIL_{COMPONENT}_DEFAULT_VARIANTS (required)
 * - DEVIL_{COMPONENT}_BASE_STYLES (optional, but must have DEVIL_ prefix)
 *
 * Only applies to files in src/components/**\/*.tsx
 */

/**
 * Extract component name from file path.
 * Example: "src/components/button/button.tsx" -> "BUTTON"
 */
function getComponentNameFromPath(filename) {
  const match = filename.match(/src\/components\/([^/]+)\/\1\.tsx$/);
  if (!match) return null;
  return match[1].toUpperCase().replace(/-/g, "_");
}

/**
 * Check if export name matches expected pattern.
 * Returns { valid: boolean, expectedName?: string, exportType?: string }
 */
function validateExportName(exportName, componentName) {
  const variantsPattern = `DEVIL_${componentName}_VARIANTS`;
  const defaultVariantsPattern = `DEVIL_${componentName}_DEFAULT_VARIANTS`;
  const baseStylesPattern = `DEVIL_${componentName}_BASE_STYLES`;

  if (exportName === variantsPattern) {
    return { valid: true, exportType: "VARIANTS" };
  }
  if (exportName === defaultVariantsPattern) {
    return { valid: true, exportType: "DEFAULT_VARIANTS" };
  }
  if (exportName === baseStylesPattern) {
    return { valid: true, exportType: "BASE_STYLES" };
  }

  // Check for incorrect naming patterns
  if (exportName.endsWith("_VARIANTS") && exportName.startsWith("DEVIL_")) {
    return {
      valid: false,
      expectedName: variantsPattern,
      exportType: "VARIANTS",
    };
  }
  if (
    exportName.endsWith("_DEFAULT_VARIANTS") &&
    exportName.startsWith("DEVIL_")
  ) {
    return {
      valid: false,
      expectedName: defaultVariantsPattern,
      exportType: "DEFAULT_VARIANTS",
    };
  }
  if (exportName.endsWith("_BASE_STYLES")) {
    // BASE_STYLES must have DEVIL_ prefix
    if (!exportName.startsWith("DEVIL_")) {
      return {
        valid: false,
        expectedName: baseStylesPattern,
        exportType: "BASE_STYLES",
      };
    }
    // Wrong component name
    return {
      valid: false,
      expectedName: baseStylesPattern,
      exportType: "BASE_STYLES",
    };
  }

  return { valid: true }; // Not a variant-related export
}

export const enforceVariantStandardRule = defineRule({
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce Devil variant standard: DEVIL_{COMPONENT}_VARIANTS, DEVIL_{COMPONENT}_DEFAULT_VARIANTS, and optionally DEVIL_{COMPONENT}_BASE_STYLES",
    },
    messages: {
      incorrectName:
        "Export name '{{actual}}' should be '{{expected}}' to follow Devil variant naming convention",
      missingVariants:
        "Component must export DEVIL_{{component}}_VARIANTS. Found: {{found}}",
      missingDefaultVariants:
        "Component must export DEVIL_{{component}}_DEFAULT_VARIANTS. Found: {{found}}",
    },
    schema: [],
  },
  defaultOptions: [],
  createOnce(context) {
    const foundExports = new Set();
    let programNode = null;
    let filename = null;
    let componentName = null;
    let shouldCheck = false;

    return {
      Program(node) {
        programNode = node;
        filename = context.filename;

        // Only apply to component files in src/components/**/*.tsx
        if (!filename.match(/src\/components\/[^/]+\/[^/]+\.tsx$/)) {
          shouldCheck = false;
          return;
        }

        componentName = getComponentNameFromPath(filename);
        shouldCheck = componentName !== null;
      },
      ExportNamedDeclaration(node) {
        if (!shouldCheck) return;

        // Check for named const exports
        if (
          node.declaration &&
          node.declaration.type === "VariableDeclaration"
        ) {
          for (const decl of node.declaration.declarations) {
            if (decl.id && decl.id.type === "Identifier") {
              const exportName = decl.id.name;
              foundExports.add(exportName);

              const validation = validateExportName(exportName, componentName);
              if (!validation.valid && validation.expectedName) {
                context.report({
                  node: decl.id,
                  messageId: "incorrectName",
                  data: {
                    actual: exportName,
                    expected: validation.expectedName,
                  },
                });
              }
            }
          }
        }
      },
      "Program:exit"() {
        if (!shouldCheck) return;

        const expectedVariants = `DEVIL_${componentName}_VARIANTS`;
        const expectedDefaultVariants = `DEVIL_${componentName}_DEFAULT_VARIANTS`;

        // Check for required exports at end of file
        const hasVariants = foundExports.has(expectedVariants);
        const hasDefaultVariants = foundExports.has(expectedDefaultVariants);

        if (!hasVariants) {
          context.report({
            node: programNode,
            messageId: "missingVariants",
            data: {
              component: componentName,
              found:
                Array.from(foundExports)
                  .filter((e) => e.includes("VARIANT"))
                  .join(", ") || "none",
            },
          });
        }

        if (!hasDefaultVariants) {
          context.report({
            node: programNode,
            messageId: "missingDefaultVariants",
            data: {
              component: componentName,
              found:
                Array.from(foundExports)
                  .filter((e) => e.includes("VARIANT"))
                  .join(", ") || "none",
            },
          });
        }
      },
    };
  },
});
