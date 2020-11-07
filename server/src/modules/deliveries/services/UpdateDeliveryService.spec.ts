import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeDeliveriesRepository from '@modules/deliveries/repositories/fakes/FakeDeliveriesRepository';
import UpdateDeliveryService from '@modules/deliveries/services/UpdateDeliveryService';

let fakeUsersRepository: FakeUsersRepository;
let fakeDeliveriesRepository: FakeDeliveriesRepository;
let updateDeliveryService: UpdateDeliveryService;

describe('UpdateDelivery', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeDeliveriesRepository = new FakeDeliveriesRepository();

    updateDeliveryService = new UpdateDeliveryService(
      fakeDeliveriesRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to update the delivery', async () => {
    const delivery = await fakeDeliveriesRepository.create({
      address: 'Another random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      deliveryman: false,
    });

    const newDeliveryman = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123456',
      cpf: '777777777',
      deliveryman: true,
    });

    const updatedDelivery = await updateDeliveryService.execute({
      delivery_id: delivery.id,
      user_id: user.id,
      address: 'Another random address',
      city: 'Another random city',
      neighborhood: 'Another random neighborhood',
      state: 'Another random State',
      postal_code: '888888888',
      product: 'Another random product',
      deliveryman_id: newDeliveryman.id,
    });

    expect(updatedDelivery.address).toBe('Another random address');
    expect(updatedDelivery.city).toBe('Another random city');
    expect(updatedDelivery.neighborhood).toBe('Another random neighborhood');
    expect(updatedDelivery.state).toBe('Another random State');
    expect(updatedDelivery.postal_code).toBe('888888888');
    expect(updatedDelivery.product).toBe('Another random product');
    expect(updatedDelivery.deliveryman.id).toBe(newDeliveryman.id);
  });

  it('should not be able to update a non-existing delivery', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      deliveryman: false,
    });

    await expect(
      updateDeliveryService.execute({
        delivery_id: 'non-existing-delivery',
        user_id: user.id,
        address: 'Another random address',
        city: 'Another random city',
        neighborhood: 'Another random neighborhood',
        state: 'Another random State',
        postal_code: '888888888',
        product: 'Another random product',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the delivery with non-existing user', async () => {
    const delivery = await fakeDeliveriesRepository.create({
      address: 'Another random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
    });

    await expect(
      updateDeliveryService.execute({
        delivery_id: delivery.id,
        user_id: 'non-existing-user',
        address: 'Another random address',
        city: 'Another random city',
        neighborhood: 'Another random neighborhood',
        state: 'Another random State',
        postal_code: '888888888',
        product: 'Another random product',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the delivery if deliveryman not found', async () => {
    const delivery = await fakeDeliveriesRepository.create({
      address: 'Another random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      deliveryman: false,
    });

    await expect(
      updateDeliveryService.execute({
        delivery_id: delivery.id,
        user_id: user.id,
        address: 'Another random address',
        city: 'Another random city',
        neighborhood: 'Another random neighborhood',
        state: 'Another random State',
        postal_code: '888888888',
        product: 'Another random product',
        deliveryman_id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the delivery if deliveryman_id is not from a valid deliveryman', async () => {
    const delivery = await fakeDeliveriesRepository.create({
      address: 'Another random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      deliveryman: false,
    });

    const fakeDeliveryman = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      deliveryman: false,
    });

    await expect(
      updateDeliveryService.execute({
        delivery_id: delivery.id,
        user_id: user.id,
        address: 'Another random address',
        city: 'Another random city',
        neighborhood: 'Another random neighborhood',
        state: 'Another random State',
        postal_code: '888888888',
        product: 'Another random product',
        deliveryman_id: fakeDeliveryman.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the delivery if user is a deliveryman', async () => {
    const delivery = await fakeDeliveriesRepository.create({
      address: 'Another random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      deliveryman: true,
    });

    await expect(
      updateDeliveryService.execute({
        delivery_id: delivery.id,
        user_id: user.id,
        address: 'Another random address',
        city: 'Another random city',
        neighborhood: 'Another random neighborhood',
        state: 'Another random State',
        postal_code: '888888888',
        product: 'Another random product',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
