import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';

import ICreateDeliveryDTO from '@modules/deliveries/dtos/ICreateDeliveryDTO';
import IFindAllInDayFromDeliverymanDTO from '@modules/deliveries/dtos/IFindAllInDayFromDeliverymanDTO';

export default interface IDeliveriesRepository {
  create(data: ICreateDeliveryDTO): Promise<Delivery>;
  findAll(): Promise<Delivery[]>;
  findAllWithoutDeliveryman(): Promise<Delivery[]>;
  findById(delivery_id: string): Promise<Delivery | undefined>;
  findByDeliveryman(deliveryman_id: string): Promise<Delivery[]>;
  findAllInDayFromDeliveryman(
    data: IFindAllInDayFromDeliverymanDTO,
  ): Promise<Delivery[]>;
}
