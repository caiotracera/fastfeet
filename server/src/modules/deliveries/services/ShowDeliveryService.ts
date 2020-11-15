import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IDeliveriesRepository from '@modules/deliveries/repositories/IDeliveriesRepository';
import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';

interface IRequest {
  delivery_id: string;
}

@injectable()
export default class ShowDeliveryService {
  constructor(
    @inject('DeliveriesRepository')
    private deliveriesRepository: IDeliveriesRepository,
  ) {}

  public async execute({ delivery_id }: IRequest): Promise<Delivery> {
    const delivery = await this.deliveriesRepository.findById(delivery_id);
    if (!delivery) {
      throw new AppError('Delivery not found', 404);
    }

    if (!delivery.start_date) {
      delivery.status = 0;
    }

    if (delivery.start_date) {
      delivery.status = 1;
    }

    if (delivery.end_date) {
      delivery.status = 2;
    }

    return delivery;
  }
}
