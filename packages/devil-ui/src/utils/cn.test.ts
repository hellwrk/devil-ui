import { describe, expect, it } from "vite-plus/test";

import { cn } from "./cn";

describe("cn", () => {
  it.each([
    [["p-2", "p-4"], "p-4"],
    [["px-2 py-1", "px-4"], "py-1 px-4"],
    [["text-devil-default", "text-devil-subtle"], "text-devil-subtle"],
    [["bg-devil-base", "bg-devil-elevated"], "bg-devil-elevated"],
    [["border-devil-line", "border-devil-strong"], "border-devil-strong"],
    [
      ["hover:bg-devil-base", "hover:bg-devil-elevated"],
      "hover:bg-devil-elevated",
    ],
    [["sm:p-2", "sm:p-4", "md:p-6"], "sm:p-4 md:p-6"],
    [
      ["data-[state=open]:bg-devil-base", "data-[state=open]:bg-devil-elevated"],
      "data-[state=open]:bg-devil-elevated",
    ],
    [["rounded-[10px]", "rounded-[12px]"], "rounded-[12px]"],
    [["!p-2", "p-4"], "!p-2 p-4"],
    [["p-2", "!p-4"], "p-2 !p-4"],
    [
      ["base", false, null, undefined, { active: true, disabled: false }],
      "base active",
    ],
    [[["flex", ["gap-2", "gap-4"]]], "flex gap-4"],
  ])(
    "merges classes without changing expected output for case %#",
    (inputs, expected) => {
      expect(cn(...inputs)).toBe(expected);
    },
  );
});
