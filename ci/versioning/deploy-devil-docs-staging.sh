#!/bin/bash
set -euo pipefail

# Devil Docs Staging Deployment Script
# Deploys devil-docs to staging environment on merge to main

echo "📚 Starting devil-docs staging deployment..."

# Verify Cloudflare credentials
if [ -z "$CLOUDFLARE_API_TOKEN" ] || [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
  echo "❌ CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID are required"
  exit 1
fi

echo "🔨 Building devil-ui library..."
pnpm --filter @hellwrk/devil-ui build

echo "🔨 Building devil-docs..."
pnpm --filter @cloudflare/kumo-docs-astro build

echo "🚀 Deploying to staging..."
cd packages/kumo-docs-astro
pnpm exec wrangler deploy --env staging

echo "🎉 Devil docs staging deployment complete!"
