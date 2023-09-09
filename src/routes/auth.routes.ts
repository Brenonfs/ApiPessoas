import { Router } from 'express';

import { CreateAuth } from '../controllers/AuthController';
const authRoutes = Router();

const authSession = new CreateAuth();

authRoutes.post('/login', authSession.create);

export { authRoutes };
