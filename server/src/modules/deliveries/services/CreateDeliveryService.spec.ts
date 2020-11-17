import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeDeliveriesRepository from '@modules/deliveries/repositories/fakes/FakeDeliveriesRepository';
import CreateDeliveryService from '@modules/deliveries/services/CreateDeliveryService';

let fakeUsersRepository: FakeUsersRepository;
let fakeDeliveriesRepository: FakeDeliveriesRepository;
let createDeliveryService: CreateDeliveryService;

describe('CreateDelivery', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeDeliveriesRepository = new FakeDeliveriesRepository();

    createDeliveryService = new CreateDeliveryService(
      fakeDeliveriesRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to create a new delivery', async () => {
    const deliveryman = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '147852369',
      cpf: '11111111111',
      deliveryman: true,
    });

    const delivery = await createDeliveryService.execute({
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

  it('should not be able to create a delivery with invalid deliveryman_id', async () => {
    await expect(
      createDeliveryService.execute({
        address: 'Random address',
        city: 'Random city',
        neighborhood: 'Random neighborhood',
        state: 'Random State',
        postal_code: '99999999',
        product: 'Random product',
        deliveryman_id: 'invalid-deliveryman_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a delivery for a non-deliveryman', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '147852369',
      cpf: '11111111111',
      deliveryman: false,
    });

    await expect(
      createDeliveryService.execute({
        address: 'Random address',
        city: 'Random city',
        neighborhood: 'Random neighborhood',
        state: 'Random State',
        postal_code: '99999999',
        product: 'Random product',
        deliveryman_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
