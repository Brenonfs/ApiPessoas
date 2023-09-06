import { Router } from 'express';

import { PeopleController } from '../controllers/PeopleController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
const peopleRoutes = Router();

const peopleController = new PeopleController();

peopleRoutes.post('/', peopleController.create);
peopleRoutes.get('/:id', ensureAuthenticated, peopleController.list);
peopleRoutes.delete('/:id', peopleController.delete);

export { peopleRoutes };
