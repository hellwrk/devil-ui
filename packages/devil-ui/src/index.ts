/**
 * @module devil-ui
 *
 * Cloudflare's React component library built on Base UI and Tailwind CSS v4.
 *
 * **Key rules:**
 * - Use **semantic tokens only** (`bg-devil-base`, `text-devil-default`, etc.) — never raw Tailwind colors.
 * - **No `dark:` variant** — light/dark mode is handled automatically via CSS `light-dark()`.
 * - Merge custom classes with the `cn()` utility exported from this package.
 * - Wrap your app with the devil CSS import: `import "devil-ui/styles"`.
 *
 * **Component categories:**
 * - **Action:** Button, ClipboardText
 * - **Display:** Badge, Breadcrumbs, Code, Empty, LayerCard, Meter, Surface (deprecated), Text
 * - **Feedback:** Banner, Loader, Toast
 * - **Input:** Checkbox, Combobox, DateRangePicker, Field, Input, Radio, Select, SensitiveInput, Switch
 * - **Layout:** Grid, Surface
 * - **Navigation:** CommandPalette, MenuBar (deprecated), Pagination, Tabs
 * - **Overlay:** Dialog, DropdownMenu, Popover, Tooltip
 * - **Other:** Label, Link
 *
 * **Blocks** (composite page-level components) are NOT exported here.
 * Install them via the CLI: `npx @hellwrk/devil-ui add <block-name>`.
 *
 * **AI resources:** See `devil-ui/ai/component-registry.json` for full
 * component metadata including prop descriptions, variant values, and examples.
 *
 * @see {@link https://kumo-ui.com} — Documentation site
 */

// Components
export { Badge, type BadgeVariant } from "./components/badge";
export { Banner, BannerVariant } from "./components/banner";
export {
  Button,
  RefreshButton,
  LinkButton,
  buttonVariants,
  type ButtonProps,
  type LinkButtonProps,
} from "./components/button";
/**
 * @deprecated Use {@link DatePicker} with `mode="range"` instead.
 */
export { DateRangePicker } from "./components/date-range-picker";
export {
  Checkbox,
  type CheckboxProps,
  type CheckboxLegendProps,
  type CheckboxChangeEventDetails,
} from "./components/checkbox";
export { ClipboardText } from "./components/clipboard-text";
export { Code, CodeBlock } from "./components/code";
export { Combobox } from "./components/combobox";
export {
  Toolbar,
  DEVIL_TOOLBAR_VARIANTS,
  DEVIL_TOOLBAR_DEFAULT_VARIANTS,
  type ToolbarProps,
  type ToolbarSize,
  type ToolbarButtonProps,
  type ToolbarLinkProps,
  type ToolbarInputProps,
  type ToolbarInputGroupProps,
} from "./components/toolbar";
export {
  Dialog,
  DialogRoot,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
  type DialogProps,
  type DialogRootProps,
  type DialogTriggerProps,
  type DialogTitleProps,
  type DialogDescriptionProps,
  type DialogCloseProps,
} from "./components/dialog";
export { DropdownMenu } from "./components/dropdown";
export {
  Collapsible,
  type CollapsibleProps,
  type CollapsibleRootProps,
  type CollapsibleTriggerProps,
  type CollapsiblePanelProps,
  type CollapsibleDefaultTriggerProps,
  type CollapsibleDefaultPanelProps,
} from "./components/collapsible";
export {
  Field,
  type FieldProps,
  type FieldErrorMatch,
  fieldVariants,
  DEVIL_FIELD_VARIANTS,
  DEVIL_FIELD_DEFAULT_VARIANTS,
} from "./components/field";
export {
  Label,
  type LabelProps,
  labelVariants,
  labelContentVariants,
  DEVIL_LABEL_VARIANTS,
  DEVIL_LABEL_DEFAULT_VARIANTS,
} from "./components/label";
export {
  Input,
  inputVariants,
  type InputProps,
  InputArea,
  Textarea,
  type InputAreaProps,
} from "./components/input";
export {
  InputGroup,
  type InputGroupRootProps,
  type InputGroupAddonProps,
  type InputGroupSuffixProps,
  type InputGroupInputProps,
  type InputGroupButtonProps,
} from "./components/input-group";
export { LayerCard } from "./components/layer-card";
export {
  DeleteResource,
  DEVIL_DELETE_RESOURCE_VARIANTS,
  DEVIL_DELETE_RESOURCE_DEFAULT_VARIANTS,
  type DeleteResourceProps,
} from "./blocks/delete-resource";
export { Loader, SkeletonLine } from "./components/loader";
/**
 * @deprecated Use {@link Tabs} with `variant="segmented"` instead. `MenuBar` will be removed in a future release.
 */
