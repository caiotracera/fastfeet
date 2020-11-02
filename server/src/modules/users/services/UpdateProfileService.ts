import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  id: string;
  name: string;
  email: string;
  cpf: string;
  password?: string;
  old_password?: string;
  deliveryman: boolean;
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    id,
    name,
    email,
    cpf,
    password,
    old_password,
    deliveryman,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new AppError('User not found!');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('E-mail already in use');
    }

    const userWithUpdatedCpf = await this.usersRepository.findByCpf(cpf);
    if (userWithUpdatedCpf && userWithUpdatedCpf.id !== user.id) {
      throw new AppError('CPF already in use');
    }

    user.name = name;
    user.email = email;
    user.cpf = cpf;
    user.deliveryman = deliveryman;

    if (password && !old_password) {
      throw new AppError(
        'You need to informe the old password to set a new password',
      );
    }

    if (password && old_password) {
      const checkPasswordMatch = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkPasswordMatch) {
        throw new AppError('Old password does not patch');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return user;
  }
}
