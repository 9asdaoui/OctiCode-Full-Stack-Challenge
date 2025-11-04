# Patient API (minimal)

This is a tiny example REST API to manage patients, voice-note metadata (no file uploads), and plain text summaries.

Tech used
- Node.js + TypeScript — runtime + types
- Express — HTTP server
- Zod — validation for request bodies
- Persistence: a simple JSON file at `data/db.json` (for demo/testing only)
- Tests: Vitest + Supertest

Quick run (PowerShell)

```powershell
cd "c:\Users\oussa\OneDrive\Desktop\OctiCode Full-Stack Challenge\api"
npm install
npm run dev
```

Run tests:

```powershell
npm test
```

This project is intentionally small and educational. Do not use the JSON file persistence in production.
