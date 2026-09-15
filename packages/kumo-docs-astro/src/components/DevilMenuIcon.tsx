import { cn } from "@hellwrk/devil-ui";

interface DevilMenuIconProps {
  className?: string;
}

export function DevilMenuIcon({ className }: DevilMenuIconProps) {
  return (
    <img
      src="/devil-ui-hd.png"
      alt=""
      aria-hidden="true"
      className={cn("h-[19.8px] w-[20px] object-contain", className)}
    />
  );
}
