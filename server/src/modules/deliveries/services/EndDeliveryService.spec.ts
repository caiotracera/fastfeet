import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeDeliveriesRepository from '@modules/deliveries/repositories/fakes/FakeDeliveriesRepository';
import EndDeliveryService from '@modules/deliveries/services/EndDeliveryService';

let fakeUsersRepository: FakeUsersRepository;
let fakeDeliveriesRepository: FakeDeliveriesRepository;
let endDeliveryService: EndDeliveryService;

describe('finishDelivery', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeDeliveriesRepository = new FakeDeliveriesRepository();

    endDeliveryService = new EndDeliveryService(
      fakeDeliveriesRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to finish the delivery', async () => {
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

    delivery.start_date = new Date();
    await fakeDeliveriesRepository.save(delivery);

    const endedDelivery = await endDeliveryService.execute({
      delivery_id: delivery.id,
      user_id: deliveryman.id,
    });

    expect(endedDelivery).toHaveProperty('end_date');
  });

  it('should not be able to finished a non-existing delivery', async () => {
    const deliveryman = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      deliveryman: true,
    });

    await expect(
      endDeliveryService.execute({
        delivery_id: 'non-existing-id',
        user_id: deliveryman.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to finish a delivery if already finished', async () => {
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

    delivery.start_date = new Date();
    await fakeDeliveriesRepository.save(delivery);

    await endDeliveryService.execute({
      delivery_id: delivery.id,
      user_id: deliveryman.id,
    });

    await expect(
      endDeliveryService.execute({
        delivery_id: delivery.id,
        user_id: deliveryman.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to finish a delivery if not started', async () => {
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

    await expect(
      endDeliveryService.execute({
        delivery_id: delivery.id,
        user_id: deliveryman.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to finish a delivery with non-existing deliveryman', async () => {
    const delivery = await fakeDeliveriesRepository.create({
      address: 'Another random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
    });

    delivery.start_date = new Date();
    await fakeDeliveriesRepository.save(delivery);

    await expect(
      endDeliveryService.execute({
        delivery_id: delivery.id,
        user_id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to finish a delivery with invalid deliveryman', async () => {
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

    delivery.start_date = new Date();
    await fakeDeliveriesRepository.save(delivery);

    await expect(
      endDeliveryService.execute({
        delivery_id: delivery.id,
        user_id: deliveryman.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to finish a delivery if deliveryman is not the same', async () => {
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

    delivery.start_date = new Date();
    await fakeDeliveriesRepository.save(delivery);

    await expect(
      endDeliveryService.execute({
        delivery_id: delivery.id,
        user_id: another_deliveryman.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
