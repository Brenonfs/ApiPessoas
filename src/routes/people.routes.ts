import { Router } from 'express';

import { PeopleController } from '../controllers/PeopleController';
import { adminAuthenticated } from '../middlewares/adminAuthenticated';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
const peopleRoutes = Router();

const peopleController = new PeopleController();

peopleRoutes.post('/', adminAuthenticated, peopleController.create);
peopleRoutes.get('/:id', ensureAuthenticated, peopleController.list);
peopleRoutes.delete('/:id', adminAuthenticated, peopleController.delete);
peopleRoutes.get('/', ensureAuthenticated, peopleController.search);

export { peopleRoutes };
