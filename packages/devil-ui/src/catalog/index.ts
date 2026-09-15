/**
 * Devil Catalog Module
 *
 * Runtime utilities for JSON-based UI rendering with Devil components.
 * Based on the json-render pattern: https://github.com/vercel-labs/json-render
 *
 * Features:
 * - Catalog creation with auto-generated Zod schemas
 * - UI tree validation
 * - Dynamic value resolution (data binding)
 * - Visibility condition evaluation
 * - Action handling
 *
 * @example
 * import {
 *   createDevilCatalog,
 *   initCatalog,
 *   evaluateVisibility,
 *   resolveProps,
 * } from '@hellwrk/devil-ui/catalog';
 *
 * // Create catalog with actions
 * const catalog = createDevilCatalog({
 *   actions: {
 *     submit: { description: 'Submit form' },
 *   },
 * });
 *
 * // Initialize (loads schemas)
 * await initCatalog(catalog);
 *
 * // Validate AI-generated tree
 * const result = catalog.validateTree(aiGeneratedJson);
 */

// Types
export type {
  // Core types
  UIElement,
  UITree,
  DynamicValue,
  DynamicString,
  DynamicNumber,
  DynamicBoolean,
  // Visibility
  VisibilityCondition,
  LogicExpression,
  // Actions
  Action,
  ActionConfirm,
  ActionHandler,
  ActionHandlers,
  ActionDefinition,
  // Auth & Data
  AuthState,
  DataModel,
  // Catalog
  DevilCatalog,
  CatalogConfig,
  ValidationResult,
  // Registry (re-exported)
  ComponentRegistry,
  ComponentSchema,
  PropSchema,
  SubComponentSchema,
} from "./types";

// Catalog
export { createDevilCatalog, initCatalog, loadSchemas } from "./catalog";

// Data utilities
export {
  getByPath,
  setByPath,
  isDynamicPath,
  resolveDynamicValue,
  resolveProps,
} from "./data";

// Visibility
export {
  evaluateVisibility,
  createVisibilityContext,
  type VisibilityContext,
} from "./visibility";
