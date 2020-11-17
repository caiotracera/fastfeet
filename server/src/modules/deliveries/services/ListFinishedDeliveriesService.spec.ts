import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeDeliveriesRepository from '@modules/deliveries/repositories/fakes/FakeDeliveriesRepository';
import ListFinishedDeliveriesService from '@modules/deliveries/services/ListFinishedDeliveriesService';

let fakeUsersRepository: FakeUsersRepository;
let fakeDeliveriesRepository: FakeDeliveriesRepository;
let listFinishedDeliveriesService: ListFinishedDeliveriesService;

describe('ListUnfinishedDeliveries', () => {
  beforeEach(() => {
    fakeDeliveriesRepository = new FakeDeliveriesRepository();
    fakeUsersRepository = new FakeUsersRepository();

    listFinishedDeliveriesService = new ListFinishedDeliveriesService(
      fakeDeliveriesRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to list all the unfinished deliveries from deliveryman', async () => {
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

    delivery1.end_date = new Date();
    await fakeDeliveriesRepository.save(delivery1);

    await fakeDeliveriesRepository.create({
      address: 'Random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: deliveryman.id,
    });

    await fakeDeliveriesRepository.create({
      address: 'Random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: deliveryman.id,
    });

    const deliveries = await listFinishedDeliveriesService.execute({
      deliveryman_id: deliveryman.id,
    });

    expect(deliveries).toEqual([delivery1]);
  });

  it('should not be able to list the deliveries from a non-existing deliveryman', async () => {
    await expect(
      listFinishedDeliveriesService.execute({
        deliveryman_id: 'non-existing-deliveryman',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
