Security note
=============

This repository had a moderate advisory affecting `webpack-dev-server` (dev dependency) reported by `npm audit`.

What we changed
- We forced `webpack-dev-server` to a compatible 4.15.2 via `package.json` overrides to avoid upgrading `react-scripts` to an incompatible version.
- We bound the dev server to `127.0.0.1` (see `frontend/package.json` start script) to avoid exposing the dev server to external networks.
- Created a tag `v0.1.1-auditfix-<timestamp>` and committed audit outputs for traceability.

Why this is acceptable
- The vulnerability affects development servers only and not production builds.
- The dev server is now bound to localhost and not exposed publicly.
- Future steps: migrate off `react-scripts` (Create React App) to a modern bundler (Vite/Next), and periodically review dependencies.

How to reproduce
- Run `cd frontend && npm install && npm audit` to see current audit status.

Contact
- Repo owner: Areasettantotto
