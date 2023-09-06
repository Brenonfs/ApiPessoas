import { Router } from 'express';

import { authRoutes } from './auth.routes';
import { peopleRoutes } from './people.routes';

const router = Router();
router.use('/people', peopleRoutes);
router.use('/auth', authRoutes);

export { router };
