import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { requiresDevilChangeset } from "./validate-devil-changeset";

describe("requiresDevilChangeset", () => {
  it("ignores a package README-only change", () => {
    assert.equal(requiresDevilChangeset(["packages/devil-ui/README.md"]), false);
  });

  it("requires a changeset for package source changes", () => {
    assert.equal(
      requiresDevilChangeset([
        "packages/devil-ui/README.md",
        "packages/devil-ui/src/index.ts",
      ]),
      true,
    );
  });
});
