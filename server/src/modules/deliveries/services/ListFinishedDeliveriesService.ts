import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IDeliveriesRepository from '@modules/deliveries/repositories/IDeliveriesRepository';
import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';

interface IRequest {
  deliveryman_id: string;
}

@injectable()
export default class ListUnfinishedDeliveriesService {
  constructor(
    @inject('DeliveriesRepository')
    private deliveriesRepository: IDeliveriesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ deliveryman_id }: IRequest): Promise<Delivery[]> {
    const user = await this.usersRepository.findById(deliveryman_id);
    if (!user) {
      throw new AppError('Deliveryman not found', 404);
    }

    const deliveries = await this.deliveriesRepository.findByDeliveryman(
      deliveryman_id,
    );

    const finished = deliveries
      .filter(delivery => delivery.end_date)
      .map((delivery: Delivery) => {
        delivery.status = 2;
        return delivery;
      });

    return finished;
  }
}
