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
    jest.spyOn(Date, 'now').mockImplementation(() => {
      const customDate = new Date();
      return customDate.setHours(10);
    });

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
      deliveryman_id: deliveryman.id,
    });

    expect(startedDelivery).toHaveProperty('start_date');
  });

  it('should not be able to start a delivery if delivery_id is invalid', async () => {
    const deliveryman = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      deliveryman: true,
    });

    await expect(
      startDeliveryService.execute({
        delivery_id: 'non-existing-delivery_id',
        deliveryman_id: deliveryman.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to start a delivery if deliveryman_id is invalid', async () => {
    const delivery = await fakeDeliveriesRepository.create({
      address: 'Another random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: 'non-existing-deliveryman_id',
    });

    await expect(
      startDeliveryService.execute({
        delivery_id: delivery.id,
        deliveryman_id: 'non-existing-deliveryman_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to start a delivery if user is not a deliveryman', async () => {
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
        deliveryman_id: deliveryman.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to start a delivery before 8AM', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      const customDate = new Date();
      return customDate.setHours(5);
    });

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
      startDeliveryService.execute({
        delivery_id: delivery.id,
        deliveryman_id: deliveryman.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to start a delivery after 12PM', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      const customDate = new Date();
      return customDate.setHours(18);
    });

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
      startDeliveryService.execute({
        delivery_id: delivery.id,
        deliveryman_id: deliveryman.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to start a delivery if 5 or more deliveries already been started in the same day', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      const customDate = new Date();
      return customDate.setHours(10);
    });

    const deliveryman = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
      deliveryman: true,
    });

    const delivery1 = await fakeDeliveriesRepository.create({
      address: 'Another random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: deliveryman.id,
    });

    delivery1.start_date = new Date();
    await fakeDeliveriesRepository.save(delivery1);

    const delivery2 = await fakeDeliveriesRepository.create({
      address: 'Another random address',
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
      address: 'Another random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: deliveryman.id,
    });

    delivery3.start_date = new Date();
    await fakeDeliveriesRepository.save(delivery3);

    const delivery4 = await fakeDeliveriesRepository.create({
      address: 'Another random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: deliveryman.id,
    });

    delivery4.start_date = new Date();
    await fakeDeliveriesRepository.save(delivery4);

    const delivery5 = await fakeDeliveriesRepository.create({
      address: 'Another random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: deliveryman.id,
    });

    delivery5.start_date = new Date();
    await fakeDeliveriesRepository.save(delivery5);

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
        deliveryman_id: deliveryman.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
