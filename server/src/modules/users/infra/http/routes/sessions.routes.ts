import { Router } from 'express';
import { Segments, celebrate, Joi } from 'celebrate';

import SessionsController from '@modules/users/infra/http/controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      cpf: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

sessionsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      grant_type: Joi.string().required(),
      refresh_token: Joi.string().required(),
    },
  }),
  sessionsController.update,
);

export default sessionsRouter;
