import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "../../components/button";
import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";

/** Empty state size variant definitions mapping sizes to their Tailwind classes. */
export const DEVIL_EMPTY_VARIANTS = {
  size: {
    sm: {
      classes: "px-6 py-8 gap-4",
      description: "Compact empty state for smaller containers",
    },
    base: {
      classes: "px-10 py-16 gap-6",
      description: "Default empty state size",
    },
    lg: {
      classes: "px-12 py-20 gap-8",
      description: "Large empty state for prominent placement",
    },
  },
} as const;

export const DEVIL_EMPTY_DEFAULT_VARIANTS = {
  size: "base",
} as const;

export type DevilEmptySize = keyof typeof DEVIL_EMPTY_VARIANTS.size;

export interface DevilEmptyVariantsProps {
  /**
   * Size of the empty state container.
   * - `"sm"` — Compact empty state for smaller containers
   * - `"base"` — Default empty state size
   * - `"lg"` — Large empty state for prominent placement
   * @default "base"
   */
  size?: DevilEmptySize;
}

export function emptyVariants({
  size = DEVIL_EMPTY_DEFAULT_VARIANTS.size,
}: DevilEmptyVariantsProps = {}) {
  return cn(
    "flex w-full flex-col items-center rounded-xl border border-devil-fill bg-devil-control text-devil-default",
    resolveVariant(
      DEVIL_EMPTY_VARIANTS.size,
      size,
      DEVIL_EMPTY_DEFAULT_VARIANTS.size,
    ).classes,
  );
}

/**
 * Empty state component props.
 *
 * @example
 * ```tsx
 * <Empty
 *   icon={<PackageIcon size={48} />}
 *   title="No packages found"
 *   description="Get started by installing your first package."
 *   commandLine="npm install @hellwrk/devil-ui"
 * />
 * ```
 */
export interface EmptyProps extends DevilEmptyVariantsProps {
  /** Decorative icon displayed above the title (e.g. from `@phosphor-icons/react`). */
  icon?: React.ReactNode;
  /** Primary heading text for the empty state. */
  title: string;
  /** Secondary description text displayed below the title. */
  description?: string;
  /** Shell command displayed in a copyable code block. */
  commandLine?: string;
  /** Additional content (buttons, links) rendered below the description. */
  contents?: React.ReactNode;
  /** Additional CSS classes merged via `cn()`. */
  className?: string;
}

/**
 * Placeholder shown when a list, table, or page has no content to display.
 *
 * @example
 * ```tsx
 * <Empty title="No results found" description="Try adjusting your search." />
 * ```
 */
export function Empty({
  icon,
  title,
  description,
  commandLine,
  contents,
  size = "base",
  className,
}: EmptyProps) {
  const [emptyStateCopied, setEmptyStateCopied] = useState<boolean>(false);

  return (
    <div className={cn(emptyVariants({ size }), className)}>
      {icon}
      <h2 className="text-2xl font-semibold">{title}</h2>

      {description && (
        <p className="max-w-140 text-center text-devil-subtle">{description}</p>
      )}

      {commandLine && (
        <div
          className={cn(
            "group/cmd relative inline-flex h-10 max-w-8/10 transform-gpu items-center gap-2 rounded-lg font-mono shadow-sm",
            "bg-devil-overlay pr-2 pl-3",
            "transition-all duration-300 hover:border-devil-interact/80 hover:shadow-md",
            "border border-devil-fill/60",
          )}
        >
          <span className="text-xs text-devil-inactive select-none">$</span>
          <span className="no-scrollbar overflow-scroll text-base whitespace-nowrap text-devil-brand">
            {commandLine}
          </span>
          <Button
            className="group"
            size="sm"
            variant="ghost"
            shape="square"
            aria-label="Copy command"
            onClick={async () => {
              setEmptyStateCopied(true);
              setTimeout(() => {
                setEmptyStateCopied(false);
              }, 1000);
              await navigator.clipboard.writeText(commandLine);
            }}
          >
            {emptyStateCopied ? (
              <CheckIcon
                size={16}
                className="animate-bounce-in text-devil-success"
              />
            ) : (
              <CopyIcon
                size={16}
                className="text-devil-inactive group-hover:text-devil-brand"
              />
            )}
          </Button>
        </div>
      )}

      {contents}
    </div>
  );
}
