import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, cpf, password } = request.body;

      const createUser = container.resolve(CreateUserService);
      const user = await createUser.execute({ name, email, password, cpf });

      return response.json(classToClass(user));
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message });
      }
      return response.status(400).json({ error: error.message });
    }
  }
}
