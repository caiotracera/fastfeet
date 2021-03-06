import { getRepository, Repository, Raw } from 'typeorm';

import ICreateDeliveryDTO from '@modules/deliveries/dtos/ICreateDeliveryDTO';
import IFindAllInDayFromDeliverymanDTO from '@modules/deliveries/dtos/IFindAllInDayFromDeliverymanDTO';
import IDeliveriesRepository from '@modules/deliveries/repositories/IDeliveriesRepository';
import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';

export default class DeliveriesRepository implements IDeliveriesRepository {
  private ormRepository: Repository<Delivery>;

  constructor() {
    this.ormRepository = getRepository(Delivery);
  }

  public async create({
    product,
    address,
    city,
    neighborhood,
    postal_code,
    state,
    deliveryman_id,
  }: ICreateDeliveryDTO): Promise<Delivery> {
    const delivery = this.ormRepository.create({
      product,
      address,
      city,
      neighborhood,
      postal_code,
      state,
      deliveryman_id,
    });

    await this.ormRepository.save(delivery);
    return delivery;
  }

  public async save(delivery: Delivery): Promise<Delivery> {
    return this.ormRepository.save(delivery);
  }

  public async findById(delivery_id: string): Promise<Delivery | undefined> {
    const delivery = await this.ormRepository.findOne(delivery_id);
    return delivery;
  }

  public async findByDeliveryman(deliveryman_id: string): Promise<Delivery[]> {
    const deliveries = await this.ormRepository.find({
      where: { deliveryman_id },
      order: {
        created_at: 'DESC',
      },
    });

    return deliveries;
  }

  public async findAllInDayFromDeliveryman({
    deliveryman_id,
    day,
    month,
    year,
  }: IFindAllInDayFromDeliverymanDTO): Promise<Delivery[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    const deliveries = await this.ormRepository.find({
      where: {
        deliveryman_id,
        start_date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
      order: {
        start_date: 'DESC',
      },
    });

    return deliveries;
  }
}
