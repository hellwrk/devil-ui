/**
 * Devil Docs Preview Reporter
 *
 * Reports the deployed devil-docs preview URL.
 */

import type { CIContext, ReportItem, Reporter } from "./types";

export const devilDocsPreviewReporter: Reporter = {
  id: "devil-docs-preview",
  name: "Devil Docs Preview",

  async collect(context: CIContext): Promise<ReportItem | null> {
    const { devilDocsPreviewUrl, shortSha } = context;

    if (!devilDocsPreviewUrl) {
      return null;
    }

    const content = `**Preview URL:** [${devilDocsPreviewUrl}](${devilDocsPreviewUrl})

This preview deployment (\`${shortSha}\`) contains the latest documentation changes from this MR.`;

    return {
      id: "devil-docs-preview",
      title: "📚 Documentation Preview",
      priority: 30,
      content,
      success: true,
    };
  },
};
