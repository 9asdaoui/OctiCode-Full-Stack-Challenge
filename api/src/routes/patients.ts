import express, { Request, Response } from 'express';
import * as service from '../services/patientService';
import { createPatientSchema, createVoiceNoteSchema, createSummarySchema } from '../validators/patientValidator';

// Router handles patient-related endpoints
const router = express.Router();

// List patients
router.get('/', async (_req: Request, res: Response) => {
  const patients = await service.listPatients();
  res.json(patients);
});

// Create a patient
router.post('/', async (req: Request, res: Response) => {
  const parsed = createPatientSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });
  const created = await service.createPatient(parsed.data);
  res.status(201).json(created);
});

// Get a single patient
router.get('/:id', async (req: Request, res: Response) => {
  const p = await service.getPatient(req.params.id);
  if (!p) return res.status(404).json({ error: 'Patient not found' });
  res.json(p);
});

// Add a voice note metadata to a patient
router.post('/:id/voice-notes', async (req: Request, res: Response) => {
  const parsed = createVoiceNoteSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });
  const vn = await service.addVoiceNote(req.params.id, parsed.data as any);
  if (!vn) return res.status(404).json({ error: 'Patient not found' });
  res.status(201).json(vn);
});

// List voice notes for a patient
router.get('/:id/voice-notes', async (req: Request, res: Response) => {
  const vns = await service.listVoiceNotes(req.params.id);
  if (!vns) return res.status(404).json({ error: 'Patient not found' });
  res.json(vns);
});

// Add a plain-text summary for a patient
router.post('/:id/summaries', async (req: Request, res: Response) => {
  const parsed = createSummarySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });
  const s = await service.addSummary(req.params.id, parsed.data as any);
  if (!s) return res.status(404).json({ error: 'Patient not found' });
  res.status(201).json(s);
});

// List summaries for a patient
router.get('/:id/summaries', async (req: Request, res: Response) => {
  const s = await service.listSummaries(req.params.id);
  if (!s) return res.status(404).json({ error: 'Patient not found' });
  res.json(s);
});

export default router;
