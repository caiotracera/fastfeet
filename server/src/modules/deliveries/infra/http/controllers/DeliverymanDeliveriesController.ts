import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowDeliveriesFromDeliveryman from '@modules/deliveries/services/ShowDeliveriesFromDeliverymanService';

export default class DeliverymanDeliveriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const allDeliveriesFromDeliveryman = container.resolve(
      ShowDeliveriesFromDeliveryman,
    );

    const deliveries = await allDeliveriesFromDeliveryman.execute({
      deliveryman_id: request.user.id,
    });

    return response.json(classToClass(deliveries));
  }
}
