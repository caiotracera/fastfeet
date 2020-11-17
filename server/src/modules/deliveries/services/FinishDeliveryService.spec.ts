import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeDeliveriesRepository from '@modules/deliveries/repositories/fakes/FakeDeliveriesRepository';
import FinishDeliveryService from '@modules/deliveries/services/FinishDeliveryService';

let fakeUsersRepository: FakeUsersRepository;
let fakeDeliveriesRepository: FakeDeliveriesRepository;
let finishDeliveryService: FinishDeliveryService;

describe('FinishDelivery', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeDeliveriesRepository = new FakeDeliveriesRepository();

    finishDeliveryService = new FinishDeliveryService(
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

    const endedDelivery = await finishDeliveryService.execute({
      delivery_id: delivery.id,
      deliveryman_id: deliveryman.id,
      signature: 'random_signature',
    });

    expect(endedDelivery).toHaveProperty('end_date');
  });

  it('should not be able to finish the delivery if delivery_id is invalid', async () => {
    const deliveryman = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      deliveryman: true,
    });

    await expect(
      finishDeliveryService.execute({
        delivery_id: 'invalid-delivery_id',
        deliveryman_id: deliveryman.id,
        signature: 'random_signature',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to finish delivery if not started', async () => {
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
      finishDeliveryService.execute({
        delivery_id: delivery.id,
        deliveryman_id: deliveryman.id,
        signature: 'random_signature',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to finish delivery if already finished', async () => {
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
    delivery.end_date = new Date();
    await fakeDeliveriesRepository.save(delivery);

    await expect(
      finishDeliveryService.execute({
        delivery_id: delivery.id,
        deliveryman_id: deliveryman.id,
        signature: 'random_signature',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to finish delivery if deliveryman_id invalid', async () => {
    const delivery = await fakeDeliveriesRepository.create({
      address: 'Another random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: 'invalid-deliveryman_id',
    });

    delivery.start_date = new Date();
    await fakeDeliveriesRepository.save(delivery);

    await expect(
      finishDeliveryService.execute({
        delivery_id: delivery.id,
        deliveryman_id: 'invalid-deliveryman_id',
        signature: 'random_signature',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to finish delivery if user is not deliveryman', async () => {
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
      finishDeliveryService.execute({
        delivery_id: delivery.id,
        deliveryman_id: deliveryman.id,
        signature: 'random_signature',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
