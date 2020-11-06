import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotEmailSerice from '@modules/users/services/SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotEmailService: SendForgotEmailSerice;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeMailProvider = new FakeMailProvider();

    sendForgotEmailService = new SendForgotEmailSerice(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeMailProvider,
    );
  });

  it('should be able to send e-mail with password recover instructions', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
    });

    await sendForgotEmailService.execute({
      email: user.email,
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should generate a token for recover password', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '99999999999',
    });

    await sendForgotEmailService.execute({
      email: user.email,
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });

  it('should not be able to send e-mail to a non-existing user', async () => {
    await expect(
      sendForgotEmailService.execute({
        email: 'random-email@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
