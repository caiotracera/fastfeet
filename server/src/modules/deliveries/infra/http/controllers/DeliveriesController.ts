import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateDeliveryService from '@modules/deliveries/services/CreateDeliveryService';
import ShowDeliveryService from '@modules/deliveries/services/ShowDeliveryService';
import StartDeliveryService from '@modules/deliveries/services/StartDeliveryService';
import FinishDeliveryService from '@modules/deliveries/services/FinishDeliveryService';
import ListUnfinishedDeliveriesService from '@modules/deliveries/services/ListUnfinishedDeliveriesService';
import ListFinishedDeliveriesService from '@modules/deliveries/services/ListFinishedDeliveriesService';

export default class DeliveriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    let deliveries;

    if (!request.originalUrl.endsWith('/done')) {
      const listUnfinishedDeliveries = container.resolve(
        ListUnfinishedDeliveriesService,
      );

      deliveries = await listUnfinishedDeliveries.execute({
        deliveryman_id: request.user.id,
      });
    } else {
      const listFinishedDeliveries = container.resolve(
        ListFinishedDeliveriesService,
      );

      deliveries = await listFinishedDeliveries.execute({
        deliveryman_id: request.user.id,
      });
    }

    return response.json(classToClass(deliveries));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { delivery_id } = request.params;
    const showDeliveryService = container.resolve(ShowDeliveryService);

    const delivery = await showDeliveryService.execute({
      delivery_id,
    });

    return response.json(classToClass(delivery));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      product,
      address,
      city,
      neighborhood,
      postal_code,
      state,
      deliveryman_id,
    } = request.body;

    const createDelivery = container.resolve(CreateDeliveryService);

    const delivery = await createDelivery.execute({
      product,
      address,
      city,
      neighborhood,
      postal_code,
      state,
      deliveryman_id,
    });

    return response.json(classToClass(delivery));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { delivery_id } = request.params;

    const startDeliveryService = container.resolve(StartDeliveryService);
    const finishDeliveryService = container.resolve(FinishDeliveryService);
    const showDeliveryService = container.resolve(ShowDeliveryService);

    let delivery = await showDeliveryService.execute({ delivery_id });

    if (!delivery.start_date) {
      delivery = await startDeliveryService.execute({
        delivery_id,
        deliveryman_id: request.user.id,
      });
    }

    if (delivery.start_date && !delivery.end_date && request.file) {
      delivery = await finishDeliveryService.execute({
        delivery_id,
        deliveryman_id: request.user.id,
        signature: request.file.filename,
      });
    }

    return response.json(classToClass(delivery));
  }
}
