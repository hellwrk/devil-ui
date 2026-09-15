#!/usr/bin/env tsx

/**
 * Write Devil Docs Preview Report Artifact
 *
 * Outputs a report artifact for the devil-docs preview deployment.
 * Called by deploy-devil-docs-preview.sh after successful deployment.
 *
 * Required environment variables:
 * - DEVIL_DOCS_PREVIEW_URL: Deployed preview URL
 * - GITHUB_SHA: Commit SHA (GitHub Actions)
 */

import {
  writeReportArtifact,
  devilDocsPreviewReporter,
  buildContextFromEnv,
} from "../reporters";

async function main() {
  const context = buildContextFromEnv();

  if (!context.devilDocsPreviewUrl) {
    console.error("❌ DEVIL_DOCS_PREVIEW_URL environment variable is required");
    process.exit(1);
  }

  const item = await devilDocsPreviewReporter.collect(context);

  if (item) {
    writeReportArtifact(item);
    console.log("✅ Devil docs preview report artifact written");
  } else {
    console.log("ℹ️  No report item generated");
  }
}

main().catch((error) => {
  console.error("❌ Failed to write Devil docs report:", error);
  process.exit(1);
});
