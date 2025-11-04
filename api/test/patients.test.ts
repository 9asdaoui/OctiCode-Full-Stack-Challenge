import { describe, it, beforeEach, expect } from 'vitest';
import request from 'supertest';
import fs from 'fs/promises';
import path from 'path';
import app from '../src/index';

const DB = path.resolve(__dirname, '../data/db.json');

async function resetDb() {
  await fs.writeFile(DB, JSON.stringify({ patients: [] }, null, 2), 'utf-8');
}

describe('patients API (basic)', () => {
  beforeEach(async () => {
    await resetDb();
  });

  it('creates a patient and returns 201', async () => {
    const res = await request(app).post('/patients').send({ name: 'Alice' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Alice');
  });

  it('adds a voice note to a patient', async () => {
    const create = await request(app).post('/patients').send({ name: 'Bob' });
    const id = create.body.id;
    const vn = { title: 'Call 1', durationSeconds: 42, transcript: 'short note' };
    const add = await request(app).post(`/patients/${id}/voice-notes`).send(vn);
    expect(add.status).toBe(201);
    expect(add.body).toHaveProperty('id');
    const list = await request(app).get(`/patients/${id}/voice-notes`);
    expect(list.status).toBe(200);
    expect(Array.isArray(list.body)).toBe(true);
    expect(list.body[0].title).toBe('Call 1');
  });
});
