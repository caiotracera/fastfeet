import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import GenerateRefreshTokenService from '@modules/users/services/GenerateRefreshTokenService';

let fakeUsersRepository: FakeUsersRepository;
let authenticateUserService: AuthenticateUserService;
let fakeHashProvider: FakeHashProvider;
let generateRefreshTokenService: GenerateRefreshTokenService;

describe('GenerateRefreshToken', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    generateRefreshTokenService = new GenerateRefreshTokenService(
      fakeUsersRepository,
    );
  });

  it('should be able to generate a refresh_token', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999998',
    });

    const authenticatedUser = await authenticateUserService.execute({
      cpf: user.cpf,
      password: user.password,
    });

    const refreshToken = await generateRefreshTokenService.execute({
      grant_type: 'refresh_token',
      refresh_token: authenticatedUser.token,
    });

    expect(refreshToken).toHaveProperty('token');
    expect(refreshToken.user).toEqual(user);
  });

  it('should not be able to generate a fresh_token for a non-existing user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999998',
    });

    const authenticatedUser = await authenticateUserService.execute({
      cpf: user.cpf,
      password: user.password,
    });

    user.deleted_at = new Date();
    await fakeUsersRepository.save(user);

    await expect(
      generateRefreshTokenService.execute({
        grant_type: 'refresh_token',
        refresh_token: authenticatedUser.token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('it should not be able to generate a refresh_token if GRANT_TYPE is not REFRESH_TOKEN', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
    });

    const authenticatedUser = await authenticateUserService.execute({
      cpf: user.cpf,
      password: user.password,
    });

    await expect(
      generateRefreshTokenService.execute({
        grant_type: 'random-grant_type',
        refresh_token: authenticatedUser.token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
