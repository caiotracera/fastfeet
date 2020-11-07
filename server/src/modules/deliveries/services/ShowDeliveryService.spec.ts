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

    const delivery = await fakeDeliveriesRepository.create({
      address: 'Random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: deliveryman.id,
    });

    const searchedDelivery = await showDeliveryService.execute({
      delivery_id: delivery.id,
    });

    expect(searchedDelivery.product).toBe('Random product');
  });

  it('should not be able to show a non-existing delivery', async () => {
    await expect(
      showDeliveryService.execute({
        delivery_id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
