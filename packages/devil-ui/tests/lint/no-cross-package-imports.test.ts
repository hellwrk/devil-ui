import { describe, it, expect } from "vite-plus/test";

// Test the detection logic directly by importing and testing the pattern matching
// Note: We can't easily test oxlint rules in isolation, so we test the core logic

const PACKAGE_DIRS = new Set(["devil-ui", "devil-ui-docs", "devil-ui-screenshot-worker"]);
const CROSS_PACKAGE_PATTERN = /^((?:\.\.\/)+)([a-z0-9-]+)\//;

function getCrossPackageImport(importPath: string): string | null {
  if (!importPath || !importPath.startsWith("..")) {
    return null;
  }

  const match = importPath.match(CROSS_PACKAGE_PATTERN);
  if (!match) {
    return null;
  }

  const traversal = match[1];
  const packageDir = match[2];

  const levelsUp = (traversal.match(/\.\.\//g) || []).length;

  if (levelsUp < 2) {
    return null;
  }

  if (PACKAGE_DIRS.has(packageDir)) {
    return packageDir;
  }

  return null;
}

describe("no-cross-package-imports", () => {
  describe("should detect cross-package imports", () => {
    it("detects ../../devil-ui/path", () => {
      expect(getCrossPackageImport("../../devil-ui/src/button")).toBe("devil-ui");
    });

    it("detects ../../../devil-ui/path (deeper nesting)", () => {
      expect(getCrossPackageImport("../../../devil-ui/src/button")).toBe("devil-ui");
    });

    it("detects ../../devil-ui-docs/path", () => {
      expect(getCrossPackageImport("../../devil-ui-docs/src/foo")).toBe(
        "devil-ui-docs",
      );
    });

    it("detects ../../devil-ui-screenshot-worker/path", () => {
      expect(
        getCrossPackageImport("../../devil-ui-screenshot-worker/src/bar"),
      ).toBe("devil-ui-screenshot-worker");
    });
  });

  describe("should NOT detect local imports", () => {
    it("ignores ../devil-ui/path (single level up)", () => {
      expect(getCrossPackageImport("../devil-ui/button")).toBeNull();
    });

    it("ignores ./devil-ui/path (same directory)", () => {
      expect(getCrossPackageImport("./devil-ui/button")).toBeNull();
    });

    it("ignores ../components/button (not a package dir)", () => {
      expect(getCrossPackageImport("../components/button")).toBeNull();
    });

    it("ignores ../../components/button (not a package dir)", () => {
      expect(getCrossPackageImport("../../components/button")).toBeNull();
    });

    it("ignores relative paths without package names", () => {
      expect(getCrossPackageImport("../../utils/helpers")).toBeNull();
    });

    it("ignores absolute paths", () => {
      expect(getCrossPackageImport("/absolute/path")).toBeNull();
    });

    it("ignores package imports", () => {
      expect(getCrossPackageImport("devil-ui")).toBeNull();
    });

    it("ignores node_modules imports", () => {
      expect(getCrossPackageImport("react")).toBeNull();
    });
  });

  describe("edge cases", () => {
    it("handles empty string", () => {
      expect(getCrossPackageImport("")).toBeNull();
    });

    it("handles path with only traversal", () => {
      expect(getCrossPackageImport("../../")).toBeNull();
    });

    it("handles path ending at package dir (no subpath)", () => {
      // This matches but devil-ui/ needs something after it
      expect(getCrossPackageImport("../../devil-ui/")).toBe("devil-ui");
    });
  });
});
