import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IDeliveriesRepository from '@modules/deliveries/repositories/IDeliveriesRepository';
import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';

interface IRequest {
  deliveryman_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
export default class ListDailyDeliveriesFromDeliverymanService {
  constructor(
    @inject('DeliveriesRepository')
    private deliveriesRepository: IDeliveriesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    deliveryman_id,
    day,
    month,
    year,
  }: IRequest): Promise<Delivery[]> {
    const user = await this.usersRepository.findById(deliveryman_id);
    if (!user) {
      throw new AppError('Deliveryman not found', 404);
    }

    if (!user.deliveryman) {
      throw new AppError('User is not a deliveryman');
    }

    const deliveries = await this.deliveriesRepository.findAllInDayFromDeliveryman(
      { deliveryman_id, day, month, year },
    );

    return deliveries;
  }
}
