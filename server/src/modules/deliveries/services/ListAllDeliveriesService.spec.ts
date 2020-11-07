import FakeDeliveriesRepository from '@modules/deliveries/repositories/fakes/FakeDeliveriesRepository';
import ListAllDeliveriesService from '@modules/deliveries/services/ListAllDeliveriesService';

let fakeDeliveriesRepository: FakeDeliveriesRepository;
let listAllDeliveriesService: ListAllDeliveriesService;

describe('ListAllDeliveries', () => {
  beforeEach(() => {
    fakeDeliveriesRepository = new FakeDeliveriesRepository();

    listAllDeliveriesService = new ListAllDeliveriesService(
      fakeDeliveriesRepository,
    );
  });

  it('should be able to list all the deliveries', async () => {
    const delivery1 = await fakeDeliveriesRepository.create({
      address: 'Random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: 'random-deliveryman',
    });

    const delivery2 = await fakeDeliveriesRepository.create({
      address: 'Random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: 'random-deliveryman2',
    });

    const delivery3 = await fakeDeliveriesRepository.create({
      address: 'Random address',
      city: 'Random city',
      neighborhood: 'Random neighborhood',
      state: 'Random State',
      postal_code: '99999999',
      product: 'Random product',
      deliveryman_id: 'random-deliveryman',
    });

    const deliveries = await listAllDeliveriesService.execute();
    expect(deliveries).toEqual([delivery1, delivery2, delivery3]);
  });
});
