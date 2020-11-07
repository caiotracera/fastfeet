import { injectable, inject } from 'tsyringe';

import IDeliveriesRepository from '@modules/deliveries/repositories/IDeliveriesRepository';
import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';

@injectable()
export default class ListAllDeliveriesService {
  constructor(
    @inject('DeliveriesRepository')
    private deliveriesRepository: IDeliveriesRepository,
  ) {}

  public async execute(): Promise<Delivery[]> {
    const deliveries = await this.deliveriesRepository.findAll();
    return deliveries;
  }
}
