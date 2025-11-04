# Patient API (minimal)

This is a example REST API to manage patients, voice-note metadata (no file uploads), and plain text summaries.

Tech used
- Node.js + TypeScript — runtime + types
- Express — HTTP server
- Zod — validation for request bodies
- Persistence: a simple JSON file at `data/db.json` (for demo/testing only)
- Tests: Vitest + Supertest

Quick run (PowerShell)

```powershell
npm install
npm run dev
```

Run tests:

```powershell
npm test
```
