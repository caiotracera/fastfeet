import { inject, injectable } from 'tsyringe';
import { getHours, getDate, getMonth, getYear } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IDeliveriesRepository from '@modules/deliveries/repositories/IDeliveriesRepository';

import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';

interface IRequest {
  deliveryman_id: string;
  delivery_id: string;
}

@injectable()
export default class StartDeliveryService {
  constructor(
    @inject('DeliveriesRepository')
    private deliveriesRepository: IDeliveriesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    deliveryman_id,
    delivery_id,
  }: IRequest): Promise<Delivery> {
    const delivery = await this.deliveriesRepository.findById(delivery_id);
    if (!delivery) {
      throw new AppError('Delivery not found', 404);
    }

    const deliveryman = await this.usersRepository.findById(deliveryman_id);
    if (!deliveryman) {
      throw new AppError('Deliveryman not found', 404);
    }

    if (deliveryman.deliveryman === false) {
      throw new AppError('Only deliverymans can start a delivery', 403);
    }

    if (
      getHours(new Date(Date.now())) < 8 ||
      getHours(new Date(Date.now())) > 12
    ) {
      throw new AppError(
        'Deliveries can only be started between 8AM and 12APM',
      );
    }

    const deliveriesStartedToday = await this.deliveriesRepository.findAllInDayFromDeliveryman(
      {
        deliveryman_id,
        day: getDate(new Date(Date.now())),
        month: getMonth(new Date(Date.now())),
        year: getYear(new Date(Date.now())),
      },
    );

    if (deliveriesStartedToday.length >= 5) {
      throw new AppError('You already started 5 deliveries today', 403);
    }

    delivery.deliveryman_id = deliveryman.id;
    delivery.deliveryman = deliveryman;
    delivery.start_date = new Date();

    await this.deliveriesRepository.save(delivery);
    return delivery;
  }
}
