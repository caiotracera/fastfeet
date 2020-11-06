import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDeliveriesRepository from '@modules/deliveries/repositories/IDeliveriesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';

interface IRequest {
  user_id: string;
  product: string;
  address: string;
  city: string;
  neighborhood: string;
  postal_code: string;
  state: string;
  deliveryman_id?: string;
}

@injectable()
export default class CreateDeliveryService {
  constructor(
    @inject('DeliveriesRepository')
    private deliveriesRepository: IDeliveriesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    product,
    address,
    city,
    neighborhood,
    postal_code,
    state,
    deliveryman_id,
  }: IRequest): Promise<Delivery> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    /* istanbul ignore else */
    if (deliveryman_id) {
      const deliveryman = await this.usersRepository.findById(deliveryman_id);

      if (!deliveryman) {
        throw new AppError('Deliveryman not found!');
      }

      if (deliveryman.deliveryman === false) {
        throw new AppError('Only deliverymans can pick up a delivery');
      }
    }

    if (user.deliveryman === true) {
      throw new AppError('Only deliverymans create new deliveries');
    }

    const delivery = await this.deliveriesRepository.create({
      product,
      address,
      city,
      neighborhood,
      postal_code,
      state,
      deliveryman_id,
    });

    return delivery;
  }
}
