import { getDate, getMonth, getYear } from 'date-fns';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeDeliveriesRepository from '@modules/deliveries/repositories/fakes/FakeDeliveriesRepository';
import ListDailyDeliveriesFromDeliverymanService from '@modules/deliveries/services/ListDailyDeliveriesFromDeliverymanService';

let fakeUsersRepository: FakeUsersRepository;
let fakeDeliveriesRepository: FakeDeliveriesRepository;
let listDailyDeliveriesFromDeliverymanService: ListDailyDeliveriesFromDeliverymanService;

describe('ListDailyDeliveriesFromDeliveryman', () => {
  beforeEach(() => {
    fakeDeliveriesRepository = new FakeDeliveriesRepository();
    fakeUsersRepository = new FakeUsersRepository();

    listDailyDeliveriesFromDeliverymanService = new ListDailyDeliveriesFromDeliverymanService(
      fakeDeliveriesRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to list all deliveries from a specific day from deliveryman', async () => {
    const deliveryman = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      deliveryman: true,
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

    const delivery = await fakeDeliveriesRepository.create({
      address: 'Another random address',
      city: 'Another random city',
      neighborhood: 'Another random neighborhood',
      state: 'Another random State',
      postal_code: '99999999',
      product: 'Another random product',
      deliveryman_id: deliveryman.id,
    });

    delivery.start_date = new Date();
    await fakeDeliveriesRepository.save(delivery);

    const deliveries = await listDailyDeliveriesFromDeliverymanService.execute({
      deliveryman_id: deliveryman.id,
      day: getDate(new Date()),
      month: getMonth(new Date()),
      year: getYear(new Date()),
    });

    expect(deliveries).toEqual([delivery]);
  });

  it('should not be able to list the deliveries from a non-existing deliveryman', async () => {
    await expect(
      listDailyDeliveriesFromDeliverymanService.execute({
        deliveryman_id: 'non-existing-deliveryman',
        day: getDate(new Date()),
        month: getMonth(new Date()),
        year: getYear(new Date()),
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
      listDailyDeliveriesFromDeliverymanService.execute({
        deliveryman_id: user.id,
        day: getDate(new Date()),
        month: getMonth(new Date()),
        year: getYear(new Date()),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
