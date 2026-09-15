import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@hellwrk/devil-ui";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Fades + rises content into view the first time it enters the viewport.
 * Scroll-position based (no IntersectionObserver): deterministic in every
 * browser and embed context.
 *
 * Content renders visible by default (SSR-safe) and is only hidden once
 * the island hydrates — so nothing ever gets stuck invisible when JS
 * is slow or disabled.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let revealed = false;
    let raf = 0;

    const check = () => {
      if (revealed) return;
      const rect = el.getBoundingClientRect();
      const threshold = window.innerHeight * 0.92;
      if (rect.top < threshold && rect.bottom > 0) {
        revealed = true;
        el.classList.add("is-visible");
        window.removeEventListener("scroll", onScroll, { capture: false });
        window.removeEventListener("resize", onScroll);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(check);
    };

    el.classList.add("landing-reveal-arm");
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("landing-reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
