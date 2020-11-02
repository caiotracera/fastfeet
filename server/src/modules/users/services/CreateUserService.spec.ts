import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
    });

    expect(user).toHaveProperty('id');
    expect(user.deliveryman).toBe(true);
  });

  it('should not be able to create a new user if e-mail already in use', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
    });

    await expect(
      createUser.execute({
        name: 'John Tre',
        email: 'johndoe@example.com',
        password: '147852369',
        cpf: '11111111111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user if cpf already in use', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
    });

    await expect(
      createUser.execute({
        name: 'John Tre',
        email: 'johntre@example.com',
        password: '147852369',
        cpf: '99999999999',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
