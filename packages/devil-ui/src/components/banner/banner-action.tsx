import {
  type CSSProperties,
  createContext,
  forwardRef,
  useContext,
} from "react";
import {
  Button,
  type ButtonProps,
  type DevilButtonSize,
  type DevilButtonVariant,
} from "../button/button";
import { cn } from "../../utils/cn";
import type { DevilBannerVariant } from "./banner";

/**
 * Visual variant for a `Banner.Action`, aligned with `Button`'s `variant` naming.
 * - `"primary"` — filled accent gradient for the main action.
 * - `"secondary"` — transparent with an accent-hued outline (same hue as the banner).
 * - `"ghost"` — text-only accent action with a faint accent-tinted hover.
 */
export type BannerActionVariant = Extract<
  DevilButtonVariant,
  "primary" | "secondary" | "ghost"
>;

/**
 * Size of a `Banner.Action`, matching the equivalent `Button` size specs.
 * - `"xs"` — extra small for dense/compact banners.
 * - `"sm"` — small (default), the standard banner CTA size.
 */
export type BannerActionSize = Extract<DevilButtonSize, "xs" | "sm">;

/** Value shared from the `Banner` root to its `Banner.Action` children. */
export interface BannerActionContextValue {
  /** Banner variant, used to pick the matching accent color. */
  variant: DevilBannerVariant;
  /** Action size derived from the banner's own size. */
  size: BannerActionSize;
}

/**
 * Propagates the banner's variant and action size to `Banner.Action`
 * children so each CTA can self-style without prop drilling:
 * - `variant` — selects the matching accent color.
 * - `size` — a compact `size="sm"` banner renders actions at `"xs"`, and a
 *   `"base"` banner renders them at `"sm"`.
 *
 * The `Banner` root always overrides these defaults via a Provider; the literals
 * mirror a default, base-size banner (kept as literals to avoid a runtime import
 * cycle with `banner.tsx`).
 */
export const BannerActionContext = createContext<BannerActionContextValue>({
  variant: "default",
  size: "sm",
});

/** Per-banner-variant colors passed to the underlying `Button`. */
const BANNER_ACTION_ACCENTS: Record<
  DevilBannerVariant,
  { accent: string; secondary: string; ghost: string }
> = {
  default: {
    accent: "var(--color-devil-info)",
    secondary:
      "text-inherit ring-devil-info/50 fill-devil-info hover:!text-inherit hover:!ring-devil-info/50 hover:bg-devil-info/10",
    ghost: "text-inherit fill-devil-info hover:bg-devil-info/10",
  },
  alert: {
    accent: "var(--color-devil-warning)",
    secondary:
      "text-inherit ring-devil-warning/50 fill-devil-warning hover:!text-inherit hover:!ring-devil-warning/50 hover:bg-devil-warning/10",
    ghost: "text-inherit fill-devil-warning hover:bg-devil-warning/10",
  },
  error: {
    accent: "var(--color-devil-danger)",
    secondary:
      "text-inherit ring-devil-danger/50 fill-devil-danger hover:!text-inherit hover:!ring-devil-danger/50 hover:bg-devil-danger/10",
    ghost: "text-inherit fill-devil-danger hover:bg-devil-danger/10",
  },
  secondary: {
    accent: "var(--color-neutral-700, oklch(37.1% 0 0))",
    secondary:
      "text-inherit ring-devil-focus/20 fill-devil-subtle hover:!text-inherit hover:!ring-devil-focus/20 hover:bg-devil-contrast/10",
    ghost: "text-inherit fill-devil-subtle hover:bg-devil-contrast/10",
  },
};

function bannerActionAccentVars(accent: string) {
  return {
    "--devil-button-emphasis-ring": `color-mix(in oklch, ${accent}, black 10%)`,
    "--devil-button-emphasis-bg": `color-mix(in oklch, ${accent}, white 30%)`,
    "--devil-button-emphasis-gradient-start": `color-mix(in oklch, ${accent}, white 15%)`,
    "--devil-button-emphasis-gradient-end": accent,
  } satisfies CSSProperties & Record<`--${string}`, string>;
}

/** Props for {@link BannerAction}. */
type WithBannerActionVariants<Props> = Props extends ButtonProps
  ? Omit<Props, "size" | "variant"> & {
      /**
       * Visual variant of the CTA, aligned with `Button`'s `variant` naming.
       * - `"primary"` — filled accent gradient for the main action (default).
       * - `"secondary"` — transparent with an accent-hued outline matching the banner.
       * - `"ghost"` — text-only accent action with a faint accent-tinted hover.
       * @default "primary"
       */
      variant?: BannerActionVariant;
    }
  : never;

export type BannerActionProps = WithBannerActionVariants<ButtonProps>;

/**
 * A banner CTA built on Devil's `Button`. It inherits Button's sizing, interaction,
 * loading, and accessibility behavior while supplying banner-specific accent styles.
 *
 * @example
 * ```tsx
 * <Banner.Action onClick={retry}>Retry</Banner.Action>
 * <Banner.Action variant="ghost" icon={<X />} aria-label="Dismiss" />
 * ```
 */
export const BannerAction = forwardRef<HTMLButtonElement, BannerActionProps>(
  function BannerAction(
    { variant = "primary", className, style, ...props },
    ref,
  ) {
    const banner = useContext(BannerActionContext);
    const styles = BANNER_ACTION_ACCENTS[banner.variant];
    const buttonVariant = variant === "secondary" ? "outline" : variant;

    return (
      <Button
        ref={ref}
        variant={buttonVariant}
        size={banner.size}
        className={cn(variant !== "primary" && styles[variant], className)}
        style={
          variant === "primary"
            ? { ...bannerActionAccentVars(styles.accent), ...style }
            : style
        }
        {...props}
      />
    );
  },
);

BannerAction.displayName = "Banner.Action";
