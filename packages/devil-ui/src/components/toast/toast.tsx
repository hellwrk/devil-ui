import {
  Toast,
  ToastManagerAddOptions,
  ToastManagerUpdateOptions,
  ToastObject,
} from "@base-ui/react/toast";
import type React from "react";
import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";
import { Button, ButtonProps } from "../../components/button";
import {
  usePortalContainer,
  type PortalContainer,
} from "../../utils/portal-provider";
import {
  CheckCircleIcon,
  InfoIcon,
  WarningIcon,
  WarningOctagonIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";

/**
 * Toast styling configuration for registry consumers.
 * Toast has no user-facing variants but documents the styling structure.
 */
export const DEVIL_TOAST_VARIANTS = {
  root: {
    classes:
      "rounded-lg border border-devil-fill bg-devil-control p-4 shadow-lg text-devil-default",
    description: "Toast container with background, border, and shadow",
  },
  title: {
    classes: "text-[0.975rem] leading-5 font-medium text-devil-default",
    description: "Toast title with primary text color",
  },
  description: {
    classes: "text-[0.925rem] leading-5 text-devil-subtle",
    description: "Toast description with muted text color",
  },
  close: {
    classes:
      "absolute top-2 right-2 size-5 rounded text-devil-subtle hover:bg-current/15",
    description: "Button-based close control with variant-aware hover tint",
  },
  variant: {
    default: {
      classes: "border-devil-fill bg-devil-base",
      description: "Default toast style",
    },
    success: {
      classes:
        "ring-[0.3px] ring-devil-success bg-devil-base [&_[data-toast-icon]]:text-devil-success [&_[data-toast-title]]:text-devil-success",
      description: "Success toast for confirmations and positive outcomes",
      icon: CheckCircleIcon,
    },
    error: {
      classes:
        "ring-[0.3px] ring-devil-danger bg-devil-base [&_[data-toast-icon]]:text-devil-danger [&_[data-toast-title]]:text-devil-danger",
      description: "Error toast for critical issues",
      icon: WarningOctagonIcon,
    },
    warning: {
      classes:
        "ring-[0.3px] ring-devil-warning bg-devil-base [&_[data-toast-icon]]:text-devil-warning [&_[data-toast-title]]:text-devil-warning",
      description: "Warning toast for cautionary messages",
      icon: WarningIcon,
    },
    info: {
      classes:
        "ring-[0.3px] ring-devil-info bg-devil-control [&_[data-toast-icon]]:text-devil-info [&_[data-toast-title]]:text-devil-info",
      description: "Info toast for neutral informational messages",
      icon: InfoIcon,
    },
  },
} as const;

export const DEVIL_TOAST_DEFAULT_VARIANTS = {
  variant: "default",
} as const;

/**
 * Toast styling configuration for registry consumers.
 * Provides structured metadata for generating Toast components from metadata.
 */
export const DEVIL_TOAST_STYLING = {
  container: {
    width: 300,
    padding: 16,
    borderRadius: 8,
    background: "bg-devil-base",
    border: "ring-[0.3px] ring-devil-hairline",
    shadow: "shadow-lg",
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    color: "text-color-surface",
  },
  description: {
    fontSize: 15,
    fontWeight: 400,
    color: "text-color-muted",
  },
  closeButton: {
    size: 20,
    iconSize: 16,
    iconName: "ph-x",
    iconColor: "text-color-muted",
    hoverBackground: "color-color-2",
    hoverColor: "text-color-label",
    borderRadius: 4,
  },
} as const;

// Derived types from DEVIL_TOAST_VARIANTS
export type DevilToastVariant = keyof typeof DEVIL_TOAST_VARIANTS.variant;

export interface DevilToastVariantsProps {
  variant?: DevilToastVariant;
}

export function toastVariants({
  variant = DEVIL_TOAST_DEFAULT_VARIANTS.variant,
}: DevilToastVariantsProps = {}) {
  return cn(
    // Base styles for toast root
    "rounded-xl ring ring-devil-line bg-clip-padding p-4 shadow-lg",
    // Apply variant styles from DEVIL_TOAST_VARIANTS
    resolveVariant(
      DEVIL_TOAST_VARIANTS.variant,
      variant,
      DEVIL_TOAST_DEFAULT_VARIANTS.variant,
    ).classes,
  );
}

/**
 * Toasty component props.
 *
 * Wrap your app with `<Toasty>` to enable toast notifications.
 * Use `Toast.useToastManager().notify(…)` to create toasts.
 *
 * @example
 * ```tsx
 * // 1. Wrap your app
 * <Toasty>
 *   <App />
 * </Toasty>
 *
 * // 2. Show a toast from any child component
 * const toasts = Toast.useToastManager();
 * toasts.notify({ title: "Saved", description: "Changes saved successfully." });
 * ```
 *
 * @example Dispatching toasts from non-React-component code
 * ```tsx
 * // 1. Create a manager at module scope
 * import { createDevilToastManager } from "@hellwrk/devil-ui";
 * export const appToastManager = createDevilToastManager();
 *
 * // 2. Pass it to <Toasty>
 * <Toasty toastManager={appToastManager}>
 *   <App />
 * </Toasty>
 *
 * // 3. Dispatch from anywhere — timers, callbacks, query-cache listeners
 * appToastManager.add({ title: "Saved" });
 * ```
 */
export interface ToastyProps extends DevilToastVariantsProps {
  /** Application content. Toasts render via a portal above this. */
  children: React.ReactNode;
  /**
   * Container element for the portal. Use this to render toasts inside
   * a Shadow DOM or custom container. Overrides `DevilPortalProvider` context.
   * @default document.body (or DevilPortalProvider container if set)
   */
  container?: PortalContainer;
  /**
   * Optional toast manager created by `createDevilToastManager()`. When
   * provided, allows code outside the React tree (timers, module-load
   * callbacks, query-cache listeners) to dispatch toasts via the same
   * dedupe-aware manager that `useDevilToastManager()` returns inside the
   * tree.
   *
   * Forwarded to the underlying `@base-ui/react/toast` `Toast.Provider`
   * `toastManager` prop — see
   * https://base-ui.com/react/components/toast for the upstream primitive.
   */
  toastManager?: ReturnType<typeof createDevilToastManager>;
}

type DevilToastOptionsBase = {
  variant?: DevilToastVariant;
  content?: React.ReactNode;
  actions?: Array<ButtonProps>;
  bump?: boolean;
};

export type DevilToastOptions<Data extends object> = ToastObject<Data> &
  DevilToastOptionsBase;

export type DevilToastManagerAddOptions<Data extends object> =
  ToastManagerAddOptions<Data> & DevilToastOptionsBase;

export type DevilToastManagerUpdateOptions<Data extends object> =
  ToastManagerUpdateOptions<Data> & DevilToastOptionsBase;

function wrapManagerMethods<
  T extends { add: Function; update: Function; promise: Function },
>(manager: T) {
  return {
    ...manager,

    add: (options: DevilToastManagerAddOptions<any>) => {
      if (options.id) {
        const toasts = (manager as any).toasts as
          Array<ToastObject<any>> | undefined;

        if (toasts) {
          const existingToast = toasts.find((toast) => toast.id === options.id);

          // If toast exists and is not exiting, trigger bump and prevent duplicate
          if (existingToast && existingToast.transitionStatus !== "ending") {
            // Reset animation by disabling then re-enabling
            manager.update(options.id, { bump: false });
            requestAnimationFrame(() => {
              manager.update(options.id, {
                bump: true,
                ...(options.timeout !== undefined && {
                  timeout: options.timeout,
                }),
              });
            });
            return options.id;
          }

          // If toast exists and is exiting, let it finish - don't add duplicate
          if (existingToast && existingToast.transitionStatus === "ending") {
            return options.id;
          }
        }
      }

      return manager.add({
        ...options,
      });
    },

    update: (
      id: string,
      options:
        | DevilToastManagerUpdateOptions<any>
        | ((
            prevToast: DevilToastOptions<any>,
          ) => DevilToastManagerUpdateOptions<any>),
    ) => {
      return manager.update(
        id,
        typeof options === "function"
          ? (prevToast: ToastObject<any>) => options(prevToast)
          : { ...options },
      );
    },

    promise: <T,>(
      promise: Promise<T>,
      options: {
        loading: DevilToastManagerAddOptions<any>;
        success:
          | DevilToastManagerAddOptions<any>
          | ((data: T) => DevilToastManagerAddOptions<any>);
        error:
          | DevilToastManagerAddOptions<any>
          | ((error: Error) => DevilToastManagerAddOptions<any>);
      },
    ) => {
      return manager.promise(promise, {
        loading: { ...options.loading },
        success:
          typeof options.success === "function"
            ? (data: T) => ({
                ...(
                  options.success as (
                    data: T,
                  ) => DevilToastManagerAddOptions<any>
                )(data),
              })
            : { ...options.success },
        error:
          typeof options.error === "function"
            ? (error: Error) => ({
                ...(
                  options.error as (
                    error: Error,
                  ) => DevilToastManagerAddOptions<any>
                )(error),
              })
            : { ...options.error },
      });
    },
  };
}

export const useDevilToastManager = () => {
  const manager = Toast.useToastManager();
  return {
    ...wrapManagerMethods(manager),
    toasts: manager.toasts as Array<DevilToastOptions<any>>,
  };
};

export const createDevilToastManager = () => {
  return wrapManagerMethods(Toast.createToastManager());
};

/**
 * Toasty — toast notification provider and viewport.
 *
 * Renders a `Toast.Provider` with a fixed-position viewport in the bottom-right corner.
 * Toasts stack with smooth enter/exit animations, swipe-to-dismiss, and expand-on-hover.
 *
 * Built on `@base-ui/react/toast`.
 *
 * @example
 * ```tsx
 * <Toasty>
 *   <App />
 * </Toasty>
 * ```
 */
export function Toasty({
  children,
  container: containerProp,
  toastManager,
}: ToastyProps) {
  const contextContainer = usePortalContainer();
  const container = containerProp ?? contextContainer ?? undefined;

  return (
    <Toast.Provider toastManager={toastManager}>
      {children}
      <Toast.Portal container={container}>
        <Toast.Viewport className="fixed top-auto right-4 bottom-4 z-1 mx-auto flex w-[calc(100%-2rem)] sm:right-8 sm:bottom-8 sm:w-[340px]">
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

/** Alias for Toasty — provided for discoverability when migrating from other libraries */
export const ToastProvider = Toasty;

function ToastList() {
  const { toasts } = useDevilToastManager();
  return toasts.map((toast) => (
    <Toast.Root
      key={toast.id}
      toast={toast}
      className={cn(
        "absolute right-0 bottom-0 left-auto z-[calc(1000-var(--toast-index))] mr-0 h-[var(--height)] w-full origin-bottom select-none",
        toastVariants({ variant: toast.variant }),
        "[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]",
        "[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] [transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s]",
        "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
        "data-[ending-style]:opacity-0 data-[expanded]:h-[var(--toast-height)] data-[expanded]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))] data-[limited]:opacity-0 data-[starting-style]:[transform:translateY(150%)]",
        "data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))] data-[expanded]:data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
        "data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-[expanded]:data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
        "data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] data-[expanded]:data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
        "data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))] data-[expanded]:data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
        "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
        toast.bump && "animate-toast-bump",
      )}
    >
      <ToastBackground variant={toast.variant} />
      <Toast.Content className="isolate flex flex-col gap-1 transition-opacity [transition-duration:250ms] data-[behind]:pointer-events-none data-[behind]:opacity-0 data-[expanded]:pointer-events-auto data-[expanded]:opacity-100">
        {toast.content ?? (
          <>
            <div className="flex items-start gap-2">
              <ToastIcon variant={toast.variant} />
              <div className="flex flex-col gap-1 overflow-hidden">
                <Toast.Title
                  data-toast-title
                  className="text-[0.975rem] leading-5 font-medium text-devil-default"
                />
                <Toast.Description className="text-[0.925rem] leading-5 text-devil-default/70" />

                {!!toast.actions && (
                  <div className="mt-2 flex min-w-0 flex-nowrap gap-2 overflow-x-auto p-px">
                    {toast.actions.map((actionProps, idx) => (
                      <Button key={idx} {...actionProps} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        <Toast.Close
          data-devil-part="close"
          aria-label="Close"
          render={
            <Button
              variant="ghost"
              size="sm"
              shape="square"
              aria-label="Close"
              className={cn(
                "absolute top-2 right-2 size-5 rounded text-devil-subtle hover:bg-current/15",
                toast.variant && TOAST_CLOSE_CLASSES[toast.variant],
              )}
              icon={<XIcon className="h-3 w-3" />}
            />
          }
        />
      </Toast.Content>
    </Toast.Root>
  ));
}

const TOAST_CLOSE_CLASSES: Record<string, string> = {
  success: "text-devil-success",
  error: "text-devil-danger",
  warning: "text-devil-warning",
  info: "text-devil-info",
};

const TOAST_BACKGROUND_CLASSES: Record<string, string> = {
  success: "bg-devil-success-tint/20",
  error: "bg-devil-danger-tint/50",
  warning: "bg-devil-warning-tint/50",
  info: "bg-devil-info-tint/50",
};

function ToastBackground({ variant }: { variant?: DevilToastVariant }) {
  const background = variant && TOAST_BACKGROUND_CLASSES[variant];
  return (
    <div
      className={cn(
        "absolute inset-0 rounded-xl bg-devil-base/90",
        background,
      )}
    />
  );
}

function ToastIcon({ variant }: { variant?: DevilToastVariant }) {
  if (!variant || variant === "default") return null;
  const variantConfig = resolveVariant(
    DEVIL_TOAST_VARIANTS.variant,
    variant,
    DEVIL_TOAST_DEFAULT_VARIANTS.variant,
  );
  if (!("icon" in variantConfig)) return null;
  const Icon = variantConfig.icon;
  return (
    <Icon data-toast-icon className="mt-0.5 h-4 w-4 shrink-0" weight="fill" />
  );
}
