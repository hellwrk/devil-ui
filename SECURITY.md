# Security Policy

## Supported versions

The latest published minor of `@hellwrk/devil-ui` receives security fixes. Older
majors are not maintained.

## Reporting a vulnerability

Please do **not** open a public issue for a security problem.

Use GitHub's private reporting flow instead:
[Report a vulnerability](https://github.com/hellwrk/devil-ui/security/advisories/new).

Include the affected version, a description of the issue, and a minimal
reproduction if you have one. We aim to acknowledge reports within a few days
and to publish a fix as a patch release.

## Scope

Relevant: anything in the published `@hellwrk/devil-ui` package — the component
library, the `devil` CLI, and the bundled registry artifacts. The components
render in the consumer's browser and ship bundled third-party code, so reports
about a bundled dependency are in scope when our bundle is affected.

## Supply chain

Releases are published from GitHub Actions with an npm provenance attestation
(`.github/workflows/publish.yml`), which cryptographically links each tarball to
the commit and workflow that produced it. The package has no install or
postinstall scripts.
