import { Router } from 'express';

import { PeopleController } from '../controllers/PeopleController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
const peopleRoutes = Router();

const peopleController = new PeopleController();

// peopleRoutes.use(ensureAuthenticated);
peopleRoutes.post('/', peopleController.create);
peopleRoutes.get('/:id', peopleController.list);
peopleRoutes.delete('/:id', peopleController.delete);

export { peopleRoutes };
