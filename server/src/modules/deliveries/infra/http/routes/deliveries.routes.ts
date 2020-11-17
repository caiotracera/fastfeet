import { Router } from 'express';
import multer from 'multer';
import { Segments, celebrate, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import DeliveriesController from '@modules/deliveries/infra/http/controllers/DeliveriesController';

import uploadConfig from '@config/upload';

const router = Router();
const deliveriesController = new DeliveriesController();
const upload = multer(uploadConfig.multer);

router.use(ensureAuthenticated);

router.get('/', deliveriesController.index);
router.get('/:delivery_id', deliveriesController.show);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      product: Joi.string().required(),
      address: Joi.string().required(),
      city: Joi.string().required(),
      neighborhood: Joi.string().required(),
      postal_code: Joi.string().required(),
      state: Joi.string().required(),
      deliveryman_id: Joi.string().uuid(),
    },
  }),
  deliveriesController.create,
);

router.put(
  '/:delivery_id',
  ensureAuthenticated,
  upload.single('signature'),
  deliveriesController.update,
);

router.delete('/:delivery_id', deliveriesController.delete);

export default router;
