import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';

import ICreateDeliveryDTO from '@modules/deliveries/dtos/ICreateDeliveryDTO';
import IFindAllInDayFromDeliverymanDTO from '@modules/deliveries/dtos/IFindAllInDayFromDeliverymanDTO';

export default interface IDeliveriesRepository {
  create(data: ICreateDeliveryDTO): Promise<Delivery>;
  findById(delivery_id: string): Promise<Delivery | undefined>;
  findAllInDayFromDeliveryman(
    data: IFindAllInDayFromDeliverymanDTO,
  ): Promise<Delivery[]>;
}
