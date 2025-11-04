import fs from 'fs/promises';
import path from 'path';
import { Patient, VoiceNote, Summary } from '../models/types';

const DB_PATH = path.resolve(__dirname, '../../data/db.json');

async function readDb(): Promise<{ patients: Patient[] }> {
  const raw = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(raw) as { patients: Patient[] };
}

async function writeDb(db: { patients: Patient[] }) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export async function listPatients(): Promise<Patient[]> {
  const db = await readDb();
  return db.patients;
}

export async function getPatient(id: string): Promise<Patient | undefined> {
  const db = await readDb();
  return db.patients.find((p) => p.id === id);
}

export async function createPatient(data: { name: string; dob?: string }): Promise<Patient> {
  const db = await readDb();
  const patient: Patient = {
    id: genId(),
    name: data.name,
    dob: data.dob,
    createdAt: new Date().toISOString(),
    voiceNotes: [],
    summaries: [],
  };
  db.patients.push(patient);
  await writeDb(db);
  return patient;
}

export async function addVoiceNote(patientId: string, note: Omit<VoiceNote, 'id' | 'createdAt'>): Promise<VoiceNote | undefined> {
  const db = await readDb();
  const patient = db.patients.find((p) => p.id === patientId);
  if (!patient) return undefined;
  const vn: VoiceNote = { id: genId(), createdAt: new Date().toISOString(), ...note } as VoiceNote;
  patient.voiceNotes.push(vn);
  await writeDb(db);
  return vn;
}

export async function listVoiceNotes(patientId: string): Promise<VoiceNote[] | undefined> {
  const patient = await getPatient(patientId);
  return patient?.voiceNotes;
}

export async function addSummary(patientId: string, summary: Omit<Summary, 'id' | 'createdAt'>): Promise<Summary | undefined> {
  const db = await readDb();
  const patient = db.patients.find((p) => p.id === patientId);
  if (!patient) return undefined;
  const s: Summary = { id: genId(), createdAt: new Date().toISOString(), ...summary } as Summary;
  patient.summaries.push(s);
  await writeDb(db);
  return s;
}

export async function listSummaries(patientId: string): Promise<Summary[] | undefined> {
  const patient = await getPatient(patientId);
  return patient?.summaries;
}
