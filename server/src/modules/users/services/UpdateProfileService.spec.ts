import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
    });

    const updatedUser = await updateProfileService.execute({
      id: user.id,
      cpf: '88888888888',
      name: 'John Doe',
      email: 'john.doe@example.com',
      deliveryman: true,
    });

    expect(updatedUser.cpf).toBe('88888888888');
    expect(updatedUser.email).toBe('john.doe@example.com');
  });

  it('should be able to update the user password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
    });

    const updatedUser = await updateProfileService.execute({
      id: user.id,
      cpf: '88888888888',
      name: 'John Doe',
      email: 'john.doe@example.com',
      deliveryman: true,
      password: '123456789',
      old_password: '123456',
    });

    expect(updatedUser.password).toBe('123456789');
  });

  it('should not be able to update the profile from a non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        id: 'random-id',
        cpf: '88888888888',
        name: 'John Doe',
        email: 'john.doe@example.com',
        deliveryman: true,
        password: '123456789',
        old_password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change the e-mail to another already in use', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '147852369',
      cpf: '11111111111',
    });

    await expect(
      updateProfileService.execute({
        id: user.id,
        cpf: '11111111111',
        name: 'John Tre',
        email: 'johndoe@example.com',
        deliveryman: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change the cpf to another already in use', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '147852369',
      cpf: '11111111111',
    });

    await expect(
      updateProfileService.execute({
        id: user.id,
        cpf: '99999999999',
        name: 'John Tre',
        email: 'johntre@example.com',
        deliveryman: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password without old_password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
    });

    await expect(
      updateProfileService.execute({
        id: user.id,
        cpf: '99999999999',
        name: 'John Doe',
        email: 'johndoe@example.com',
        deliveryman: true,
        password: '147852369',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password if old_password is wrong', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
    });

    await expect(
      updateProfileService.execute({
        id: user.id,
        cpf: '99999999999',
        name: 'John Doe',
        email: 'johndoe@example.com',
        deliveryman: true,
        password: '147852369',
        old_password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
