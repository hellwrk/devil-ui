#!/usr/bin/env node
/**
 * Devil CLI - Component registry and blocks distribution
 *
 * Usage:
 *   devil init                 Initialize devil-ui.json configuration
 *   devil ls                   List all components
 *   devil doc <name>           Get documentation for a component
 *   devil docs                 Get documentation for all components
 *   devil help                 Show this help message
 */

import { ls } from "./commands/ls.js";
import { doc } from "./commands/doc.js";
import { init } from "./commands/init.js";
import { blocks } from "./commands/blocks.js";
import { add } from "./commands/add.js";
import { migrate } from "./commands/migrate.js";
import { ai } from "./commands/ai.js";

const HELP = `
Devil CLI - Component registry and blocks distribution

BLOCKS:
  devil init            Initialize devil-ui.json configuration file
  devil blocks          List all available blocks for CLI installation
  devil add <block>     Install a block to your project

COMPONENT REGISTRY:
  devil ls              List all Devil components with categories
  devil doc <name>      Get detailed documentation for a component
  devil docs            Get documentation for all components

MIGRATION:
  devil migrate         Export token rename map for codebase migration
  devil migrate --classes  Show class-level mappings (bg-devil-base -> bg-devil-base)
  devil migrate --help     Show migration help

AI:
  devil ai              Print the AI usage guide (component API reference)

GENERAL:
  devil help            Show this help message

Examples:
  devil init
  devil blocks
  devil add PageHeader
  devil ls
  devil doc Button
  devil docs
  devil migrate --json > rename-map.json
`;

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0]?.toLowerCase();

  switch (command) {
    case "init":
      // Initialize devil-ui.json configuration
      await init();
      break;

    case "blocks":
      // List available blocks
      blocks();
      break;

    case "add":
      // Add a block to the project
      await add(args[1]);
      break;

    case "ls":
      // List components
      ls();
      break;

    case "doc":
    case "docs":
      // If no component name, show all docs; otherwise show specific component
      doc(args[1]);
      break;

    case "migrate":
      // Export token rename map for migration
      migrate(args.slice(1));
      break;

    case "ai":
      // Print AI usage guide
      ai();
      break;

    case "help":
    case "--help":
    case "-h":
    case undefined:
      console.log(HELP.trim());
      break;

    default:
      console.error(`Unknown command: ${command}`);
      console.log(HELP.trim());
      process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
