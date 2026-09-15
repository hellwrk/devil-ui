/**
 * Devil CLI configuration utilities
 * Handles reading and writing devil-ui.json config files
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Configuration schema for devil-ui.json
 */
export interface DevilConfig {
  /**
   * Directory where blocks will be installed (relative to project root)
   * @default "src/components/devil-ui"
   */
  blocksDir: string;

  /**
   * Version of the config schema
   * @default "1.0.0"
   */
  version?: string;
}

/**
 * Default configuration values
 */
export const DEFAULT_CONFIG: Required<DevilConfig> = {
  blocksDir: "src/components/devil-ui",
  version: "1.0.0",
};

/**
 * Read devil-ui.json from the specified directory
 * @param projectRoot - Path to project root (defaults to cwd)
 * @returns Parsed config or null if not found
 */
export function readConfig(
  projectRoot: string = process.cwd(),
): DevilConfig | null {
  const configPath = join(projectRoot, "devil-ui.json");

  if (!existsSync(configPath)) {
    return null;
  }

  try {
    const content = readFileSync(configPath, "utf-8");
    const config = JSON.parse(content) as DevilConfig;

    // Merge with defaults to ensure all fields are present
    return {
      ...DEFAULT_CONFIG,
      ...config,
    };
  } catch (error) {
    throw new Error(
      `Failed to parse devil-ui.json: ${error instanceof Error ? error.message : String(error)}`,
      { cause: error },
    );
  }
}

/**
 * Write devil-ui.json to the specified directory
 * @param config - Configuration to write
 * @param projectRoot - Path to project root (defaults to cwd)
 */
export function writeConfig(
  config: DevilConfig,
  projectRoot: string = process.cwd(),
): void {
  const configPath = join(projectRoot, "devil-ui.json");

  // Merge with defaults
  const fullConfig: Required<DevilConfig> = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  try {
    const content = JSON.stringify(fullConfig, null, 2) + "\n";
    writeFileSync(configPath, content, "utf-8");
  } catch (error) {
    throw new Error(
      `Failed to write devil-ui.json: ${error instanceof Error ? error.message : String(error)}`,
      { cause: error },
    );
  }
}

/**
 * Check if devil-ui.json exists in the specified directory
 * @param projectRoot - Path to project root (defaults to cwd)
 * @returns true if devil-ui.json exists
 */
export function configExists(projectRoot: string = process.cwd()): boolean {
  const configPath = join(projectRoot, "devil-ui.json");
  return existsSync(configPath);
}
