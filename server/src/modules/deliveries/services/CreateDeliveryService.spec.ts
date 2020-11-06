import { setHours } from 'date-fns';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeDeliveriesRepository from '@modules/deliveries/repositories/fakes/FakeDeliveriesRepository';
import CreateDeliveryService from '@modules/deliveries/services/CreateDeliveryService';

let fakeUsersRepository: FakeUsersRepository;
let fakeDeliveriesRepository: FakeDeliveriesRepository;
let createDeliveryService: CreateDeliveryService;

describe('CreateDelivery', () => {
  beforeEach(() => {
    fakeDeliveriesRepository = new FakeDeliveriesRepository();
    fakeUsersRepository = new FakeUsersRepository();

    createDeliveryService = new CreateDeliveryService(
      fakeDeliveriesRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to create a new delivery', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return setHours(new Date(), 9).getTime();
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      deliveryman: false,
    });

    const deliveryman = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johndoe@example.com',
      password: '147852369',
      cpf: '11111111111',
      deliveryman: true,
    });

    const delivery = await createDeliveryService.execute({
      user_id: user.id,
      address: 'Random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: deliveryman.id,
    });

    expect(delivery).toHaveProperty('id');
    expect(delivery.deliveryman_id).toEqual(deliveryman.id);
  });

  it('should not be able to create a new delivery with non-existing user', async () => {
    await expect(
      createDeliveryService.execute({
        user_id: 'non_existing-user_id',
        address: 'Random address',
        city: 'Random city',
        neighborhood: 'Random neighborhood',
        state: 'Random State',
        postal_code: '99999999',
        product: 'Random product',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoudl not be able to create a new delivery with none-existing deliveryman', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      deliveryman: false,
    });

    await expect(
      createDeliveryService.execute({
        user_id: user.id,
        address: 'Random address',
        city: 'Random city',
        neighborhood: 'Random neighborhood',
        state: 'Random State',
        postal_code: '99999999',
        product: 'Random product',
        deliveryman_id: 'non_existing-deliveryman_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new delivery if user is a deliveryman', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      deliveryman: true,
    });

    const deliveryman = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johndoe@example.com',
      password: '147852369',
      cpf: '11111111111',
      deliveryman: true,
    });

    await expect(
      createDeliveryService.execute({
        user_id: user.id,
        address: 'Random address',
        city: 'Random city',
        neighborhood: 'Random neighborhood',
        state: 'Random State',
        postal_code: '99999999',
        product: 'Random product',
        deliveryman_id: deliveryman.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new delivery if deliveryman is not a deliveryman', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      deliveryman: false,
    });

    const deliveryman = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johndoe@example.com',
      password: '147852369',
      cpf: '11111111111',
      deliveryman: false,
    });

    await expect(
      createDeliveryService.execute({
        user_id: user.id,
        address: 'Random address',
        city: 'Random city',
        neighborhood: 'Random neighborhood',
        state: 'Random State',
        postal_code: '99999999',
        product: 'Random product',
        deliveryman_id: deliveryman.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
