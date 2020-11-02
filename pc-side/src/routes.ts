import { Router } from 'express';
import { cpuUsages, cpuSpecs } from './usages/cpu-usage';
import { ramUsage, ramSpecs } from './usages/ram-usage';

const routes = Router();

routes.get('/', (req, res) => res.send('ok'));

routes.get('/cpu', (req, res) => res.json(cpuUsages()));

routes.get('/cpu-specs', async (req, res) => res.json(await cpuSpecs()));

routes.get('/ram', (req, res) => res.json({ usage: ramUsage() }));

routes.get('/ram-specs', async (req, res) => res.json(await ramSpecs()));

export default routes;
