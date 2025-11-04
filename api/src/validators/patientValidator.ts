import { z } from 'zod';

export const createPatientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  dob: z.string().optional(),
});

export const createVoiceNoteSchema = z.object({
  title: z.string().optional(),
  durationSeconds: z.number().int().nonnegative().optional(),
  transcript: z.string().optional(),
});

export const createSummarySchema = z.object({
  text: z.string().min(1, 'Summary text is required'),
});
