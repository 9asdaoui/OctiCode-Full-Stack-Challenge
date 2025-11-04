export type VoiceNote = {
  id: string;
  title?: string;
  durationSeconds?: number;
  transcript?: string;
  createdAt: string;
};

export type Summary = {
  id: string;
  text: string;
  createdAt: string;
};

export type Patient = {
  id: string;
  name: string;
  dob?: string;
  createdAt: string;
  voiceNotes: VoiceNote[];
  summaries: Summary[];
};
