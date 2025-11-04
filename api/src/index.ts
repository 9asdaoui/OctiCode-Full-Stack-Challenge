import express, { Request, Response } from 'express';
import patientsRouter from './routes/patients';

// Create the Express app
const app = express();

// Parse JSON bodies for incoming requests
app.use(express.json());

// Mount the patients router under /patients
app.use('/patients', patientsRouter);

// Simple health-check root route
app.get('/', (req: Request, res: Response) => {
	res.json({ ok: true, service: 'patient-api' });
});

export default app;
