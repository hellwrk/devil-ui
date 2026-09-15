import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";
import { cn, Text } from "@hellwrk/devil-ui";
import type { ReactNode } from "react";

interface DesignTipProps {
  children?: ReactNode;
}

interface DesignTipRootProps extends DesignTipProps {
  id: string;
}

interface DesignTipExamplesProps extends DesignTipProps {
  orientation?: "horizontal" | "vertical";
}

interface DesignTipExampleProps extends DesignTipProps {
  variant: "good" | "bad";
}

export function DesignTip({ children, id }: DesignTipRootProps) {
  return (
    <article
      id={id}
      className={cn("grid min-w-0 scroll-mt-24 grid-cols-[minmax(0,1fr)]")}
    >
      {children}
    </article>
  );
}

function DesignTipTitle({ children }: DesignTipProps) {
  return (
    <Text as="h3" DANGEROUS_className="text-xl font-semibold leading-tight">
      {children}
    </Text>
  );
}

function DesignTipDescription({ children }: DesignTipProps) {
  return (
    <div className="mt-3 md:mt-4">
      <Text as="span" DANGEROUS_className="leading-relaxed text-pretty">
        {children}
      </Text>
    </div>
  );
}

function DesignTipExamples({
  children,
  orientation = "horizontal",
}: DesignTipExamplesProps) {
  return (
    <div className="mt-6 rounded-xl bg-devil-tint p-2 ring ring-devil-line md:-mx-2">
      <div
        className={cn(
          "divide-devil-line overflow-hidden rounded-lg bg-devil-base shadow-md ring ring-devil-line",
          orientation === "horizontal"
            ? "divide-y md:flex md:divide-x md:divide-y-0"
            : "divide-y [&>figure>div]:min-h-0",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function DesignTipExample({ children, variant }: DesignTipExampleProps) {
  const isGood = variant === "good";

  return (
    <figure className={cn("relative min-w-0 flex-1")}>
      <figcaption className={cn("absolute top-2 right-2")}>
        {isGood ? (
          <CheckCircleIcon
            aria-hidden="true"
            size={32}
            weight="fill"
            className={cn("text-devil-success")}
          />
        ) : (
          <XCircleIcon
            aria-hidden="true"
            size={32}
            weight="fill"
            className={cn("text-devil-danger")}
          />
        )}
        <span className={cn("sr-only")}>
          {isGood ? "Recommended example" : "Example to avoid"}
        </span>
      </figcaption>
      <div
        className={cn(
          "flex h-full min-h-[200px] min-w-0 items-center justify-center p-6 has-[>.code-block]:p-0",
        )}
      >
        {children}
      </div>
    </figure>
  );
}

DesignTip.Title = DesignTipTitle;
DesignTip.Description = DesignTipDescription;
DesignTip.Examples = DesignTipExamples;
DesignTip.Example = DesignTipExample;
