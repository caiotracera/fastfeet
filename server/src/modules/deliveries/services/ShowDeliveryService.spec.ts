import AppError from '@shared/errors/AppError';

import FakeDeliveriesRepository from '@modules/deliveries/repositories/fakes/FakeDeliveriesRepository';
import ShowDeliveryService from '@modules/deliveries/services/ShowDeliveryService';

let fakeDeliveriesRepository: FakeDeliveriesRepository;
let showDeliveryService: ShowDeliveryService;

describe('ShowDelivery', () => {
  beforeEach(() => {
    fakeDeliveriesRepository = new FakeDeliveriesRepository();

    showDeliveryService = new ShowDeliveryService(fakeDeliveriesRepository);
  });

  it('should be able to show the delivery', async () => {
    const delivery1 = await fakeDeliveriesRepository.create({
      address: 'Random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: 'fake-deliveryman_id',
    });

    const delivery2 = await fakeDeliveriesRepository.create({
      address: 'Random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: 'fake-deliveryman_id',
    });

    delivery2.start_date = new Date();
    await fakeDeliveriesRepository.save(delivery2);

    const delivery3 = await fakeDeliveriesRepository.create({
      address: 'Random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: 'fake-deliveryman_id',
    });

    delivery3.end_date = new Date();
    await fakeDeliveriesRepository.save(delivery3);

    const searchedDelivery1 = await showDeliveryService.execute({
      delivery_id: delivery1.id,
    });

    const searchedDelivery2 = await showDeliveryService.execute({
      delivery_id: delivery2.id,
    });

    const searchedDelivery3 = await showDeliveryService.execute({
      delivery_id: delivery3.id,
    });

    expect(searchedDelivery1).toEqual(delivery1);
    expect(searchedDelivery2).toEqual(delivery2);
    expect(searchedDelivery3).toEqual(delivery3);
  });

  it('should not be able to show a non-existing delivery', async () => {
    await expect(
      showDeliveryService.execute({
        delivery_id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
