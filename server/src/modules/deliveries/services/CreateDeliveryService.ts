import { inject, injectable } from 'tsyringe';
import { Ingest } from 'sonic-channel';

import AppError from '@shared/errors/AppError';

import IDeliveriesRepository from '@modules/deliveries/repositories/IDeliveriesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';

interface IRequest {
  product: string;
  address: string;
  city: string;
  neighborhood: string;
  postal_code: string;
  state: string;
  deliveryman_id: string;
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
    product,
    address,
    city,
    neighborhood,
    postal_code,
    state,
    deliveryman_id,
  }: IRequest): Promise<Delivery> {
    const deliveryman = await this.usersRepository.findById(deliveryman_id);
    if (!deliveryman) {
      throw new AppError('Deliveryman not found', 404);
    }

    if (deliveryman.deliveryman === false) {
      throw new AppError('The user is not a deliveryman');
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

    const sonicChannelIngest = new Ingest({
      host: 'localhost',
      port: 1491,
      auth: 'SecretPassword',
    });

    sonicChannelIngest.connect({
      connected: () => {
        console.log('Sonic connected');
      },
    });

    await sonicChannelIngest.push(
      'cities',
      'default',
      `${city.split(' ').join('_')}`,
      `${city}`,
      {
        lang: 'por',
      },
    );

    return delivery;
  }
}
