import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeDeliveriesRepository from '@modules/deliveries/repositories/fakes/FakeDeliveriesRepository';
import StartDeliveryService from '@modules/deliveries/services/StartDeliveryService';

let fakeUsersRepository: FakeUsersRepository;
let fakeDeliveriesRepository: FakeDeliveriesRepository;
let startDeliveryService: StartDeliveryService;

describe('StartDelivery', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeDeliveriesRepository = new FakeDeliveriesRepository();

    startDeliveryService = new StartDeliveryService(
      fakeDeliveriesRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to start the delivery', async () => {
    const deliveryman = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      deliveryman: true,
    });

    const delivery = await fakeDeliveriesRepository.create({
      address: 'Another random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: deliveryman.id,
    });

    const startedDelivery = await startDeliveryService.execute({
      delivery_id: delivery.id,
      user_id: deliveryman.id,
    });

    expect(startedDelivery).toHaveProperty('start_date');
  });

  it('should not be able to start a non-existing delivery', async () => {
    const deliveryman = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      deliveryman: true,
    });

    await expect(
      startDeliveryService.execute({
        delivery_id: 'non-existing-id',
        user_id: deliveryman.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to start a delivery if already started', async () => {
    const deliveryman = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      deliveryman: true,
    });

    const delivery = await fakeDeliveriesRepository.create({
      address: 'Another random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: deliveryman.id,
    });

    await startDeliveryService.execute({
      delivery_id: delivery.id,
      user_id: deliveryman.id,
    });

    await expect(
      startDeliveryService.execute({
        delivery_id: delivery.id,
        user_id: deliveryman.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to start a delivery with non-existing deliveryman', async () => {
    const delivery = await fakeDeliveriesRepository.create({
      address: 'Another random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
    });

    await expect(
      startDeliveryService.execute({
        delivery_id: delivery.id,
        user_id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to start a delivery with invalid deliveryman', async () => {
    const deliveryman = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      deliveryman: false,
    });

    const delivery = await fakeDeliveriesRepository.create({
      address: 'Another random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: deliveryman.id,
    });

    await expect(
      startDeliveryService.execute({
        delivery_id: delivery.id,
        user_id: deliveryman.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to start a delivery if deliveryman is not the same', async () => {
    const deliveryman = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      deliveryman: true,
    });

    const another_deliveryman = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123456',
      cpf: '888888888',
      deliveryman: true,
    });

    const delivery = await fakeDeliveriesRepository.create({
      address: 'Another random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: deliveryman.id,
    });

    await expect(
      startDeliveryService.execute({
        delivery_id: delivery.id,
        user_id: another_deliveryman.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to start a delivery if deliveryman is not the same', async () => {
    const deliveryman = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      deliveryman: true,
    });

    const delivery = await fakeDeliveriesRepository.create({
      address: 'Another random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: deliveryman.id,
    });

    await startDeliveryService.execute({
      delivery_id: delivery.id,
      user_id: deliveryman.id,
    });

    const delivery2 = await fakeDeliveriesRepository.create({
      address: 'Another random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: deliveryman.id,
    });

    await startDeliveryService.execute({
      delivery_id: delivery2.id,
      user_id: deliveryman.id,
    });

    const delivery3 = await fakeDeliveriesRepository.create({
      address: 'Another random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: deliveryman.id,
    });

    await startDeliveryService.execute({
      delivery_id: delivery3.id,
      user_id: deliveryman.id,
    });

    const delivery4 = await fakeDeliveriesRepository.create({
      address: 'Another random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: deliveryman.id,
    });

    await startDeliveryService.execute({
      delivery_id: delivery4.id,
      user_id: deliveryman.id,
    });

    const delivery5 = await fakeDeliveriesRepository.create({
      address: 'Another random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: deliveryman.id,
    });

    await startDeliveryService.execute({
      delivery_id: delivery5.id,
      user_id: deliveryman.id,
    });

    const delivery6 = await fakeDeliveriesRepository.create({
      address: 'Another random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: deliveryman.id,
    });

    await expect(
      startDeliveryService.execute({
        delivery_id: delivery6.id,
        user_id: deliveryman.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
