import { v4 } from 'uuid';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({
    name,
    email,
    password,
    cpf,
    deliveryman = true,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: v4(), name, email, password, cpf, deliveryman });

    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(eachUser => eachUser.id === user.id);

    this.users[userIndex] = user;
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(
      eachUser => eachUser.id === id && !eachUser.deleted_at,
    );
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(eachUser => eachUser.email === email);
    return user;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = this.users.find(eachUser => eachUser.cpf === cpf);
    return user;
  }

  public async findAllDeliverymans(): Promise<User[]> {
    return this.users;
  }
}