export { MenuBar, useMenuNavigation } from "./components/menubar";
export { Meter } from "./components/meter";
export { Pagination } from "./components/pagination";
export { Select } from "./components/select";
/**
 * @deprecated Use {@link LayerCard} instead.
 */
export { Surface } from "./components/surface";
export { Switch, type SwitchLegendProps } from "./components/switch";
export { Tabs, type TabsProps, type TabsItem } from "./components/tabs";
export { Table } from "./components/table";
export { Text } from "./components/text";
export {
  Toasty,
  ToastProvider,
  Toast,
  useDevilToastManager,
  createDevilToastManager,
} from "./components/toast";
export { Tooltip, TooltipProvider } from "./components/tooltip";
export {
  Popover,
  DEVIL_POPOVER_VARIANTS,
  DEVIL_POPOVER_DEFAULT_VARIANTS,
  type PopoverRootProps,
  type PopoverTriggerProps,
  type PopoverContentProps,
  type PopoverTitleProps,
  type PopoverDescriptionProps,
  type PopoverCloseProps,
} from "./components/popover";
export {
  SensitiveInput,
  type SensitiveInputProps,
  DEVIL_SENSITIVE_INPUT_VARIANTS,
  DEVIL_SENSITIVE_INPUT_DEFAULT_VARIANTS,
} from "./components/sensitive-input";
export {
  Radio,
  RadioGroup,
  DEVIL_RADIO_VARIANTS,
  DEVIL_RADIO_DEFAULT_VARIANTS,
  radioVariants,
  type RadioGroupProps,
  type RadioGroupChangeEventDetails,
  type RadioLegendProps,
  type RadioItemProps,
  type RadioControlPosition,
  type DevilRadioVariant,
  type DevilRadioAppearance,
  type DevilRadioVariantsProps,
  type RadioVariant,
} from "./components/radio";
export {
  CommandPalette,
  DEVIL_COMMAND_PALETTE_VARIANTS,
  DEVIL_COMMAND_PALETTE_DEFAULT_VARIANTS,
  type CommandPaletteRootProps,
  type CommandPaletteInputProps,
  type CommandPaletteItemProps,
  type CommandPaletteResultItemProps,
  type CommandPaletteFooterProps,
  type CommandPaletteListProps,
  type CommandPaletteGroupProps,
  type CommandPaletteGroupLabelProps,
  type CommandPaletteEmptyProps,
  type CommandPaletteLoadingProps,
  type HighlightRange,
} from "./components/command-palette";
export {
  Link,
  linkVariants,
  DEVIL_LINK_VARIANTS,
  DEVIL_LINK_DEFAULT_VARIANTS,
  type LinkProps,
  type DevilLinkVariant,
  type DevilLinkVariantsProps,
} from "./components/link";
export { Breadcrumbs, type BreadcrumbsProps } from "./components/breadcrumbs";
export { Empty, type EmptyProps } from "./components/empty";
export {
  Grid,
  GridItem,
  gridVariants,
  gridItemVariants,
  DEVIL_GRID_VARIANTS,
  DEVIL_GRID_DEFAULT_VARIANTS,
  type GridProps,
  type GridItemProps,
  type DevilGridVariant,
  type DevilGridGap,
} from "./components/grid";
export {
  CloudflareLogo,
  DEVIL_CLOUDFLARE_LOGO_VARIANTS,
  DEVIL_CLOUDFLARE_LOGO_DEFAULT_VARIANTS,
  type CloudflareLogoProps,
  type CloudflareLogoVariant,
  type CloudflareLogoColor,
  // PoweredByCloudflare component
  PoweredByCloudflare,
  type PoweredByCloudflareProps,
  // SVG generation helper
  generateCloudflareLogoSvg,
  type GenerateCloudflareLogoSvgOptions,
  type CloudflareLogoSvgVariant,
  type CloudflareLogoSvgColor,
} from "./components/cloudflare-logo";
// DatePicker
export {
  DatePicker,
  type DatePickerProps,
  type DateRange,
  type DayPickerProps,
} from "./components/date-picker";

