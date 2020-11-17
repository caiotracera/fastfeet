import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeDeliveriesRepository from '@modules/deliveries/repositories/fakes/FakeDeliveriesRepository';
import ShowDeliveryService from '@modules/deliveries/services/ShowDeliveryService';

let fakeUsersRepository: FakeUsersRepository;
let fakeDeliveriesRepository: FakeDeliveriesRepository;
let showDeliveryService: ShowDeliveryService;

describe('ShowDelivery', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeDeliveriesRepository = new FakeDeliveriesRepository();

    showDeliveryService = new ShowDeliveryService(fakeDeliveriesRepository);
  });

  it('should be able to show a delivery', async () => {
    const deliveryman = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      deliveryman: true,
    });

    const delivery1 = await fakeDeliveriesRepository.create({
      address: 'Random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: deliveryman.id,
    });

    const delivery2 = await fakeDeliveriesRepository.create({
      address: 'Random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: deliveryman.id,
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
      deliveryman_id: deliveryman.id,
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
