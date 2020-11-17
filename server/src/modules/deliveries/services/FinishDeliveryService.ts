import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IDeliveriesRepository from '@modules/deliveries/repositories/IDeliveriesRepository';
import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';

interface IRequest {
  deliveryman_id: string;
  delivery_id: string;
  signature: string;
}

@injectable()
export default class FinishDeliveryService {
  constructor(
    @inject('DeliveriesRepository')
    private deliveriesRepository: IDeliveriesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    delivery_id,
    deliveryman_id,
    signature,
  }: IRequest): Promise<Delivery> {
    const delivery = await this.deliveriesRepository.findById(delivery_id);
    if (!delivery) {
      throw new AppError('Delivery not found', 404);
    }

    if (!delivery.start_date) {
      throw new AppError('Delivery not started', 403);
    }

    if (delivery.end_date) {
      throw new AppError('Delivery already finished', 403);
    }

    const user = await this.usersRepository.findById(deliveryman_id);
    if (!user) {
      throw new AppError('Deliveryman not found', 404);
    }

    if (!user.deliveryman) {
      throw new AppError('Only deliverymans can finish deliveries', 403);
    }

    delivery.end_date = new Date();
    delivery.signature_id = signature;

    await this.deliveriesRepository.save(delivery);
    return delivery;
  }
}
