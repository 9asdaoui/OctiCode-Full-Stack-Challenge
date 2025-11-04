# Documentation — Patient API (simple)

This file explains the purpose of each file in the `api/` folder and lists the technologies and libraries used.

Overview
--------
A very small Express + TypeScript API to manage:
- Patients
- Voice-note metadata (title, duration, transcript) — no file uploads
- Plain-text summaries (no AI integration)

Persistence is a single JSON file at `data/db.json` to keep the example easy to run.

Files and purpose
-----------------
- `package.json`
  - NPM package metadata and scripts.
  - Scripts: `dev` (dev server), `build`, `start`, `test`.

- `tsconfig.json`
  - TypeScript compiler settings for this project.

- `.gitignore`
  - Files/folders excluded from git (node_modules, dist, data/db.json).

- `README.md`
  - Quick run instructions and short overview.

- `DOCUMENTATION.md`
  - This file: explains files and tech choices.

- `data/db.json`
  - Simple JSON file holding `{ "patients": [] }`.
  - Used by the service layer to read and write data.

- `src/index.ts`
  - Creates and configures the Express app.
  - Mounts the patients router under `/patients` and adds a simple `/` health route.
  - Exports the app for use in `server.ts` and tests.

- `src/server.ts`
  - Minimal server bootstrap that imports the app and calls `app.listen(...)`.

- `src/models/types.ts`
  - TypeScript `type` definitions for the domain objects: `Patient`, `VoiceNote`, `Summary`.
  - Keeps data shapes consistent across the app.

- `src/validators/patientValidator.ts`
  - Zod schemas for validating incoming request bodies when creating patients, voice-notes, and summaries.
  - Validation keeps the route handlers small and improves error messages.

- `src/services/patientService.ts`
  - Small data access layer that reads/writes `data/db.json`.
  - Functions: `listPatients`, `getPatient`, `createPatient`, `addVoiceNote`, `listVoiceNotes`, `addSummary`, `listSummaries`.
  - Uses a tiny id generator and timestamps. Designed for clarity, not performance.

- `src/routes/patients.ts`
  - Express router for patient endpoints.
  - Routes implemented: GET `/`, POST `/` (create), GET `/:id`, POST `/:id/voice-notes`, GET `/:id/voice-notes`, POST `/:id/summaries`, GET `/:id/summaries`.
  - Uses Zod validators and the service layer.

- `test/patients.test.ts`
  - Two Vitest + Supertest tests:
    1. Create a patient and verify 201 + returned data.
    2. Create a patient, add a voice note, and list voice notes.
  - Tests reset `data/db.json` before each test so runs are deterministic.

Technologies and libraries (short explanations)
----------------------------------------------
- Node.js
  - JavaScript runtime that runs the server.

- TypeScript
  - Adds types to JavaScript which helps catch errors early and improves developer experience.

- Express
  - Minimal and popular HTTP server framework for Node.js.
  - We use it to create routes and handlers.

- Zod
  - A small schema and validation library for TypeScript-first validation.
  - We use it to validate `req.body` and produce clear error messages.

- Vitest
  - Lightweight test runner similar to Jest.
  - Runs tests quickly and integrates with TypeScript.

- Supertest
  - Helper to test HTTP servers by sending requests to the app without a real network port.

- fs (Node built-in)
  - Used to read and write the JSON file for persistence.

Design choices / notes
----------------------
- The code favors clarity and simplicity over performance and concurrency correctness. The JSON file persistence is fine for demos and tests but not production.

- To improve this project for production you would:
  1. Move persistence to a proper DB (SQLite / Postgres).
  2. Add authentication and access control.
  3. Add more robust error handling and structured logging.

If you want, I can next:
- Convert the persistence to SQLite (small step-up from JSON) and update the service and tests.
- Or keep it as-is and add one or two more tests and some small integration examples.

---

If anything is unclear, tell me which file you'd like explained in more depth or what you want simplified further.
