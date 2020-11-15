import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import DeliverymanDeliveriesController from '@modules/deliveries/infra/http/controllers/DeliverymanDeliveriesController';

const router = Router();
const deliverymanController = new DeliverymanDeliveriesController();

router.use(ensureAuthenticated);

router.get('/', deliverymanController.index);

export default router;
