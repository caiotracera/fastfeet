import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListUnfinishedDeliveries from '@modules/deliveries/services/ListUnfinishedDeliveriesService';
import ListFinishedDeliveriesService from '@modules/deliveries/services/ListFinishedDeliveriesService';

export default class DeliverymanDeliveriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { done } = request.query;
    if (done) {
      const listFinishedDeliveriesService = container.resolve(
        ListFinishedDeliveriesService,
      );

      const deliveries = await listFinishedDeliveriesService.execute({
        deliveryman_id: request.user.id,
      });

      return response.json(classToClass(deliveries));
    }

    const listUnfinishedDeliveries = container.resolve(
      ListUnfinishedDeliveries,
    );

    const deliveries = await listUnfinishedDeliveries.execute({
      deliveryman_id: request.user.id,
    });

    return response.json(classToClass(deliveries));
  }
}
