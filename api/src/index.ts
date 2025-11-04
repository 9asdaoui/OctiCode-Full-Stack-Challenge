import express, { Request, Response } from 'express';
import patientsRouter from './routes/patients';

const app = express();

app.use(express.json());

app.use('/patients', patientsRouter);

app.get('/', (req: Request, res: Response) => {
	res.json({ ok: true, service: 'patient-api' });
});

export default app;