export { Flow } from "./components/flow";
export {
  Chart,
  ChartPalette,
  SankeyChart,
  TimeseriesChart,
  ChartLegend,
  BubbleMap,
  ChoroplethMap,
  GlobeMap,
  type DevilChartOption,
  type SankeyChartProps,
  type SankeyNodeData,
  type SankeyLinkData,
  type SankeyTooltipParams,
  type MapGeoJson,
  type MapProjection,
  type MapAccessor,
  type MapStyle,
  type BubbleMapProps,
  type ChoroplethMapProps,
  type GlobeMapProps,
  type GlobeMapMarker,
} from "./components/chart";
export {
  Autocomplete,
  type AutocompleteProps,
  type DevilAutocompleteSize,
  autocompleteVariants,
  DEVIL_AUTOCOMPLETE_VARIANTS,
  DEVIL_AUTOCOMPLETE_DEFAULT_VARIANTS,
} from "./components/autocomplete";

// Sidebar
export {
  Sidebar,
  SidebarProvider,
  SidebarRoot,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarLoading,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
  SidebarTrigger,
  SidebarRail,
  SidebarResizeHandle,
  SidebarMenuChevron,
  SidebarCollapsible,
  SidebarCollapsibleTrigger,
  SidebarCollapsibleContent,
  SidebarSlidingViews,
  SidebarSlidingView,
  useSidebar,
  DEVIL_SIDEBAR_VARIANTS,
  DEVIL_SIDEBAR_DEFAULT_VARIANTS,
  DEVIL_SIDEBAR_STYLING,
  type SidebarState,
  type SidebarSide,
  type SidebarVariant,
  type SidebarCollapsible as SidebarCollapsibleType,
  type SidebarContextValue,
  type SidebarProviderProps,
  type SidebarRootProps,
  type SidebarScrollAlign,
  type SidebarScrollToItemOptions,
  type SidebarMenuItemProps,
  type SidebarMenuButtonSize,
  type SidebarMenuButtonProps,
  type SidebarMenuSubButtonProps,
} from "./components/sidebar";
export {
  TableOfContents,
  type TableOfContentsProps,
  type TableOfContentsTitleProps,
  type TableOfContentsListProps,
  type TableOfContentsItemProps,
  type TableOfContentsGroupProps,
  DEVIL_TABLE_OF_CONTENTS_VARIANTS,
  DEVIL_TABLE_OF_CONTENTS_DEFAULT_VARIANTS,
  type DevilTableOfContentsState,
  useTableOfContentsActiveId,
  type UseTableOfContentsActiveIdOptions,
  type UseTableOfContentsActiveIdResult,
} from "./components/table-of-contents";
export {
  ButtonGroup,
  DEVIL_BUTTON_GROUP_VARIANTS,
  DEVIL_BUTTON_GROUP_DEFAULT_VARIANTS,
  DEVIL_BUTTON_GROUP_STYLING,
  type ButtonGroupProps,
} from "./components/button-group";
export {
  TagInput,
  type TagInputLabels,
  type TagInputProps,
} from "./components/tag-input";
export {
  LayerDialog,
  type LayerDialogProps,
  type LayerDialogActionsProps,
  type LayerDialogBodyProps,
  type LayerDialogContentProps,
  type LayerDialogDescriptionProps,
  type LayerDialogPrimaryProps,
  type LayerDialogRootProps,
  type LayerDialogTitleProps,
  type DevilLayerDialogPrimaryVariant,
  type DevilLayerDialogSize,
  type DevilLayerDialogVerticalAlign,
} from "./components/layer-dialog";
// PLOP_INJECT_EXPORT

// Utils
export { cn, safeRandomId } from "./utils/cn";
export {
  LinkProvider,
  useLinkComponent,
  type LinkComponentProps,
} from "./utils/link-provider";
export {
  DevilPortalProvider,
  type PortalContainer,
} from "./utils/portal-provider";
export {
  DevilLocaleProvider,
  type DevilLocaleProviderProps,
  type DevilTranslations,
  type DevilTranslationsPartial,
} from "./utils/locale-provider";

// Registry types (for consuming packages to type registry JSON)
export type {
  ComponentRegistry,
  ComponentSchema,
  ComponentStyling,
  ComponentType,
  PropSchema,
  SubComponentSchema,
} from "./registry/types";
