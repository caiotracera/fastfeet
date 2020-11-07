import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListAllDeliveries from '@modules/deliveries/services/ListAllDeliveriesService';
import ShowDeliveryService from '@modules/deliveries/services/ShowDeliveryService';
import CreateDeliveryService from '@modules/deliveries/services/CreateDeliveryService';
import StartDeliveryService from '@modules/deliveries/services/StartDeliveryService';
import EndDeliveryService from '@modules/deliveries/services/EndDeliveryService';
import CancelDeliveryService from '@modules/deliveries/services/CancelDeliveryService';

export default class DeliveriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAllDeliveries = container.resolve(ListAllDeliveries);

    const deliveries = await listAllDeliveries.execute();
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
    const user_id = request.user.id;
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
      user_id,
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
    const endDeliveryService = container.resolve(EndDeliveryService);
    const showDeliveryService = container.resolve(ShowDeliveryService);

    let delivery = await showDeliveryService.execute({
      delivery_id,
    });

    if (!delivery.start_date) {
      delivery = await startDeliveryService.execute({
        delivery_id,
        user_id: request.user.id,
      });
    }

    if (delivery.start_date && !delivery.end_date) {
      delivery = await endDeliveryService.execute({
        delivery_id,
        user_id: request.user.id,
        signatureFilename: request.file.filename,
      });
    }

    return response.json(classToClass(delivery));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { delivery_id } = request.params;
    const cancelDeliveryService = container.resolve(CancelDeliveryService);

    await cancelDeliveryService.execute({
      delivery_id,
      user_id: request.user.id,
    });

    return response.status(204).send();
  }
}
