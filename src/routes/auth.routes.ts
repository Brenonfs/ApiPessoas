import { Router } from 'express';

import { CreateAuth } from '../controllers/AuthController';
const authRoutes = Router();

const authSession = new CreateAuth();

authRoutes.post('/', authSession.create);

export { authRoutes };
