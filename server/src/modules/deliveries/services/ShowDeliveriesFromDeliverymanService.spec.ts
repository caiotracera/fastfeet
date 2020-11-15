import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeDeliveriesRepository from '@modules/deliveries/repositories/fakes/FakeDeliveriesRepository';
import ShowDeliveriesFromDeliverymanService from '@modules/deliveries/services/ShowDeliveriesFromDeliverymanService';

let fakeUsersRepository: FakeUsersRepository;
let fakeDeliveriesRepository: FakeDeliveriesRepository;
let showDeliveriesFromDeliverymanService: ShowDeliveriesFromDeliverymanService;

describe('ShowDeliveriesFromDeliveryman', () => {
  beforeEach(() => {
    fakeDeliveriesRepository = new FakeDeliveriesRepository();
    fakeUsersRepository = new FakeUsersRepository();

    showDeliveriesFromDeliverymanService = new ShowDeliveriesFromDeliverymanService(
      fakeDeliveriesRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to list all the deliveries from deliveryman', async () => {
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
      address: 'Another random address',
      city: 'Another random city',
      neighborhood: 'Another random neighborhood',
      state: 'Another random State',
      postal_code: '99999999',
      product: 'Another random product',
      deliveryman_id: deliveryman.id,
    });

    const delivery3 = await fakeDeliveriesRepository.create({
      address: 'And another random address',
      city: 'And another random city',
      neighborhood: 'And another random neighborhood',
      state: 'And another random State',
      postal_code: '99999999',
      product: 'And another random product',
      deliveryman_id: deliveryman.id,
    });

    const delivery4 = await fakeDeliveriesRepository.create({
      address: 'One more random address',
      city: 'One more random city',
      neighborhood: 'One more random neighborhood',
      state: 'One more random State',
      postal_code: '99999999',
      product: 'One more random product',
      deliveryman_id: deliveryman.id,
    });

    const deliveries = await showDeliveriesFromDeliverymanService.execute({
      deliveryman_id: deliveryman.id,
    });

    expect(deliveries).toEqual([delivery1, delivery2, delivery3, delivery4]);
  });

  it('should not be able to list the deliveries from a non-existing deliveryman', async () => {
    await expect(
      showDeliveriesFromDeliverymanService.execute({
        deliveryman_id: 'non-existing-deliveryman',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to list the deliveries from a non-deliveryman user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      deliveryman: false,
    });

    await expect(
      showDeliveriesFromDeliverymanService.execute({
        deliveryman_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
