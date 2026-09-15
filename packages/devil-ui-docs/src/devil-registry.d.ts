/**
 * Type declarations for virtual:devil-registry module.
 * Provides component registry data from the AI metadata.
 */
declare module "virtual:devil-registry" {
  import type { ComponentRegistry } from "@hellwrk/devil-ui";

  /** Component registry markdown content for documentation */
  export const devilRegistryMarkdown: string;

  /** Typed component registry JSON */
  export const devilRegistryJson: ComponentRegistry;
}
