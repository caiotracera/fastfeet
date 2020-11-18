import { Router } from 'express';
import CitiesController from '@modules/deliveries/infra/http/controllers/CitiesController';

const router = Router();
const citiesController = new CitiesController();

router.get('/', citiesController.index);

export default router;
