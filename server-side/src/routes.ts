import { Router } from 'express';

// Controllers
import UserController from './controllers/UserController';
import CpuController from './controllers/CpuController'; 
import CoreController from './controllers/CoreController'; 
import RamController from './controllers/RamController'; 
import StorageController from './controllers/StorageController';

// Middleware
import auth from './middlewares/auth';

const routes = Router();

// POST routes (This is where computer sends)
routes.post('/user', UserController.create);
routes.post('/cpu', auth, CpuController.create);
routes.post('/core', auth, CoreController.create);
routes.post('/ram', auth, RamController.create);
routes.post('/strg', auth, StorageController.create);

// DELETE routes (On shutdown)
routes.delete('/user', auth, UserController.delete);

// GET routes (Inside the app)
routes.get('/user', UserController.index);
routes.get('/cpu', auth, CpuController.index);
routes.get('/ram', auth, RamController.index);
routes.get('/strg', auth, StorageController.index);

export default routes;