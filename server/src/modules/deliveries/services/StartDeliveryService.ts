import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IDeliveriesRepository from '@modules/deliveries/repositories/IDeliveriesRepository';
import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';

interface IRequest {
  user_id: string;
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

  public async execute({ user_id, delivery_id }: IRequest): Promise<Delivery> {
    const delivery = await this.deliveriesRepository.findById(delivery_id);
    if (!delivery) {
      throw new AppError('Delivery not found', 404);
    }

    if (delivery.start_date) {
      throw new AppError('Delivery already started');
    }

    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Deliveryman not found', 404);
    }

    if (!user.deliveryman) {
      throw new AppError('Only deliverymans can start deliveries');
    }

    if (delivery.deliveryman_id && delivery.deliveryman_id !== user.id) {
      throw new AppError(
        'You cannot start deliveries from another deliveryman',
      );
    }

    delivery.deliveryman_id = user.id;
    delivery.deliveryman = user;
    delivery.start_date = new Date();

    await this.deliveriesRepository.save(delivery);
    return delivery;
  }
}
