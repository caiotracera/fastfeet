import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IDeliveriesRepository from '@modules/deliveries/repositories/IDeliveriesRepository';
import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';

interface IRequest {
  user_id: string;
  delivery_id: string;
  product: string;
  address: string;
  city: string;
  neighborhood: string;
  postal_code: string;
  state: string;
  deliveryman_id?: string;
}

@injectable()
export default class UpdateDeliveryService {
  constructor(
    @inject('DeliveriesRepository')
    private deliveriesRepository: IDeliveriesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    delivery_id,
    product,
    address,
    city,
    neighborhood,
    postal_code,
    state,
    deliveryman_id,
  }: IRequest): Promise<Delivery> {
    const delivery = await this.deliveriesRepository.findById(delivery_id);
    if (!delivery) {
      throw new AppError('Delivery not found', 404);
    }

    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (deliveryman_id) {
      const deliveryman = await this.usersRepository.findById(deliveryman_id);

      if (!deliveryman) {
        throw new AppError('Deliveryman not found!');
      }

      if (deliveryman.deliveryman === false) {
        throw new AppError('Only deliverymans can pick up a delivery');
      }

      delivery.deliveryman_id = deliveryman_id;
      delivery.deliveryman = deliveryman;
    }

    if (user.deliveryman === true) {
      throw new AppError('Only deliverymans can update new deliveries');
    }

    delivery.product = product;
    delivery.address = address;
    delivery.city = city;
    delivery.neighborhood = neighborhood;
    delivery.postal_code = postal_code;
    delivery.state = state;

    await this.deliveriesRepository.save(delivery);
    return delivery;
  }
}
