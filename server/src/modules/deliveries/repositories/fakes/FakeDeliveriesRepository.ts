import { v4 as uuid } from 'uuid';
import { getDate, getMonth, getYear } from 'date-fns';

import ICreateDeliveryDTO from '@modules/deliveries/dtos/ICreateDeliveryDTO';
import IFindAllInDayFromDeliverymanDTO from '@modules/deliveries/dtos/IFindAllInDayFromDeliverymanDTO';
import IDeliveriesRepository from '@modules/deliveries/repositories/IDeliveriesRepository';
import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';

export default class FakeDeliveriesRepository implements IDeliveriesRepository {
  private deliveries: Delivery[] = [];

  public async create({
    product,
    address,
    city,
    neighborhood,
    postal_code,
    state,
    deliveryman_id,
  }: ICreateDeliveryDTO): Promise<Delivery> {
    const delivery = new Delivery();

    Object.assign(delivery, {
      id: uuid(),
      product,
      address,
      city,
      neighborhood,
      postal_code,
      state,
      deliveryman_id,
    });

    this.deliveries.push(delivery);
    return delivery;
  }

  public async save(delivery: Delivery): Promise<Delivery> {
    const deliveryIndex = this.deliveries.findIndex(
      eachDelivery => eachDelivery.id === delivery.id,
    );

    this.deliveries[deliveryIndex] = delivery;
    return delivery;
  }

  public async findByDeliveryman(deliveryman_id: string): Promise<Delivery[]> {
    const deliveries = this.deliveries.filter(
      delivery =>
        delivery.deliveryman_id === deliveryman_id &&
        delivery.canceled_at === undefined,
    );

    return deliveries;
  }

  public async findAll(): Promise<Delivery[]> {
    return this.deliveries.filter(
      delivery => delivery.canceled_at === undefined,
    );
  }

  public async findAllWithoutDeliveryman(): Promise<Delivery[]> {
    return this.deliveries.filter(
      delivery => delivery.deliveryman_id === undefined,
    );
  }

  public async findById(delivery_id: string): Promise<Delivery | undefined> {
    const delivery = this.deliveries.find(
      eachDelivery => eachDelivery.id === delivery_id,
    );

    return delivery;
  }

  public async findAllInDayFromDeliveryman({
    deliveryman_id,
    day,
    month,
    year,
  }: IFindAllInDayFromDeliverymanDTO): Promise<Delivery[]> {
    const deliveries = this.deliveries.filter(
      delivery =>
        delivery.deliveryman_id === deliveryman_id &&
        getDate(delivery.start_date) === day &&
        getMonth(delivery.start_date) === month &&
        getYear(delivery.start_date) === year,
    );

    return deliveries;
  }
}
