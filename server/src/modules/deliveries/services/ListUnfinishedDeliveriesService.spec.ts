import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeDeliveriesRepository from '@modules/deliveries/repositories/fakes/FakeDeliveriesRepository';
import ListUnfinishedDeliveriesService from '@modules/deliveries/services/ListUnfinishedDeliveriesService';

let fakeUsersRepository: FakeUsersRepository;
let fakeDeliveriesRepository: FakeDeliveriesRepository;
let listUnfinishedDeliveriesService: ListUnfinishedDeliveriesService;

describe('ListUnfinishedDeliveries', () => {
  beforeEach(() => {
    fakeDeliveriesRepository = new FakeDeliveriesRepository();
    fakeUsersRepository = new FakeUsersRepository();

    listUnfinishedDeliveriesService = new ListUnfinishedDeliveriesService(
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

    const deliveries = await listUnfinishedDeliveriesService.execute({
      deliveryman_id: deliveryman.id,
    });

    expect(deliveries).toEqual([delivery2, delivery3]);
  });

  it('should not be able to list the deliveries from a non-existing deliveryman', async () => {
    await expect(
      listUnfinishedDeliveriesService.execute({
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
      listUnfinishedDeliveriesService.execute({
        deliveryman_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
