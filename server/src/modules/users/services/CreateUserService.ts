import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  cpf: string;
  password: string;
  deliveryman?: boolean;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    name,
    email,
    cpf,
    password,
    deliveryman,
  }: IRequest): Promise<User> {
    const checkEmailInUse = await this.usersRepository.findByEmail(email);
    if (checkEmailInUse) {
      throw new AppError('E-mail already in use', 400);
    }

    const checkCpfInUse = await this.usersRepository.findByCpf(cpf);
    if (checkCpfInUse) {
      throw new AppError('CPF already in use', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      cpf,
      password: hashedPassword,
      deliveryman,
    });

    return user;
  }
}
