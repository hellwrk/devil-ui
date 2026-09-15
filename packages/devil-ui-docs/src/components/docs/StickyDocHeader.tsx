import { useEffect, useRef, useState } from "react";
import { cn } from "@hellwrk/devil-ui";
import { GithubLogoIcon } from "@phosphor-icons/react";
import { ThemeToggle } from "../ThemeToggle";
import { BaseUIIcon } from "./icons/BaseUIIcon";

interface StickyDocHeaderProps {
  title: string;
  githubSourceUrl?: string | null;
  baseUIUrl?: string | null;
}

export function StickyDocHeader({
  title,
  githubSourceUrl,
  baseUIUrl,
}: StickyDocHeaderProps) {
  const [showStickyTitle, setShowStickyTitle] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const headerRef = useRef<HTMLElement>(null);

  // Watch for sidebar state changes
  useEffect(() => {
    const checkSidebarState = () => {
      const sidebar = document.querySelector("aside[data-sidebar-open]");
      if (sidebar) {
        const isOpen = sidebar.getAttribute("data-sidebar-open") === "true";
        setSidebarOpen(isOpen);
      }
    };

    // Check initially
    checkSidebarState();

    // Watch for attribute changes
    const sidebar = document.querySelector("aside[data-sidebar-open]");
    if (!sidebar) return;

    const observer = new MutationObserver(checkSidebarState);
    observer.observe(sidebar, {
      attributes: true,
      attributeFilter: ["data-sidebar-open"],
    });

    return () => observer.disconnect();
  }, []);

  // Watch for page header visibility
  useEffect(() => {
    const pageHeader = document.getElementById("page-header");
    if (!headerRef.current || !pageHeader) return;

    const margin = Math.round(headerRef.current.getBoundingClientRect().bottom);

    // Show sticky title when page header's bottom edge scrolls past the sticky header's bottom edge
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyTitle(!entry.isIntersecting);
      },
      { rootMargin: `-${margin}px 0px 0px 0px` },
    );

    observer.observe(pageHeader);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Sticky title that appears when sidebar is collapsed - positioned to appear after "devil-ui" */}
      {!sidebarOpen && (
        <div
          className={cn(
            "pointer-events-none fixed top-0 left-9 z-50 flex h-12 items-center font-medium transition-opacity duration-200 select-none",
            showStickyTitle ? "opacity-100" : "opacity-0",
          )}
          style={{ paddingLeft: "7.5rem" }} // Position after "devil-ui" text (px-4 + "devil-ui" width)
        >
          <span className="pointer-events-auto flex items-center gap-2 text-base">
            <span className="text-devil-subtle">/ </span>
            <span className="font-semibold tracking-tight">{title}</span>
            {githubSourceUrl && (
              <a
                href={githubSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-devil-subtle transition-colors hover:text-devil-default"
                title="View source on GitHub"
                aria-label="View source on GitHub"
                tabIndex={showStickyTitle ? 0 : -1}
              >
                <GithubLogoIcon size={14} weight="fill" />
              </a>
            )}
            {baseUIUrl && (
              <a
                href={baseUIUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-devil-subtle transition-colors hover:text-devil-default"
                title="View Base UI documentation"
                aria-label="View Base UI documentation"
                tabIndex={showStickyTitle ? 0 : -1}
              >
                <BaseUIIcon size={14} />
              </a>
            )}
          </span>
        </div>
      )}

      {/* Sticky header bar */}
      <header
        ref={headerRef}
        className="sticky top-12 z-10 flex h-12 border-b border-devil-hairline bg-devil-canvas lg:top-0"
      >
        <div className="flex min-w-0 flex-1 items-center justify-between px-4 md:px-6 lg:border-r lg:border-devil-hairline lg:px-4">
          <div
            className={cn(
              "flex items-center gap-2 transition-opacity duration-200",
              showStickyTitle && sidebarOpen
                ? "opacity-100"
                : "pointer-events-none opacity-0",
            )}
          >
            <span className="text-base font-medium">{title}</span>
            {githubSourceUrl && (
              <a
                href={githubSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-devil-subtle transition-colors hover:text-devil-default"
                title="View source on GitHub"
                aria-label="View source on GitHub"
                tabIndex={showStickyTitle && sidebarOpen ? 0 : -1}
              >
                <GithubLogoIcon size={14} weight="fill" />
              </a>
            )}
            {baseUIUrl && (
              <a
                href={baseUIUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-devil-subtle transition-colors hover:text-devil-default"
                title="View Base UI documentation"
                aria-label="View Base UI documentation"
                tabIndex={showStickyTitle && sidebarOpen ? 0 : -1}
              >
                <BaseUIIcon size={14} />
              </a>
            )}
          </div>
          <a
            href="https://github.com/hellwrk/devil-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-devil-subtle transition-colors hover:text-devil-default"
          >
            devil-ui
          </a>
        </div>
        <div className="hidden w-12 shrink-0 items-center justify-center lg:flex">
          <ThemeToggle />
        </div>
      </header>
    </>
  );
}
